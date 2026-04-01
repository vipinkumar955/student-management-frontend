// src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("access");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && userRole !== role) {
    // Redirect to home with access denied message
    alert(`Access Denied: You don't have ${role} privileges`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;