import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";


const AttendanceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("attendance/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (status) =>
    status === "present"
      ? "bg-green-500"
      : status === "absent"
        ? "bg-red-500"
        : "bg-yellow-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-10">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl  m-10">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">
          📅 Attendance
        </h2>

        {loading && <p className="text-center">Loading...</p>}
        {!loading && data.length === 0 && (
          <p className="text-center text-gray-500">No data found</p>
        )}

        {!loading && data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-xl">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-indigo-50">
                    <td className="p-3">{a.student_name}</td>
                    <td className="p-3">{a.course_name}</td>
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white ${statusColor(a.status)}`}
                      >
                        {a.status}
                      </span>
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

export default AttendanceList;
