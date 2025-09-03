import { Link } from "react-router-dom";



const PublicHeader = () => {
  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-2xl flex items-center" style={{ fontFamily: "'Rubik', sans-serif" }}>

        <span className="bg-white text-green-700 rounded-full w-8 h-8 flex items-center justify-center mr-2 font-mono shadow-md">
          A
        </span>
        Assitify
      </h1>


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
