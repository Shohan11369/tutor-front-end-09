"use client";
import { useEffect, useState } from "react";

export default function MyTutorsPage() {
  const [myTutors, setMyTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  
 
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  
  const [updatedFee, setUpdatedFee] = useState("");
  const [updatedSlots, setUpdatedSlots] = useState("");

  const tutorEmail = "tutor@gmail.com";


  const fetchMyTutors = () => {
    fetch(`http://localhost:8080/tutors`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.tutorEmail === tutorEmail);
        setMyTutors(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching my tutors:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyTutors();
  }, []);


  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this tutoring session?")) {
      fetch(`http://localhost:8080/tutors/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          alert("Session deleted successfully! 🗑️");
          fetchMyTutors(); 
        })
        .catch((err) => console.error("Error deleting session:", err));
    }
  };

  const handleOpenUpdateModal = (tutor) => {
    setSelectedTutor(tutor);
    setUpdatedFee(tutor.hourlyFee);
    setUpdatedSlots(tutor.totalSlot);
    setIsUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/tutors/${selectedTutor._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hourlyFee: parseFloat(updatedFee),
          totalSlot: parseInt(updatedSlots)
        })
      });

      if (response.ok) {
        alert("Tutor session specs updated successfully! 🎉");
        setIsUpdateModalOpen(false);
        fetchMyTutors();
      } else {
        alert("Failed to update session specs.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-12 px-4 sm:px-6 lg:px-8">
      
    
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Tutors Sessions</h1>
          <p className="text-gray-400 text-xs mt-1">Manage, update, or remove the tutoring slots you have posted.</p>
        </div>
        <a href="/add-tutor" className="inline-flex items-center justify-center bg-[#00c49f] hover:bg-[#00b08f] text-black font-semibold text-sm px-5 py-2.5 rounded-xl transition shadow-lg">
          + Add New Session
        </a>
      </div>

  
      <div className="max-w-6xl mx-auto bg-[#111827] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00c49f] mx-auto"></div>
          </div>
        ) : myTutors.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            You haven't posted any tutoring sessions yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-[#1f2937]/50 text-[11px] uppercase tracking-wider font-bold text-gray-400">
                  <th className="px-6 py-4">Tutor Details</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Price / Slots</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm">
                {myTutors.map((tutor) => (
                  <tr key={tutor._id} className="hover:bg-[#1f2937]/30 transition">
                    
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img 
                        src={tutor.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"} 
                        alt={tutor.tutorName}
                        className="w-10 h-10 rounded-xl object-cover border border-gray-700"
                      />
                      <div>
                        <p className="font-semibold text-white">{tutor.tutorName}</p>
                        <p className="text-[11px] text-gray-500">Location: {tutor.location || "Remote"}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium">
                        {tutor.subject}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#00c49f]">৳{tutor.hourlyFee}/hr</div>
                      <div className="text-[11px] text-gray-400">{tutor.totalSlot} slots available</div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-2">
                    
                        <button 
                          onClick={() => handleOpenUpdateModal(tutor)}
                          className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg border border-blue-500/20 text-xs font-medium transition"
                        >
                          Update
                        </button>
                        <button 
                          onClick={() => handleDelete(tutor._id)}
                          className="px-3 py-1.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg border border-red-500/20 text-xs font-medium transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] w-full max-w-md rounded-2xl border border-gray-800 p-6 relative shadow-2xl">
            <h2 className="text-xl font-bold mb-1 text-white">Update Session Specs</h2>
            <p className="text-gray-400 text-xs mb-4">Modify pricing or slot counts for {selectedTutor?.tutorName}</p>
            
            <form onSubmit={handleConfirmUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Hourly Fee (৳)</label>
                <input 
                  type="number" 
                  value={updatedFee} 
                  onChange={(e) => setUpdatedFee(e.target.value)} 
                  className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Total Available Slots</label>
                <input 
                  type="number" 
                  value={updatedSlots} 
                  onChange={(e) => setUpdatedSlots(e.target.value)} 
                  className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]" 
                  required 
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsUpdateModalOpen(false)} 
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl font-semibold text-sm transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-[#00c49f] hover:bg-[#00b08f] text-black font-bold py-2.5 rounded-xl text-sm transition shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}