import React, { useEffect, useState } from "react";
import API from "../api";

const AssignmentSearch = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("student/assignments/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Assignments
        </h2>

        {data.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-lg">
            No assignments found
          </p>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((a, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-purple-100"
            >
              {/* Student Info */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-purple-600">
                    {a.student_name || "No Name"}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="font-medium">ID:</span> {a.student_id || "-"}
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                  Max: {a.max_marks ?? 100}
                </span>
              </div>

              {/* Assignment Details */}
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Title:</span> {a.title || "Untitled Assignment"}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Course:</span> {a.course || "N/A"}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                <span className="font-medium">Due Date:</span> {a.due_date || "N/A"}
              </p>

              {/* Status Badge Example */}
              <p className="mt-3 text-sm text-gray-500">
                <span className="font-medium">Status:</span>{" "}
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  a.status === "submitted"
                    ? "bg-green-100 text-green-800"
                    : a.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {a.status?.toUpperCase() || "PENDING"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentSearch;