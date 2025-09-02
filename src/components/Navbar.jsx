import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div>
        <Link to="/" className="text-lg font-bold">
          My App
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          {/* Role-based links */}
          {user.role === "admin" ? (
            <Link
              to="/admin"
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
            >
              Dashboard
            </Link>
          )}

          <span className="font-medium">Welcome, {user.name || user.email}</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
