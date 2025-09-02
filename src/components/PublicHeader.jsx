import { Link } from "react-router-dom";

const PublicHeader = () => {
  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-lg">Assitify</h1>
      <nav className="space-x-4">
        <Link
          to="/login"
          className="text-green-100 hover:text-white hover:underline transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-green-100 hover:text-white hover:underline transition-colors"
        >
          Register
        </Link>
      </nav>
    </header>
  );
};

export default PublicHeader;
