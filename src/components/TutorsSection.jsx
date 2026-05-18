"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TutorsSection() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/tutors?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setTutors(Array.isArray(data) ? data : data.tutors || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto"></div>

        <p className="text-gray-500 dark:text-gray-300 text-sm mt-4">
          Loading top tutors...
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition duration-300">
      
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Available Tutors
        </h2>

        <p className="text-gray-500 dark:text-gray-300 mt-3 text-sm">
          Find your perfect tutor and start learning today.
        </p>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          
          <p className="text-gray-500 dark:text-gray-300">
            No tutors available in database right now!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              
              {/* Image */}
              <div className="p-4 pb-0">
                <img
                  src={
                    tutor.tutorImage ||
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={tutor.tutorName}
                  className="w-full h-56 object-cover rounded-2xl"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {tutor.tutorName}
                </h3>

                <p className="text-gray-500 dark:text-gray-300 text-sm mb-3">
                  {tutor.subject || "Expert Tutor"}
                </p>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  
                  <p>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      Available:
                    </span>{" "}
                    {tutor.availableDays || "Sun - Thu"} ·{" "}
                    {tutor.availableTime || "5PM - 8PM"}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      Session Start:
                    </span>{" "}
                    {tutor.sessionStartDate || "Monday, June 1, 2026"}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      Fee:
                    </span>{" "}
                    ৳{tutor.hourlyFee}/hr
                  </p>
                </div>

                {/* Button */}
                <div className="mt-6">
                  <Link href={`/tutors/${tutor._id}`}>
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-medium transition">
                      Book Session
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}