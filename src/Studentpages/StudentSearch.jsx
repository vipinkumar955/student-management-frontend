import React, { useEffect, useState } from "react";
import API from "../api";

function StudentSearch() {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("student/grades/")
      .then((res) => setGrades(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch grades");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Student Grades
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-center font-medium">
            {error}
          </div>
        )}

        {grades.length === 0 && !error && (
          <p className="text-center text-gray-500 mt-6 text-lg">No grades found</p>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grades.map((g, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-indigo-100"
            >
              {/* Student Info */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600">
                    {g.student_name || "No Name"}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="font-medium">ID:</span> {g.student_id || "-"}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    g.score >= g.total * 0.7
                      ? "bg-green-100 text-green-800"
                      : g.score >= g.total * 0.4
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {g.score}/{g.total}
                </span>
              </div>

              {/* Course and Assignment */}
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Course:</span> {g.course || "No Course"}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Assignment:</span> {g.assignment || "No Assignment"}
              </p>

              <p className="text-gray-400 text-sm mt-3">
                <span className="font-medium">Date:</span> {g.date || "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentSearch;