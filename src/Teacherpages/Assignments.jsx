import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const AddAssignment = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    max_marks: 100,
    course: "",
    student: "", // ⚡ required
  });
  const [error, setError] = useState("");

  // Fetch courses & students
  useEffect(() => {
    API.get("courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

    API.get("students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError(""); // reset error on change
  };

  const submit = async () => {
    const { title, description, due_date, course, student } = form;
    if (!title || !description || !due_date || !course || !student) {
      return setError("All fields are required!");
    }

    try {
      await API.post("assignments/", {
        ...form,
        max_marks: Number(form.max_marks),
        course: Number(course),
        student: Number(student), // ⚡ important for serializer
      });
      alert("✅ Assignment Added Successfully!");
      setForm({
        title: "",
        description: "",
        due_date: "",
        max_marks: 100,
        course: "",
        student: "",
      });
      navigate("/assignment-list");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">➕ Add Assignment</h2>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>}

        <div className="space-y-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="input w-full border px-3 py-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="input w-full border px-3 py-2 rounded"
          />

          <input
            type="date"
            value={form.due_date}
            onChange={(e) => handleChange("due_date", e.target.value)}
            className="input w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            value={form.max_marks}
            onChange={(e) => handleChange("max_marks", e.target.value)}
            className="input w-full border px-3 py-2 rounded"
          />

          <select
            value={form.course}
            onChange={(e) => handleChange("course", e.target.value)}
            className="input w-full border px-3 py-2 rounded"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={form.student}
            onChange={(e) => handleChange("student", e.target.value)}
            className="input w-full border px-3 py-2 rounded"
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.student_name}
              </option>
            ))}
          </select>

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
};

export default AddAssignment;