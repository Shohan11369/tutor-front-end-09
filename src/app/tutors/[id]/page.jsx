"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Calendar, DollarSign, Users, MapPin, Award } from "lucide-react";
import { Button } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const { data: session, isPending } = useSession();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      toast.error("Failed to load data. Please make sure you are logged in.");
      setLoading(false);
      return;
    }

    const fetchTutor = async () => {
      try {
        setLoading(true);

        const token = session?.token;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setTutor(res.data);
      } catch (err) {
        console.error("Error fetching tutor:", err);
        toast.error("Failed to fetch tutor data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutor();
  }, [id, session, isPending]);

  //FIXED BOOK FUNCTION

  const handleBookSession = async () => {
    if (!session?.user) {
      toast.error("Please login to book a session.");
      return;
    }

    if (!confirmNumber) {
      toast.error("Please enter confirmation number.");
      return;
    }

    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      console.log("Token being sent to backend:", token);

      if (!token) {
        toast.error("Session expired. Please login again.");
        return;
      }

      const bookingInfo = {
        studentName: session.user.name,
        studentEmail: session.user.email,

        tutorName: tutor.tutorName,
        tutorPhoto: tutor.image,
        subject: tutor.subject,
        hourlyFee: tutor.hourlyFee,

        confirmNumber: confirmNumber,
      };

      //FIXED ROUTE (NO /bookings)
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/${id}`,
        bookingInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Session booked successfully!");
      setTutor((prev) => ({
        ...prev,
        totalSlot: prev.totalSlot - 1,
      }));

      window.location.reload();
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("No slot available");
    }
  };

  //   const handleBookSession = async () => {
  //   if (!session?.user) {
  //     toast.error("Please login to book a session.");
  //     return false;
  //   }

  //   if (!confirmNumber) {
  //     toast.error("Please enter confirmation number.");
  //     return false;
  //   }

  //   try {
  //     const tokenRes = await authClient.token();
  //     const token = tokenRes?.data?.token;

  //     if (!token) {
  //       toast.error("Session expired. Please login again.");
  //       return false;
  //     }

  //     const bookingInfo = {
  //       studentName: session.user.name,
  //       studentEmail: session.user.email,
  //       tutorName: tutor.tutorName,
  //       tutorPhoto: tutor.image,
  //       subject: tutor.subject,
  //       hourlyFee: tutor.hourlyFee,
  //       confirmNumber: confirmNumber,
  //     };

  //     await axios.patch(`http://localhost:8080/tutors/${id}`, bookingInfo, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     toast.success("Session booked successfully!");

  //     setTutor((prev) => ({
  //       ...prev,
  //       totalSlot: prev.totalSlot - 1,
  //     }));

  //     return true; // 🔥 MUST
  //   } catch (err) {
  //     console.error("Booking error:", err);
  //     toast.error("No slot available");
  //     return false;
  //   }
  // };

  if (isPending || loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 font-bold text-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-bold">
        {error}
      </div>
    );

  if (!tutor)
    return (
      <div className="text-center py-20 text-slate-500">Tutor not found!</div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <img
            src={tutor.image || "/default-avatar.png"}
            alt={tutor.tutorName}
            className="w-40 h-40 rounded-[2rem] object-cover shadow-xl"
          />
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black text-slate-900">
              {tutor.tutorName}
            </h1>
            <p className="text-blue-600 font-bold text-lg">{tutor.subject}</p>
            <p className="text-slate-500 font-medium">{tutor.institution}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Award className="text-blue-600" />
            <span className="font-bold">Experience: {tutor.experience}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <MapPin className="text-blue-600" />
            <span className="font-bold">{tutor.location}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Calendar className="text-blue-600" />
            <span className="font-bold">{tutor.availableDays}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Users className="text-blue-600" />
            <span className="font-bold">Slots: {tutor.totalSlot}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-100">
          <div className="text-center">
            <p className="text-sm text-slate-400 font-bold uppercase">
              Hourly Fee
            </p>
            <p className="text-4xl font-black text-slate-900 flex items-center">
              <DollarSign className="w-8 h-8 text-blue-600" />
              {tutor.hourlyFee}
            </p>
          </div>

          <Button
            onClick={() => setShowModal(true)}
            disabled={tutor.totalSlot <= 0}
            color="primary"
            className="h-14 px-10 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20"
          >
            {tutor.totalSlot > 0 ? "Book Session Now" : "No Slots Available"}
          </Button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[400px]">
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

            <input
              type="number"
              value={confirmNumber}
              onChange={(e) => setConfirmNumber(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter confirmation number"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleBookSession();
                  setShowModal(false);
                  setConfirmNumber("");
                  router.push("/tutor");
                }}
                className="w-1/2 bg-blue-600 text-white p-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
