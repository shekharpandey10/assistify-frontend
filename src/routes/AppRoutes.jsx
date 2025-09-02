import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Chat";
import AdminDashboard from "../pages/Faq";
import Profile from "../pages/Profile";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user?.role === "admin" ? children : <Navigate to="/dashboard" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
