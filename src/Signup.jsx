// src/Signup.jsx
import React, { useState } from "react";
import API from "./api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", email: "", password: "", role: "student" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("auth/register/", data);
      alert("User Created Successfully");
      navigate("/login");
    } catch (error) {
      console.error("Signup ERROR:", error.response?.data);
      alert("Signup Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">📝 Signup</h2>
        <input placeholder="Username" required className="w-full p-2 border rounded" onChange={(e) => setData({ ...data, username: e.target.value })} />
        <input placeholder="Email" required type="email" className="w-full p-2 border rounded" onChange={(e) => setData({ ...data, email: e.target.value })} />
        <input placeholder="Password" required type="password" className="w-full p-2 border rounded" onChange={(e) => setData({ ...data, password: e.target.value })} />
        <select className="w-full p-2 border rounded" onChange={(e) => setData({ ...data, role: e.target.value })}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-40 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">Signup</button>
        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;