import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md z-50">

      <h2 className="text-2xl font-bold text-yellow-400">
        EduSystem
      </h2>

      <ul className="flex gap-6 text-lg font-medium items-center">

        <NavLink to="/" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>Home</NavLink>
        <NavLink to="/student" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>Student</NavLink>
        <NavLink to="/teacher" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>Teacher</NavLink>
        <NavLink to="/admin" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>Admin</NavLink>
        <NavLink to="/signup" className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>Signup</NavLink>

      </ul>

    </nav>
  );
}

export default Header;