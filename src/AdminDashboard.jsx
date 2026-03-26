import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  // Example data, आप API से fetch भी कर सकते हैं
  const stats = [
    { title: "Users", count: 120, link: "/admin/users", color: "bg-blue-500" },
    { title: "Teachers", count: 35, link: "/admin/teachers", color: "bg-green-500" },
    { title: "Students", count: 250, link: "/admin/students", color: "bg-yellow-500" },
    { title: "Reports", count: 12, link: "/admin/reports", color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="space-y-2">
          {stats.map((stat) => (
            <Link
              key={stat.title}
              to={stat.link}
              className="block px-2 py-1 hover:bg-indigo-600 rounded"
            >
              {stat.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link
              to={stat.link}
              key={stat.title}
              className={`${stat.color} text-white p-5 rounded-lg shadow hover:shadow-lg transition`}
            >
              <h2 className="text-xl font-semibold">{stat.title}</h2>
              <p className="text-3xl font-bold mt-2">{stat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;