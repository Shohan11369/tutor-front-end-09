"use client";
import { useState } from "react";

export default function AddTutorPage() {
  const [formData, setFormData] = useState({
    tutorName: "",
    tutorImage: "",
    subject: "Mathematics", 
    availableDays: "",
    availableTime: "",
    hourlyFee: "",
    totalSlot: "",
    sessionStartDate: "",
    institution: "",
    experience: "",
    location: "",
    teachingMode: "Online" 
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ text: "", type: "" });

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const finalData = {
      ...formData,
      userEmail: "admin@gmail.com" 
    };

    try {
      const response = await fetch("http://localhost:8080/tutors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        showToast("Tutor Session Created Successfully! 🎉", "success");
      
        setFormData({
          tutorName: "",
          tutorImage: "",
          subject: "Mathematics",
          availableDays: "",
          availableTime: "",
          hourlyFee: "",
          totalSlot: "",
          sessionStartDate: "",
          institution: "",
          experience: "",
          location: "",
          teachingMode: "Online"
        });
      } else {
        showToast("Failed to create tutor session. Try again.", "error");
      }
    } catch (error) {
      showToast("Cannot connect to the server.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      
  
      {toast.text && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-2xl font-medium text-sm border ${
          toast.type === "error" ? "bg-red-950 border-red-500 text-red-200" : "bg-emerald-950 border-emerald-500 text-emerald-200"
        }`}>
          {toast.text}
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-[#111827] rounded-3xl border border-gray-800 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Add New Tutor</h1>
          <p className="text-gray-400 text-xs mt-2">Publish a new learning session for the students.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tutor Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Tutor Name *</label>
            <input 
              type="text" name="tutorName" required value={formData.tutorName} onChange={handleChange}
              placeholder="e.g. Dr. Anisur Rahman"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Photo URL *</label>
            <input 
              type="url" name="tutorImage" required value={formData.tutorImage} onChange={handleChange}
              placeholder="e.g. https://postimage.com/tutor.jpg"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            />
          </div>

          {/* Subject Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Subject / Category *</label>
            <select 
              name="subject" value={formData.subject} onChange={handleChange}
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>
          </div>

          {/* Teaching Mode Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Teaching Mode *</label>
            <select 
              name="teachingMode" value={formData.teachingMode} onChange={handleChange}
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Available Days */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Available Days *</label>
            <input 
              type="text" name="availableDays" required value={formData.availableDays} onChange={handleChange}
              placeholder="e.g. Sun, Tue, Thu"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            />
          </div>

          {/* Available Time Slot */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Available Time Slot *</label>
            <input 
              type="text" name="availableTime" required value={formData.availableTime} onChange={handleChange}
              placeholder="e.g. 5:00 PM - 8:00 PM"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            />
          </div>

          {/* Hourly Fee */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Hourly Fee (৳) *</label>
            <input 
              type="number" name="hourlyFee" required value={formData.hourlyFee} onChange={handleChange}
              placeholder="e.g. 500"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            />
          </div>

          {/* Total Slot */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Total Slot Limit *</label>
            <input 
              type="number" name="totalSlot" required value={formData.totalSlot} onChange={handleChange}
              placeholder="e.g. 10"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            />
          </div>

          {/* Session Start Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Session Start Date *</label>
            <input 
              type="date" name="sessionStartDate" required value={formData.sessionStartDate} onChange={handleChange}
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Location (Area/City) *</label>
            <input 
              type="text" name="location" required value={formData.location} onChange={handleChange}
              placeholder="e.g. Mirpur, Dhaka"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f]"
            />
          </div>

          {/* Institution & Experience */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1">Institution & Experience *</label>
            <textarea 
              name="institution" required rows="3" value={formData.institution} onChange={handleChange}
              placeholder="e.g. BSc in Physics from DU, 4 Years of teaching experience..."
              className="w-full bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c49f] resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button 
              type="submit" disabled={loading}
              className="w-full bg-[#00c49f] hover:bg-[#00b08f] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg transition disabled:bg-gray-700"
            >
              {loading ? "Publishing Session..." : "Submit & Save Tutor Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}