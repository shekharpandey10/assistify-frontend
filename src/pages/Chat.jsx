import React from "react";

const Chat = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-gray-100 rounded-lg shadow-md overflow-hidden">
      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-2">
          <p className="bg-white p-2 rounded-lg w-fit shadow">
            Hello! How can I help you?
          </p>
        </div>
        <div className="mb-2 text-right">
          <p className="bg-blue-500 text-white p-2 rounded-lg w-fit ml-auto shadow">
            I want to know about AI chatbots.
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white flex gap-2 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
