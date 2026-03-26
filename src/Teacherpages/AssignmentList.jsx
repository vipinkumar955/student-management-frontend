import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch assignments
  useEffect(() => {
    API.get("assignments/")
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Search filter
  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-300 p-10">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg p-6 rounded-3xl shadow-2xl m-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-3xl font-bold text-indigo-700">📚 Assignments</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search assignment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Empty */}
        {!loading && filteredAssignments.length === 0 && (
          <p className="text-center text-gray-500">No assignments found</p>
        )}

        {/* Desktop Table */}
        {!loading && filteredAssignments.length > 0 && (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm rounded-xl overflow-hidden">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Student</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Marks</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAssignments.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b hover:bg-indigo-50 transition"
                    >
                      <td className="p-3 font-semibold text-indigo-700">
                        {a.title}
                      </td>

                      <td className="p-3 text-center">
                        {a.course_name || a.course}
                      </td>

                      <td className="p-3 text-center">
                        {a.student_name || a.student}
                      </td>

                      <td className="p-3 text-center">{a.due_date}</td>

                      <td className="p-3 text-center">{a.max_marks}</td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => deleteAssignment(a.id)}
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
          </>
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-indigo-600 m-10 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
      >
        ⬅️ Home{" "}
      </button>
    </div>
  );
};

export default AssignmentList;
