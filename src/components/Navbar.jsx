import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitial = (str) => (str ? str.charAt(0).toUpperCase() : "?");

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-green-900 p-4 text-white flex flex-col sm:flex-row justify-between items-center shadow-lg">
      <div className="mb-2 sm:mb-0">
<h1
  className="font-bold text-2xl flex items-center"
  style={{ fontFamily: "'Rubik', sans-serif" }}
>
  {/* Circular logo icon */}
  <span className="bg-white text-green-700 rounded-full w-8 h-8 flex items-center justify-center mr-2 font-mono shadow-md">
    A
  </span>

  {/* Brand name */}
  <span className="text-green-700">Assistify</span>
</h1>


      </div>

      {user ? (
        <div className="flex items-center gap-4 relative">
          {/* Role-based buttons */}
          {user.role === "admin" && (
            <>
              <Link
                to="/admin"
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 px-4 py-1 rounded-md text-white shadow-md transition-all"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/admin/upload"
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 px-4 py-1 rounded-md text-white shadow-md transition-all"
              >
                Upload
              </Link>
            </>
          )}

          {user.role === "user" && (
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 px-4 py-1 rounded-md text-white shadow-md transition-all cursor-pointer"
            >
              Dashboard
            </Link>
          )}

          {/* User avatar with dropdown */}
          <div className="relative " ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center text-white font-bold shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              title={user.name || user.email}
            >
              {getInitial(user.name || user.email)}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-green-100 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-green-100 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="hover:underline text-green-300 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:underline text-green-300 transition-colors"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
