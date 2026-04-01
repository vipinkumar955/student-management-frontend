import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("auth/login/", data);

      console.log("SUCCESS:", res.data);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "student") navigate("/student");
      else if (res.data.role === "teacher") navigate("/teacher");
      else navigate("/admin");

    } catch (error) {
      console.log("FULL ERROR:", error.response);

      alert(
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail ||
        error.response?.data ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Username"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />

          <input
            required
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;