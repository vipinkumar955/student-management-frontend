// src/components/CourseList.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  

  useEffect(() => {
    API.get("courses/")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-300 p-10">

      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg p-6 rounded-3xl shadow-2xl m-10">

        {/* Header */}
         

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-3xl font-bold text-indigo-700">
            📚 Courses
          </h2>
         
           


          {/* Search */}
          <input
            type="text"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* Empty */}
        {!loading && filteredCourses.length === 0 && (
          <p className="text-center text-gray-500">
            No courses found
          </p>
        )}

        {/* Desktop Table */}
        {!loading && filteredCourses.length > 0 && (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm rounded-xl overflow-hidden">

                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3">Teacher</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Syllabus</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCourses.map(c => (
                    <tr key={c.id} className="border-b hover:bg-indigo-50 transition">

                      <td className="p-3 font-semibold text-indigo-700">
                        {c.name}
                      </td>

                      <td className="p-3 text-center">
                        {c.teacher || "N/A"}
                      </td>

                      <td className="p-3 text-center">
                        {c.duration || "-"}
                      </td>

                      <td className="p-3 text-center">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                          {c.category}
                        </span>
                      </td>

                      <td className="p-3 text-center">
                        {c.syllabus ? (
                          <a
                            href={c.syllabus}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 hover:underline"
                          >
                            📄 View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
               <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 m-10 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            ⬅️ Home
          </button>
            </div>

           
          </>
        )}

      </div>
    </div>
  );
}

export default CourseList;