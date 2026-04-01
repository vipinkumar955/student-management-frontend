import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AddAttendance() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    student: "",
    course: "",
    date: "",
    status: "present",
  });
  const [error, setError] = useState("");

  // Fetch students & courses
  useEffect(() => {
    Promise.all([API.get("students/"), API.get("courses/")])
      .then(([sRes, cRes]) => {
        setStudents(sRes.data.map(s => ({
          id: s.id,
          name: s.student_name || "Unknown"
        })));
        setCourses(cRes.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handle = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  const submit = async () => {
    const { student, course, date, status } = form;
    if (!student || !course || !date) {
      return setError("All fields are required!");
    }

    try {
      await API.post("attendance/", { student: Number(student), course: Number(course), date, status });
      alert(" Attendance Added");
      setForm({ student: "", course: "", date: "", status: "present" });
      navigate("/attendance-list");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.non_field_errors ? "Attendance already exists ❗" : JSON.stringify(err.response.data));
      } else {
        setError("Something went wrong ");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 px-4 py-10">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-6">Add Attendance</h2>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

        <div className="space-y-4">

          {/* Student */}
          <select
            value={form.student}
            onChange={(e) => handle("student", e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Course */}
          <select
            value={form.course}
            onChange={(e) => handle("course", e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Date */}
          <input
            type="date"
            value={form.date}
            onChange={(e) => handle("date", e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          />

          {/* Status */}
          <select
            value={form.status}
            onChange={(e) => handle("status", e.target.value)}
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>

          {/* Submit Button */}
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

export default AddAttendance;