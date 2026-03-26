import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Grade() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    student: "",
    studentName: "",
    assignment: "",
    assignmentTitle: "",
    course: "",
    courseName: "",
    score: "",
    total: 100,
    date: "",
  });
  const [error, setError] = useState("");

  // Fetch students & assignments
  useEffect(() => {
    API.get("students/")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));

    API.get("assignments/")
      .then(res => setAssignments(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  const handleStudent = (id) => {
    const s = students.find(x => x.id == id);
    setForm({
      ...form,
      student: id,
      studentName: s?.student_name || ""
    });
  };

  const handleAssignment = (id) => {
    const a = assignments.find(x => x.id == id);
    setForm({
      ...form,
      assignment: id,
      assignmentTitle: a?.title || "",
      course: a?.course || "",
      courseName: a?.course_name || ""
    });
  };

  const submit = async () => {
    const { student, assignment, score, date } = form;

    if (!student || !assignment || !score || !date) {
      return setError("All fields are required!");
    }

    try {
      await API.post("grades/", {
        student: Number(student),
        assignment: Number(assignment),
        course: Number(form.course),
        score: Number(form.score),
        total: Number(form.total),
        date_recorded: form.date,
      });

      alert(" Grade Added");
      navigate("/grade-list");

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) setError(JSON.stringify(err.response.data));
      else setError("Something went wrong!");
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
            onChange={(e) => handleStudent(e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          >
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.student_name}</option>
            ))}
          </select>
          <input
            value={form.studentName}
            readOnly
            placeholder="Student Name"
            className="w-full border p-2 rounded outline-none bg-gray-100"
          />

          {/* Assignment */}
          <select
            onChange={(e) => handleAssignment(e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          >
            <option value="">Select Assignment</option>
            {assignments.map(a => (
              <option key={a.id} value={a.id}>{a.title}</option>
            ))}
          </select>
          <input
            value={form.assignmentTitle}
            readOnly
            placeholder="Assignment Title"
            className="w-full border p-2 rounded outline-none bg-gray-100"
          />
          <input
            value={form.courseName}
            readOnly
            placeholder="Course Name"
            className="w-full border p-2 rounded outline-none bg-gray-100"
          />

          {/* Score */}
          <input
            type="number"
            placeholder="Score"
            value={form.score}
            onChange={(e) => handleChange("score", e.target.value)}
            className="w-full border p-2 rounded outline-none"
          />

          <input
            type="number"
            placeholder="Total Marks"
            value={form.total}
            onChange={(e) => handleChange("total", e.target.value)}
            className="w-full border p-2 rounded outline-none"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full border p-2 rounded outline-none"
          />

          <button
            onClick={submit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300"
          >
            Submit
          </button>

        </div>
      </div>
    </div>
  );
}

export default Grade;