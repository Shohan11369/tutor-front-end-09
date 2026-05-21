"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Calendar, DollarSign, Users, MapPin, Award } from "lucide-react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // বুকিং হ্যান্ডলার
  const handleBookSession = async () => {
    try {
      const session = await authClient.getSession();
      // Better Auth-এর JWT প্লাগিনে সেশন সাধারণত session.data-তে থাকে
      const token = session?.data?.token || session?.token;
      const user = session?.data?.user || session?.user;

      if (!token || !user) {
        alert("বুকিং করার জন্য দয়া করে লগইন করুন।");
        return;
      }

      const bookingInfo = {
        tutorId: id,
        tutorName: tutor.tutorName,
        userEmail: user.email,
        userId: user.id,
      };

      await axios.patch(`http://localhost:8080/bookings/${id}`, bookingInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("সফলভাবে বুক করা হয়েছে!");
      window.location.reload();
    } catch (err) {
      console.error("Booking error:", err);
      alert("বুকিং করতে সমস্যা হয়েছে। সার্ভার চেক করুন।");
    }
  };

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        setLoading(true);
        const session = await authClient.getSession();
        
        // টোকেন স্ট্রাকচার চেক
        const token = session?.data?.token || session?.token;

        if (!token) {
          throw new Error("টোকেন পাওয়া যায়নি, দয়া করে লগইন করুন।");
        }

        const res = await axios.get(`http://localhost:8080/tutors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTutor(res.data);
      } catch (err) {
        console.error("Error fetching tutor:", err);
        setError("ডেটা লোড করতে সমস্যা হচ্ছে। নিশ্চিত করুন আপনি লগইন করেছেন।");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutor();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-blue-600 font-bold text-xl">Loading Tutor Details...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 font-bold">{error}</div>;
  if (!tutor) return <div className="text-center py-20 text-slate-500">Tutor not found!</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <img src={tutor.image || "/default-avatar.png"} alt={tutor.tutorName} className="w-40 h-40 rounded-[2rem] object-cover shadow-xl" />
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black text-slate-900">{tutor.tutorName}</h1>
            <p className="text-blue-600 font-bold text-lg">{tutor.subject}</p>
            <p className="text-slate-500 font-medium">{tutor.institution}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Award className="text-blue-600" /> <span className="font-bold">Experience: {tutor.experience}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <MapPin className="text-blue-600" /> <span className="font-bold">{tutor.location}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Calendar className="text-blue-600" /> <span className="font-bold">{tutor.availableDays}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Users className="text-blue-600" /> <span className="font-bold">Slots: {tutor.totalSlot}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-100">
          <div className="text-center">
            <p className="text-sm text-slate-400 font-bold uppercase">Hourly Fee</p>
            <p className="text-4xl font-black text-slate-900 flex items-center"><DollarSign className="w-8 h-8 text-blue-600" />{tutor.hourlyFee}</p>
          </div>
          <Button 
            onClick={handleBookSession}
            disabled={tutor.totalSlot <= 0}
            color="primary" 
            className="h-14 px-10 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20"
          >
            {tutor.totalSlot > 0 ? "Book Session Now" : "No Slots Available"}
          </Button>
        </div>
      </div>
    </div>
  );
}