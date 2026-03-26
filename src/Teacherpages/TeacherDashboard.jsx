import React from "react";
import { Link } from "react-router-dom";
import { FiBook, FiClipboard, FiBarChart2, FiCalendar, FiMessageCircle, FiLogOut } from "react-icons/fi";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 bg-blue-600 text-white text-2xl font-bold">
          Teacher Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/courses" className="flex items-center p-3 rounded hover:bg-blue-100">
            <FiBook className="mr-3"/> Courses
          </Link>

          <Link to="/assignments" className="flex items-center p-3 rounded hover:bg-green-100">
            <FiClipboard className="mr-3"/> Assignments
          </Link>

          <Link to="/grades" className="flex items-center p-3 rounded hover:bg-purple-100">
            <FiBarChart2 className="mr-3"/> Grades
          </Link>

          <Link to="/Addstudent" className="flex items-center p-3 rounded hover:bg-yellow-100">
            <FiCalendar className="mr-3"/> student
          </Link>

          <Link to="/attendance" className="flex items-center p-3 rounded hover:bg-red-100">
            <FiMessageCircle className="mr-3"/>AddAttendance
          </Link>
        </nav>

        <div className="p-4">
          <button className="flex items-center w-full p-3 bg-gray-200 rounded hover:bg-gray-300">
            <FiLogOut className="mr-3"/> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, Teacher!</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/courses" className="bg-blue-500 text-white p-6 rounded shadow hover:bg-blue-600 transition">
            <FiBook size={32} className="mb-2"/>
            <h2 className="text-xl font-semibold">Courses</h2>
            <p className="mt-1">Manage your courses</p>
          </Link>

          <Link to="/assignments" className="bg-green-500 text-white p-6 rounded shadow hover:bg-green-600 transition">
            <FiClipboard size={32} className="mb-2"/>
            <h2 className="text-xl font-semibold">Assignments</h2>
            <p className="mt-1">Create & review assignments</p>
          </Link>

          <Link to="/grades" className="bg-purple-500 text-white p-6 rounded shadow hover:bg-purple-600 transition">
            <FiBarChart2 size={32} className="mb-2"/>
            <h2 className="text-xl font-semibold">Grades</h2>
            <p className="mt-1">Track student performance</p>
          </Link>

          <Link to="/attendance" className="bg-yellow-500 text-white p-6 rounded shadow hover:bg-yellow-600 transition">
            <FiCalendar size={32} className="mb-2"/>
            <h2 className="text-xl font-semibold">AddAttendance</h2>
            <p className="mt-1">Manage class timings</p>
          </Link>
          <Link to="/Addstudent" className="bg-red-500 text-white p-6 rounded shadow hover:bg-red-600 transition">
            <FiMessageCircle size={32} className="mb-2"/>
            <h2 className="text-xl font-semibold">AddStudent</h2>
            <p className="mt-1">Communicate with students</p>
          </Link>
         

        </div>
        
      </div>

    </div>
  );
};

export default TeacherDashboard;