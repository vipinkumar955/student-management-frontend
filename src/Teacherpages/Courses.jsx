import React, { useState } from "react";
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

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const addCourse = async () => {
    if (!form.name || !form.description) {
      return alert("Name & Description required");
    }

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("description", form.description);
      data.append("duration", form.duration);
      data.append("category", form.category);

      if (form.syllabus) {
        data.append("syllabus", form.syllabus);
      }

      const res = await API.post("courses/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/course-list");
    } catch (err) {
      console.error(err.response?.data);
      alert("Upload Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 py-10">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Add Course</h2>

        <input
          placeholder="Course Name"
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          placeholder="Duration"
          onChange={(e) => handleChange("duration", e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <select
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border p-2 mb-3"
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="react">React</option>
          <option value="php">PHP</option>
          <option value="other">Other</option>
        </select>

        <textarea
          placeholder="Description"
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          type="file"
          onChange={(e) => handleChange("syllabus", e.target.files[0])}
          className="w-full border p-2 mb-3"
        />

        <button
          onClick={addCourse}
          className="w-full bg-blue-600 text-white py-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Courses;