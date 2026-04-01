import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md z-50">
      <h2 className="text-2xl font-bold text-yellow-400 cursor-pointer" onClick={() => navigate("/")}>
        EduSystem
      </h2>

      <ul className="flex gap-6 text-lg font-medium items-center">
        <NavLink to="/" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>
          Home
        </NavLink>
        
        {token && role === "student" && (
          <NavLink to="/student" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>
            Dashboard
          </NavLink>
        )}
        
        {token && role === "teacher" && (
          <NavLink to="/teacher" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>
            Dashboard
          </NavLink>
        )}
        
        {token && role === "admin" && (
          <NavLink to="/admin" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>
            Dashboard
          </NavLink>
        )}
        
        {!token ? (
          <>
            <NavLink to="/login" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>
              Login
            </NavLink>
            <NavLink to="/signup" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>
              Signup
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
}

export default Header;