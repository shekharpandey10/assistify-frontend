import { createContext, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      setUser(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  const registerUser = async (payload) => {
    try {
      const { data } = await API.post("/auth/register", payload);
      setUser(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ✅ Updated return statement exposing setUser
  return (
    <AuthContext.Provider
      value={{ user, setUser, loginUser, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
