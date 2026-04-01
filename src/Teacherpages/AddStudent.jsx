import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    selectedCourses: [],
  });

  useEffect(() => {
    API.get("courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  const toggleCourse = (id) => {
    const updated = form.selectedCourses.includes(id)
      ? form.selectedCourses.filter(c => c !== id)
      : [...form.selectedCourses, id];
    handleChange("selectedCourses", updated);
  };

  const submit = async () => {
    const { username, email, password, selectedCourses } = form;

    if (!username || !email || !password) {
      setError("All fields are required!");
      return;
    }
    
    // FIX: Password length validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }
    
    if (selectedCourses.length === 0) {
      setError("Select at least one course!");
      return;
    }

    try {
      // FIX: Send proper data to register endpoint
      const res = await API.post("auth/register/", {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        role: "student",  // Role is required by backend
      });

      console.log("Registration success:", res.data);

      // FIX: Get the user ID from response
      const userId = res.data.user?.id;
      if (!userId) {
        throw new Error("User ID not returned from registration");
      }

      // Create student profile
      await API.post("students/", {
        user: userId,
        enrolled_courses: selectedCourses,
      });

      alert("✅ Student Added Successfully!");
      setForm({ username: "", email: "", password: "", selectedCourses: [] });
      navigate("/student-list");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);
      
      // Show detailed error message
      if (err.response?.data) {
        const errors = err.response.data;
        let errorMsg = "Failed to add student: ";
        
        if (errors.username) errorMsg += `Username: ${errors.username.join(", ")}. `;
        if (errors.email) errorMsg += `Email: ${errors.email.join(", ")}. `;
        if (errors.password) errorMsg += `Password: ${errors.password.join(", ")}. `;
        if (errors.role) errorMsg += `Role: ${errors.role.join(", ")}. `;
        if (errors.detail) errorMsg = errors.detail;
        
        setError(errorMsg);
      } else {
        setError("Failed to add student. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          ➕ Add Student
        </h2>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

        <div className="space-y-4">
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full border px-3 py-2 rounded outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border px-3 py-2 rounded outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full border px-3 py-2 rounded outline-none focus:border-blue-500"
          />

          <p className="font-semibold mt-2">Select Courses</p>
          <div className="grid grid-cols-2 gap-2">
            {courses.map((c) => (
              <label key={c.id} className="flex items-center gap-2 border rounded p-2 hover:bg-indigo-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.selectedCourses.includes(c.id)}
                  onChange={() => toggleCourse(c.id)}
                />
                <span>{c.name}</span>
              </label>
            ))}
          </div>

          <button
            onClick={submit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;