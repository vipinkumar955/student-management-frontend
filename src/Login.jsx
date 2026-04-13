import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login/", data);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);

      navigate(`/${res.data.role}`);
    } catch {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Welcome Back 
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}