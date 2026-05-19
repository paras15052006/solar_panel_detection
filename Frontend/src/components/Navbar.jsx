// src/components/Navbar.jsx

import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            Solar Panel Analyzer
          </h1>
          <p className="text-sm text-slate-300">
            AI-Based Rooftop Solar Detection
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-lg">
          <li className="hover:text-yellow-400 cursor-pointer transition duration-200">
            Home
          </li>

          <li className="hover:text-yellow-400 cursor-pointer transition duration-200">
            Dashboard
          </li>

          <li className="hover:text-yellow-400 cursor-pointer transition duration-200">
            About
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;