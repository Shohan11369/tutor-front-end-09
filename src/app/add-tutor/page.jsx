"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTutorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tutorName: "",
    tutorImage: "",
    subject: "",
    hourlyFee: "",
    totalSlot: "",
    sessionStartDate: "",
    description: "",
    createdBy: "raju@gmail.com" // আপাতত ডামি ইমেইল (অথ পরে অ্যাড হবে)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Tutor Session Added Successfully! 🎉");
        router.push("/"); // সাকসেস হলে হোমপেজে রিডাইরেক্ট করবে
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding tutor:", error);
      alert("Something went wrong! Connection refused.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Add New Tutor Session</h2>
          <p className="text-sm text-gray-500 mt-1">Fill up the form to publish a tuition or study session.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Name and Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Tutor Name</label>
              <input 
                type="text" 
                name="tutorName"
                value={formData.tutorName}
                onChange={handleChange}
                placeholder="MD Raju Molla" 
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Tutor Image URL</label>
              <input 
                type="url" 
                name="tutorImage"
                value={formData.tutorImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..." 
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition"
              />
            </div>
          </div>

          {/* Row 2: Subject and Hourly Fee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Subject / Skill</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Web Development / Physics" 
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Hourly Fee ($)</label>
              <input 
                type="number" 
                name="hourlyFee"
                value={formData.hourlyFee}
                onChange={handleChange}
                placeholder="45" 
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition"
                required 
              />
            </div>
          </div>

          {/* Row 3: Slots and Start Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Total Available Slots</label>
              <input 
                type="number" 
                name="totalSlot"
                value={formData.totalSlot}
                onChange={handleChange}
                placeholder="5" 
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Session Start Date</label>
              <input 
                type="date" 
                name="sessionStartDate"
                value={formData.sessionStartDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition"
                required 
              />
            </div>
          </div>

          {/* Row 4: Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Session Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write clear details about what you will teach in this session..." 
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-teal-500 transition resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-neutral-900 hover:bg-black text-white py-3 rounded-xl text-sm font-bold tracking-wide transition disabled:bg-gray-400"
            >
              {loading ? "Publishing Session..." : "Publish Tutor Session"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}