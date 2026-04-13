import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("auth/register/", form);
      navigate("/login");
    } catch {
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Create Account 
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Role */}
        <select
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student"> Student</option>
          <option value="teacher"> Teacher</option>
          <option value="admin"> Admin</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Signup
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/login")} 
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}