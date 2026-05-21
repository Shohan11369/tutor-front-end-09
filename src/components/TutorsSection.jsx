"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TutorsSection() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch("https://tutor-server-09.vercel.app/tutors?limit=6") 
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 bg-white dark:bg-[#0b0f19]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00c49f] mx-auto"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">Loading active learning sessions...</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-[#0b0f19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Available Tutors
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Browse our top selected expert tutors and book your ideal schedule instantly.
        </p>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center bg-white dark:bg-[#111827] p-12 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm max-w-md mx-auto">
          <p className="text-gray-500 dark:text-gray-400">No active tutors found in the repository right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tutors.map((tutor) => (
            <div 
              key={tutor._id} 
              className="bg-white dark:bg-[#111827] rounded-3xl shadow-md dark:shadow-xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-between transition hover:scale-[1.02] duration-300"
            >
              <div>
                {/* Tutor Image Container */}
                <div className="rounded-2xl overflow-hidden mb-5 bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={tutor.tutorImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"} 
                    alt={tutor.tutorName} 
                    className="w-full h-52 object-cover"
                  />
                </div>

                {/* Name & Subject */}
                <h3 className="font-bold text-gray-900 dark:text-white text-xl">{tutor.tutorName}</h3>
                <p className="text-xs text-teal-600 dark:text-[#00c49f] font-semibold mt-1 mb-4">{tutor.subject}</p>

                {/* Info List */}
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <p>
                    <span className="font-bold text-gray-900 dark:text-white">Available:</span> {tutor.availableDays || "Sun - Thu"} ({tutor.availableTime || "5:00 PM - 8:00 PM"})
                  </p>
                  <p>
                    <span className="font-bold text-gray-900 dark:text-white">Teaching Mode:</span> {tutor.teachingMode || "Online"}
                  </p>
                  <p>
                    <span className="font-bold text-gray-900 dark:text-white">Hourly Fee:</span> ৳{tutor.hourlyFee}/hr
                  </p>
                  <p>
                    <span className="font-bold text-gray-900 dark:text-white">Slots Left:</span> 
                    <span className={`ml-1 font-semibold ${tutor.totalSlot > 0 ? "text-green-600 dark:text-[#00c49f]" : "text-red-500"}`}>
                      {tutor.totalSlot} slots
                    </span>
                  </p>
                </div>
              </div>

              {/* Redirection Button to Details Page */}
              <div className="mt-6">
                <Link href={`/tutors/${tutor._id}`}>
                  <button className="w-full bg-[#00c49f] hover:bg-[#00b08f] text-white py-3 rounded-xl font-bold text-sm transition shadow-md tracking-wide">
                    Book Session
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}