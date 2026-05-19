"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-teal-600 tracking-wide cursor-pointer">
          Tutors-Finder
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-500 dark:text-gray-300">
          <Link href="/" className="hover:text-teal-600 transition">Home</Link>
          <Link href="/tutor" className="hover:text-teal-600 transition">Tutors</Link>
          
          {/* if login the show  */}
          {user && (
            <>
              <Link href="/add-tutor" className="hover:text-teal-600 transition">Add Tutor</Link>
              <Link href="/my-tutors" className="hover:text-teal-600 transition">My Tutors</Link>
              <Link href="/my-bookings" className="hover:text-teal-600 transition">My Booked Sessions</Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md text-sm">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {!user ? (
            <>
              <Link href="/login" className="bg-teal-600 text-white px-5 py-2 rounded-md text-sm hover:bg-teal-700 transition">Login</Link>
              <Link href="/register" className="border border-teal-600 text-teal-600 px-5 py-2 rounded-md text-sm hover:bg-teal-50 transition">Register</Link>
            </>
          ) : (
            /* User Profile Dropdown */
            <div className="relative group cursor-pointer">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:inline">{user?.name}</span>
                <img className="h-9 w-9 rounded-full object-cover border-2 border-teal-500" src={user?.photo} alt="Profile" />
              </div>
              
              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-2 hidden group-hover:block">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                <button onClick={logOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}