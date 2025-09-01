import React from "react";

const Faq = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">What is this chatbot?</h2>
          <p className="text-gray-600">It’s an AI-powered chatbot that answers your queries in real-time.</p>
        </div>
        <div>
          <h2 className="font-semibold">Do I need to sign up?</h2>
          <p className="text-gray-600">Yes, you need an account to access advanced features.</p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
