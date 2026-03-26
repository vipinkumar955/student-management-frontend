import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // logged-in user's role

  const handleClick = (panel) => {
    // User logged out → login page
    if (!role) {
      navigate("/login");
      return;
    }

    // Role mismatch → alert
    if (role !== panel) {
      alert("Access Denied");
      return;
    }

    // Role match → dashboard
    navigate(`/${panel}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24"> {/* pt-24 → navbar ke liye spacing */}

      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center text-center h-96 bg-cover bg-center rounded-b-3xl shadow-lg mx-4"
        style={{ backgroundImage: `url("/ed.jpg")` }}
      >
        <div className="absolute inset-0 bg-black opacity-40 rounded-b-3xl"></div>
        <h1 className="text-white text-4xl font-bold z-10">Welcome to EduSystem</h1>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 px-4">

        {/* Student */}
        <div
          onClick={() => handleClick("student")}
          className="cursor-pointer bg-white rounded-3xl w-72 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition p-6 text-center"
        >
          <img src="/student.jpg" alt="Student" className="mx-auto w-32 h-32 object-cover rounded-full mb-4 shadow-md" />
          <h3 className="text-2xl font-semibold mb-2 text-indigo-700">🎓 Student Panel</h3>
          <p className="text-gray-600">View grades, attendance & assignments</p>
        </div>

        {/* Teacher */}
        <div
          onClick={() => handleClick("teacher")}
          className="cursor-pointer bg-white rounded-3xl w-72 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition p-6 text-center"
        >
          <img src="/teacher.png" alt="Teacher" className="mx-auto w-32 h-32 object-cover rounded-full mb-4 shadow-md" />
          <h3 className="text-2xl font-semibold mb-2 text-green-700">👨‍🏫 Teacher Panel</h3>
          <p className="text-gray-600">Manage courses, assignments & attendance</p>
        </div>

        {/* Admin */}
        <div
          onClick={() => handleClick("admin")}
          className="cursor-pointer bg-white rounded-3xl w-72 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition p-6 text-center"
        >
          <img src="/admin.jpg" alt="Admin" className="mx-auto w-32 h-32 object-cover rounded-full mb-4 shadow-md" />
          <h3 className="text-2xl font-semibold mb-2 text-red-700">🛡️ Admin Panel</h3>
          <p className="text-gray-600">Full system control & user management</p>
        </div>

      </div>
    </div>
  );
}

export default Home;