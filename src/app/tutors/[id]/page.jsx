"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const [studentName, setStudentName] = useState("John Doe"); 
  const [studentEmail, setStudentEmail] = useState("student@gmail.com"); 
  const [phone, setPhone] = useState("");
  const [toastMessage, setToastMessage] = useState({ text: "", type: "" });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/tutors/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTutor(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tutor:", err);
          setLoading(false);
        });
    }
  }, [id]);

  
  const showToast = (text, type = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage({ text: "", type: "" }), 4000);
  };


  const handleOpenBookingModal = () => {
    if (!tutor) return;

  
    if (parseInt(tutor.totalSlot) === 0) {
      showToast("No available slots left for this tutor.", "error");
      return;
    }

    
    const currentDate = new Date();
    const sessionDate = new Date(tutor.sessionStartDate);
    if (currentDate < sessionDate) {
      showToast("Booking is not available yet for this tutor.", "error");
      return;
    }

    setIsModalOpen(true);
  };

 
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!phone) {
      showToast("Please provide your phone number.", "error");
      return;
    }

    setBookingLoading(true);

    const bookingInfo = {
      tutorId: tutor._id,
      tutorName: tutor.tutorName,
      subject: tutor.subject,
      hourlyFee: tutor.hourlyFee,
      studentName,
      studentEmail,
      phone,
      bookingStatus: "Review" 
    };

    try {
      const response = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      });

      if (response.ok) {
        showToast("Session Booked Successfully! 🎉", "success");
        setIsModalOpen(false);
        
        setTutor(prev => ({ ...prev, totalSlot: prev.totalSlot - 1 }));
      } else {
        const errData = await response.json();
        showToast(errData.message || "Booking failed.", "error");
      }
    } catch (err) {
      showToast("Failed to connect to backend server.", "error");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f19]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00c49f]"></div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-gray-400">
        Tutor session data could not be retrieved.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      
      
      {toastMessage.text && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-2xl transition-all font-medium text-sm border ${
          toastMessage.type === "error" ? "bg-red-950 border-red-500 text-red-200" : "bg-emerald-950 border-emerald-500 text-emerald-200"
        }`}>
          {toastMessage.text}
        </div>
      )}

      {/* details card UI */}
      <div className="max-w-4xl mx-auto bg-[#111827] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="h-48 bg-gradient-to-r from-[#00c49f] to-indigo-900 relative"></div>
        
        <div className="px-8 pb-8 relative">
          <div className="absolute -top-20 left-8">
            <img 
              src={tutor.tutorImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"} 
              alt={tutor.tutorName} 
              className="w-36 h-36 rounded-2xl object-cover border-4 border-[#111827] shadow-xl"
            />
          </div>

          <div className="pt-20 md:flex md:items-center md:justify-between border-b border-gray-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{tutor.tutorName}</h1>
              <span className="text-xs text-[#00c49f] bg-[#00c49f]/10 px-3 py-1 rounded-full font-semibold mt-2 inline-block">
                {tutor.subject}
              </span>
            </div>
            <div className="mt-4 md:mt-0 bg-[#0f172a] border border-gray-800 px-6 py-3 rounded-2xl text-center">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Hourly Fee</p>
              <p className="text-2xl font-black text-[#00c49f]">৳{tutor.hourlyFee}/hr</p>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-sm text-gray-300">
            <div>
              <p className="mb-2"><strong className="text-white">Institution & Experience:</strong> {tutor.institution || "Not specified"}</p>
              <p className="mb-2"><strong className="text-white">Teaching Mode:</strong> {tutor.teachingMode || "Both"}</p>
              <p><strong className="text-white">Location:</strong> {tutor.location || "Dhaka, Bangladesh"}</p>
            </div>
            <div>
              <p className="mb-2"><strong className="text-white">Available Days:</strong> {tutor.availableDays}</p>
              <p className="mb-2"><strong className="text-white">Session Start Date:</strong> {tutor.sessionStartDate}</p>
              <p>
                <strong className="text-white">Available Slots:</strong>{" "}
                <span className={parseInt(tutor.totalSlot) > 0 ? "text-[#00c49f]" : "text-red-500"}>
                  {tutor.totalSlot} slots left
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
            <button 
              onClick={handleOpenBookingModal}
              className="w-full sm:w-auto bg-[#00c49f] hover:bg-[#00b08f] text-white px-10 py-4 rounded-xl font-bold text-sm tracking-wide shadow-lg transition"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>

      {/* booking  */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111827] w-full max-w-md rounded-2xl border border-gray-800 p-6 relative shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">Confirm Your Booking</h2>
            
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Student Name</label>
                <input 
                  type="text" 
                  value={studentName} 
                  disabled 
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Student Email</label>
                <input 
                  type="email" 
                  value={studentEmail} 
                  disabled 
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Tutor Name</label>
                <input 
                  type="text" 
                  value={tutor.tutorName} 
                  disabled 
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Tutor ID</label>
                <input 
                  type="text" 
                  value={tutor._id} 
                  disabled 
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="Enter your active mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl font-semibold text-sm transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 bg-[#00c49f] hover:bg-[#00b08f] text-white py-2.5 rounded-xl font-semibold text-sm transition shadow-md disabled:bg-gray-600"
                >
                  {bookingLoading ? "Confirming..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}