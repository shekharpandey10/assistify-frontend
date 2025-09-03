import { useState, useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PublicHeader from "../components/PublicHeader";
import Input from "../ui/Input";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user", // default to user
  });

  const [error, setError] = useState(""); // New state for error messages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user changes input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser({
      email: form.email,
      password: form.password,
    });

    if (success) {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));

      // Role validation
      if (form.role === "admin" && loggedInUser.role !== "admin") {
        setError("You are not an admin!");
        return;
      } else if (form.role === "user" && loggedInUser.role !== "user") {
        setError("You are not a user!");
        return;
      }

      // Redirect based on role
      if (form.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Login failed! Check credentials.");
    }
  };

  return (
   <>
      <PublicHeader/>
      
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-6 ">
          <label className="block mb-1 font-semibold ">Login as</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded cursor-pointer"
          >
            <option value="user" className="cursor-pointer">User</option>
            <option value="admin " className="cursor-pointer" >Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700"
        >
          Login
        </button>
      </form>
       <p className="text-sm text-gray-500 mt-4 text-center ">
          New User?{" "}
          <Link to="/register" className="text-green-500 font-medium">Create new Account</Link>
        </p>
    </div>
   </>
  );
};

export default Login;
