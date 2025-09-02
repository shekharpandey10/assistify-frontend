import { Link } from "react-router-dom";

const PublicHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">My App</h1>
      <nav className="space-x-4">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </nav>
    </header>
  );
};

export default PublicHeader;
