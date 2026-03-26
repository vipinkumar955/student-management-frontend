// src/components/Courses.jsx
import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "",
    category: "other",
    syllabus: null,
  });

  useEffect(() => {
    API.get("courses/").catch(err => console.error(err));
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const addCourse = async () => {
    if (!form.name || !form.description) {
      return alert("Name & Description required");
    }

    const data = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key]) data.append(key, form[key]);
    });

    try {
      await API.post("courses/", data);
      alert(" Course Added");

      setForm({
        name: "",
        description: "",
        duration: "",
        category: "other",
        syllabus: null,
      });

      navigate("/course-list");
    } catch (err) {
      console.error(err);
      alert(" Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 px-4 py-10">

      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-6">
          Add Course
        </h2>

        <div className="space-y-4">

          {/* Name */}
          <input
            placeholder="Course Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          />

          {/* Duration */}
          <input
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          />

          {/* Category */}
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          >
            <option value="python">python</option>
            <option value="java">java</option>
            <option value="react">react</option>
            <option value="php">php</option>
            <option value="other">Other</option>
          </select>

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          />

          {/* File */}
          <input
            type="file"
            onChange={(e) => handleChange("syllabus", e.target.files[0])}
            className="w-full border p-2 rounded"
          />

          {/* Button */}
          <button
            onClick={addCourse}
            className="w-50 bg-blue-600 text-white py-2 rounded"
          >
            Submit
          </button>

        </div>
      </div>
    </div>
  );
}

export default Courses;