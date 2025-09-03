import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from '../ui/Input'
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminSecret, setAdminSecret] = useState("");
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, password, role };
    if (role === "admin") payload.adminSecret = adminSecret;
    const success = await registerUser(payload);
    if (success) navigate("/dashboard");
  };

  return (
   <>
   <PublicHeader/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="flex items-center mb-4">
            <label className="mr-2">Role:</label>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer "
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user" className="cursor-pointer">User</option>
              <option value="admin" className="cursor-pointer">Admin</option>
            </select>
          </div>
          {role === "admin" && (
            <Input
              label="Admin Secret"
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              placeholder="Enter admin secret"
            />
          )}
          <Button type="submit" className="w-full mt-4">Register</Button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-medium">Login</Link>
        </p>
      </div>
    </div>
   </>
  );
};

export default Register;
