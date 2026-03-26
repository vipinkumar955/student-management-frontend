import React, { useEffect, useState } from "react";
import API from "../api";

const AttendanceSearch = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("student/attendance/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
           Attendance
        </h2>

        {data.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No attendance found</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {data.map((a, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition duration-300 border border-green-100"
            >
              {/* Student Info */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-green-600">
                    {a.student_name || "No Name"}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="font-medium">ID:</span> {a.student_id || "-"}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    a.status === "present"
                      ? "bg-green-100 text-green-800"
                      : a.status === "absent"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {a.status.toUpperCase()}
                </span>
              </div>

              {/* Course & Date */}
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Course:</span> {a.course || "No Course"}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                <span className="font-medium">Date:</span> {a.date || "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceSearch;