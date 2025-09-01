import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
   
      <div className="flex items-center gap-2">
        <img src="/Logo.svg" alt="Assistify Logo" className="w-8 h-8" />
        <span className="text-xl font-bold">Assistify</span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/chat" className="hover:underline">Chat</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
