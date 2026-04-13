import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Grade() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [form, setForm] = useState({
    student: "",
    assignment: "",
    course: "",
    score: "",
    total: 100,
    date: "",
  });

  const [error, setError] = useState("");

  // Fetch data
  useEffect(() => {
    API.get("students/")
      .then(res => setStudents(res.data))
      .catch(() => setError("Failed to load students"));

    API.get("assignments/")
      .then(res => setAssignments(res.data))
      .catch(() => setError("Failed to load assignments"));
  }, []);

  // Handle change
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  // Auto set course when assignment selected
  const handleAssignment = (id) => {
    const a = assignments.find(x => x.id == id);
    setForm({
      ...form,
      assignment: id,
      course: a?.course || ""
    });
  };

  // Submit
  const submit = async () => {
    const { student, assignment, score, date } = form;

    if (!student || !assignment || !score || !date) {
      return setError("All fields are required");
    }

    try {
      await API.post("grades/", {
        student: Number(student),
        assignment: Number(assignment),
        course: Number(form.course),
        score: Number(score),
        total: Number(form.total),
        date_recorded: date,
      });

      alert(" Grade Added");
      navigate("/grade-list");

    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.non_field_errors
            ? "Grade already exists"
            : "Error occurred"
        );
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-6">Add Grade</h2>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

        <div className="space-y-4">

          {/* Student */}
          <select
            value={form.student}
            onChange={(e) => handleChange("student", e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.student_name}
              </option>
            ))}
          </select>

          {/* Assignment */}
          <select
            value={form.assignment}
            onChange={(e) => handleAssignment(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Assignment</option>
            {assignments.map(a => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>

          {/* Score */}
          <input
            type="number"
            placeholder="Score"
            value={form.score}
            onChange={(e) => handleChange("score", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Total Marks"
            value={form.total}
            onChange={(e) => handleChange("total", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={submit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Submit
          </button>

        </div>
      </div>
    </div>
  );
}

export default Grade;