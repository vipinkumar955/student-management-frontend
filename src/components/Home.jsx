import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); 
  const token = localStorage.getItem("access");

  const handleClick = (panel) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== panel) {
      alert("Access Denied");
      return;
    }

    navigate(`/${panel}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 pt-24">

      {/*  Hero Section  */}
      <div
        className="h-[350px] bg-cover bg-center rounded-b-[40px] shadow-2xl mx-1"
        style={{ backgroundImage: `url("/ed.jpg")` }}
      ></div>

    
      <div className="flex flex-wrap justify-center gap-10 mt-16 px-6">

        {/* Student */}
        <div
          onClick={() => handleClick("student")}
          className="group cursor-pointer w-80 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-300 p-6 text-center border"
        >
          <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-5 border-4 border-indigo-200 group-hover:scale-110 transition">
            <img src="/student.jpg" alt="Student" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">🎓 Student Panel</h3>
          <p className="text-gray-600 text-sm">View grades & assignments</p>
        </div>

        {/* Teacher */}
        <div
          onClick={() => handleClick("teacher")}
          className="group cursor-pointer w-80 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-300 p-6 text-center border"
        >
          <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-5 border-4 border-green-200 group-hover:scale-110 transition">
            <img src="/teacher.png" alt="Teacher" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-2xl font-bold text-green-700 mb-2"> Teacher Panel</h3>
          <p className="text-gray-600 text-sm">Manage courses & students</p>
        </div>

        {/* Admin */}
        <div
          onClick={() => handleClick("admin")}
          className="group cursor-pointer w-80 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-300 p-6 text-center border"
        >
          <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-5 border-4 border-red-200 group-hover:scale-110 transition">
            <img src="/admin.jpg" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-2xl font-bold text-red-700 mb-2"> Admin Panel</h3>
          <p className="text-gray-600 text-sm">System control & management</p>
        </div>

      </div>

      
      <div className="grid md:grid-cols-3 gap-8 mt-20 px-10">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-indigo-600 mb-2"> Analytics</h3>
          <p className="text-gray-600 text-sm">
            Track performance and view detailed reports easily
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-green-600 mb-2">Courses</h3>
          <p className="text-gray-600 text-sm">
            Access and manage all courses in one place
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-red-600 mb-2">Security</h3>
          <p className="text-gray-600 text-sm">
            Secure login system with role-based access
          </p>
        </div>

      </div>

    
     

    </div>
  );
}

export default Home;