// src/Login.jsx
import React, { useState } from "react";
import API from "./api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ 
    username: "", 
    password: "" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await API.post("auth/login/", credentials);
      console.log("Login response:", response.data);
      
      // Store tokens and user data
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("username", response.data.username);
      
      alert("Login Successful!");
      
      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin");
      } else if (response.data.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
      
    } catch (error) {
      console.error("Login ERROR:", error.response?.data);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Invalid username or password";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">🔐 Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}
        
        <input 
          type="text"
          placeholder="Username" 
          required 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
        />
        <input 
          type="password"
          placeholder="Password" 
          required 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;