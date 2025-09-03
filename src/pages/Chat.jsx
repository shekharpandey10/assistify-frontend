import { useState, useEffect, useRef, useContext } from "react";
import { sendMessage, getChatHistory } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [typing, setTyping] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchMessages(1);
  }, []);

  const fetchMessages = async (pageNumber) => {
    try {
      const res = await getChatHistory(pageNumber, 5);
      const fetchedMessages = res.data.messages.reverse();

      if (pageNumber === 1) {
        setMessages(fetchedMessages);
        scrollToBottom(true); // scroll initially
      } else {
        setMessages((prev) => [...fetchedMessages, ...prev]);
      }

      setHasMore(pageNumber < res.data.totalPages);
      setPage(pageNumber + 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load chat history");
    }
  };

  const scrollToBottom = (force = false) => {
    const container = chatContainerRef.current;
    if (!container) return;

    // Only scroll if user is already near the bottom OR force scroll
    const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (force || nearBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (!chatContainerRef.current || !hasMore) return;
    if (chatContainerRef.current.scrollTop === 0) {
      fetchMessages(page);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    setError("");
    setLoading(true);
    setTyping(true);

    const newUserMessage = { role: "user", content: message, timestamp: new Date() };
    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");

    try {
      const res = await sendMessage(message, messages);
      setMessages(res.data.conversation);
      scrollToBottom(); // scroll only if user is near bottom
    } catch (err) {
      console.error(err);
      setError("Failed to send message");
    }

    setLoading(false);
    setTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, {user?.name || "User"}
        </h1>
      </header>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3 scrollbar-hide"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-xl p-3 break-words relative shadow 
                ${msg.role === "user" ? "bg-green-600 text-white" : "bg-white text-gray-800"}
                max-w-[70%] sm:max-w-[60%]`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="p-3 rounded-xl max-w-[60%] bg-gray-200 text-gray-600 animate-pulse">
              Agent is typing...
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 p-2 text-center">{error}</div>}

      {/* Input */}
      <div className="p-4 bg-white shadow-t flex items-center gap-3 border-t border-gray-200">
        <input
          type="text"
          className="flex-1 p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-2xl font-semibold disabled:opacity-50 transition-colors"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Custom scrollbar style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Chat;
