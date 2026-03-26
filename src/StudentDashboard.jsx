import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBook, FaCalendarAlt, FaChartBar } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

function StudentDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-500 to-purple-500 text-white p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            🎓 Student Panel
          </h2>

          <nav className="space-y-4">
            <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-600 transition">
              <FaHome /> Home page
            </Link>
            <Link to="/assignment-search" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-600 transition">
              <FaBook /> AssignmentSearch
            </Link>
            <Link to="/attendance-search" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-600 transition">
              <FaCalendarAlt /> AttendanceSearch
            </Link>
            <Link to="/student-search" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-600 transition">
              <FaChartBar /> Grade
            </Link>
          </nav>
        </div>

        <div className="mt-6">
          <button className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2 p-2 rounded-lg transition">
            <AiOutlineLogout /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Student 🎓
          </h1>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-400 text-white p-6 rounded-xl shadow flex flex-col items-start justify-between transition hover:shadow-lg">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Enrolled Courses</h3>
            </div>
            <p className="text-3xl font-bold mt-4">5</p>
          </div>

          <div className="bg-red-400 text-white p-6 rounded-xl shadow flex flex-col items-start justify-between transition hover:shadow-lg">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Pending Assignments</h3>
            </div>
            <p className="text-3xl font-bold mt-4">2</p>
          </div>

          <div className="bg-green-400 text-white p-6 rounded-xl shadow flex flex-col items-start justify-between transition hover:shadow-lg">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Completed Courses</h3>
            </div>
            <p className="text-3xl font-bold mt-4">3</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">📘 Submitted Math Assignment</li>
            <li className="flex items-center gap-2">📗 Completed React Course</li>
            <li className="flex items-center gap-2">📙 Joined New Python Class</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;