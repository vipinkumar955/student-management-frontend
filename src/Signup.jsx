// src/Signup.jsx
import React, { useState } from "react";
import API from "./api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({ 
    username: "", 
    email: "", 
    password: "", 
    role: "student" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await API.post("auth/register/", data);
      console.log("Signup response:", response.data);
      alert("User Created Successfully! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup ERROR:", error.response?.data);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          "Signup Error. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">📝 Signup</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}
        
        <input 
          type="text"
          placeholder="Username" 
          required 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          onChange={(e) => setData({ ...data, username: e.target.value })} 
        />
        <input 
          type="email"
          placeholder="Email" 
          required 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          onChange={(e) => setData({ ...data, email: e.target.value })} 
        />
        <input 
          type="password"
          placeholder="Password" 
          required 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          onChange={(e) => setData({ ...data, password: e.target.value })} 
        />
        <select 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
          onChange={(e) => setData({ ...data, role: e.target.value })}
          value={data.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Signup"}
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;