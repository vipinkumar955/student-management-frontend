// src/components/StudentList.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // fetch
  useEffect(() => {
    API.get("students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  //  delete
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete student?")) return;

    try {
      await API.delete(`students/${id}/`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert(" Delete Failed");
    }
  };

  // 🔹 filter
  const filteredStudents = students.filter((s) =>
    s.student_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-300 p-10">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg p-6 rounded-3xl shadow-2xl m-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-3xl font-bold text-indigo-700">👨‍🎓 Students</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none w-full sm:w-auto"
          />
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Empty */}
        {!loading && filteredStudents.length === 0 && (
          <p className="text-center text-gray-500">No students found</p>
        )}

        {/* Desktop Table */}
        {!loading && filteredStudents.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm rounded-xl overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-center">Courses</th>
                  <th className="p-3 text-center">Joined</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-indigo-50">
                    <td className="p-3 font-semibold text-indigo-700">
                      {s.student_name || "N/A"}
                    </td>

                    <td className="p-3 text-center">
                      {s.enrolled_courses?.length
                        ? s.enrolled_courses.map((c) => c.name).join(", ")
                        : "No Courses"}
                    </td>

                    <td className="p-3 text-center">
                      {s.date_joined
                        ? new Date(s.date_joined).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-3 flex justify-center">
                      <button
                        onClick={() => deleteStudent(s.id)}
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
      <button
        onClick={() => navigate("/")}
        className="bg-indigo-600 m-10 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
      >
        ⬅️ Home{" "}
      </button>
    </div>
  );
};

export default StudentList;
