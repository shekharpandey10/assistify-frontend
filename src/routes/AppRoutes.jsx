import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Chat'
import AdminDashboard from '../pages/Admin'
import Profile from '../pages/Profile'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import AdminUploadContext from '../pages/AdminUploadContext'
import FAQ from '../pages/Admin'

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If logged in, redirect based on role
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" />;
    return <Navigate to="/dashboard" />;
  }

  // Otherwise, allow access
  return children;
};

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext)
  return user ? children : <Navigate to='/login' />
}

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext)
  return user?.role === 'admin' ? children : <Navigate to='/dashboard' />
}

const UserRoute = ({ children }) => {
  const { user } = useContext(AuthContext)
  return user?.role === 'user' ? children : <Navigate to='/admin' />
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
      <Route path='/faq' element={<FAQ />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route
          path='/dashboard'
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/upload'
          element={
            <AdminRoute>
              <AdminUploadContext />
            </AdminRoute>
          }
        />
      </Route>

      {/* Redirect unknown paths */}
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default AppRoutes
