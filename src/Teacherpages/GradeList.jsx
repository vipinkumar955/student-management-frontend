// src/components/GradeList.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function GradeList() {
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔹 Fetch
  useEffect(() => {
    API.get("grades/")
      .then((res) => setGrades(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this grade?")) return;

    try {
      await API.delete(`grades/${id}/`);
      setGrades((prev) => prev.filter((g) => g.id !== id));
    } catch {
      alert("❌ Error deleting");
    }
  };

  // 🔹 Filter
  const filteredGrades = grades.filter((g) =>
    g.student_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-300 p-10">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg p-6 rounded-3xl shadow-2xl m-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h1 className="text-3xl font-bold text-indigo-700"> Grades</h1>

          <div className="flex gap-2 w-full sm:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none w-full sm:w-auto"
            />

            {/* Add Button */}
            <button
              onClick={() => navigate("/grade")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Empty */}
        {!loading && filteredGrades.length === 0 && (
          <p className="text-center text-gray-500">No grades found</p>
        )}

        {/* Desktop Table */}
        {!loading && filteredGrades.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm rounded-xl overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-center">Assignment</th>
                  <th className="p-3 text-center">Course</th>
                  <th className="p-3 text-center">Score</th>
                  <th className="p-3 text-center">Date</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredGrades.map((g) => (
                  <tr key={g.id} className="border-b hover:bg-indigo-50">
                    <td className="p-3 font-semibold text-indigo-700">
                      {g.student_name}
                      <span className="block text-xs text-gray-400">
                        #{g.student}
                      </span>
                    </td>

                    <td className="p-3 text-center">{g.assignment_title}</td>

                    <td className="p-3 text-center">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                        {g.course_name}
                      </span>
                    </td>

                    <td className="p-3 text-center font-semibold text-indigo-600">
                      {g.score} / {g.total}
                    </td>

                    <td className="p-3 text-center">{g.date_recorded}</td>

                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/edit-grade/${g.id}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(g.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default GradeList;
