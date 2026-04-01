// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("access");
  const userRole = localStorage.getItem("role");

  if (!token) {
    alert("Please login to access this page");
    return <Navigate to="/login" replace />;
  }
  
  if (role && userRole !== role) {
    alert(`Access Denied: You are logged in as ${userRole}, but this page requires ${role} privileges`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;