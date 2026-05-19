"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext"; 

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext); 

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  // Load Theme From LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle Theme
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

        {/* Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-500 dark:text-gray-300">
          <Link href="/" className="text-teal-600 hover:text-teal-700 transition">Home</Link>
          <Link href="/tutors" className="hover:text-teal-600 transition">Tutors</Link>
          <Link href="/services" className="hover:text-teal-600 transition">Services</Link>
          <Link href="/about" className="hover:text-teal-600 transition">About</Link>
          <Link href="/contact" className="hover:text-teal-600 transition">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

         
          {!user ? (
            <>
              <Link href="/login" className="bg-teal-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition">
                Login
              </Link>
              <Link href="/register" className="border border-teal-600 text-teal-600 dark:text-teal-400 px-5 py-2 rounded-md text-sm font-medium hover:bg-teal-50 dark:hover:bg-gray-800 transition">
                Register
              </Link>
            </>
          ) : (
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={logOut} 
              title="Click to Logout"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:inline">
                {user?.name || "User"}
              </span>
              <img
                className="h-9 w-9 rounded-full object-cover border-2 border-teal-500"
                src={user?.photo || "https://ui-avatars.com/api/?name=User"}
                alt="User Profile"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}