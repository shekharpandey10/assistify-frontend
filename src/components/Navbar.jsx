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

  // Function to get first letter of user name or email
  const getInitial = (str) => {
    if (!str) return "?";
    return str.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-green-800 p-4 text-white flex justify-between items-center">
      <div>
        <Link
          to={
            user?.role.toLowerCase() === "admin"
              ? "/admin"
              : user?.role.toLowerCase() === "user"
              ? "/dashboard"
              : "/"
          }
          className="text-lg font-bold"
        >
          My App
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          {/* Role-based links */}
          {user.role === "admin" ? (
            <>
              <Link
                to="/admin"
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
              >
                Admin Dashboard
              </Link>

              {/* Upload button for admin */}
              <Link
                to="/admin/upload"
                className="bg-green-400 px-3 py-1 rounded hover:bg-green-500"
              >
                Upload
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              Dashboard
            </Link>
          )}

          {/* Circle with first letter */}
          <Link
            to="/profile"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            {getInitial(user.name || user.email)}
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="hover:underline text-green-300">
            Login
          </Link>
          <Link to="/register" className="hover:underline text-green-300">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
