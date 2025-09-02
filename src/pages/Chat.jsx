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
  const chatEndRef = useRef(null);

  // Fetch chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getChatHistory();
        // Flatten all conversations into messages
        const history = res.data.conversations.flatMap((c) => c.messages);
        setMessages(history);
      } catch (err) {
        console.error(err);
        setError("Failed to load chat history");
      }
    };
    fetchHistory();
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const handleSend = async () => {
  if (!message.trim()) return;

  setError("");
  setLoading(true);
  setTyping(true);

  // Optimistic update: add user message
  const newUserMessage = { role: "user", content: message };
  const updatedMessages = [...messages, newUserMessage];
  setMessages(updatedMessages);
  setMessage("");

  try {
    // Send message + history
    const res = await sendMessage(message, updatedMessages);

    // Replace messages with updated conversation from backend
    setMessages(res.data.conversation);
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 font-bold text-xl">
        Welcome, {user?.name || "User"}
      </header>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs break-words ${
                msg.role === "user"
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg max-w-xs bg-gray-200 text-gray-700 animate-pulse">
              Agent is typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 p-2">{error}</div>}

      {/* Input */}
      <div className="p-4 bg-gray-200 flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 p-2 rounded border border-gray-400"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
