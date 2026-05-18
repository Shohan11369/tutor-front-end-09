"use client";
import { useState } from 'react';

export default function Navbar() {
  // true = লগইন করা আছে, false = লগইন করা নেই
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-teal-600 tracking-wide cursor-pointer">
          Tutors-Finder
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
          <a href="#" className="text-teal-600">Home</a>
          <a href="#" className="hover:text-teal-600 transition">Tutors</a>
          <a href="#" className="hover:text-teal-600 transition">Services</a>
          <a href="#" className="hover:text-teal-600 transition">About</a>
          <a href="#" className="hover:text-teal-600 transition">Contact</a>
        </div>

        {/* Dynamic Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => setIsLoggedIn(true)} 
                className="bg-teal-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition"
              >
                Login
              </button>
              <button className="border border-teal-600 text-teal-600 px-5 py-2 rounded-md text-sm font-medium hover:bg-teal-50 transition">
                Register
              </button>
            </>
          ) : (
            /* After Login User Profile */
            <div 
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => setIsLoggedIn(false)}
              title="Click to Logout"
            >
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">John Doe</span>
              <img 
                className="h-9 w-9 rounded-full object-cover border-2 border-teal-500" 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="User Profile" 
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}