"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Calendar, DollarSign, Users, MapPin, Award } from "lucide-react";
import { Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const { data: session, isPending } = useSession();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState("");

  // ================= FETCH TUTOR =================
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      toast.error("Please login first");
      setLoading(false);
      return;
    }

    const fetchTutor = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor/${id}`
        );

        setTutor(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tutor");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutor();
  }, [id, session, isPending]);

  // ================= BOOK FUNCTION (FIXED) =================
  const handleBookSession = async () => {
    if (!session?.user) {
      toast.error("Please login to book a session.");
      return;
    }

    if (!confirmNumber) {
      toast.error("Enter confirmation number");
      return;
    }

    try {
      // 🔥 FIX: session token use (authClient.token() বাদ)
      const token = session?.token || session?.accessToken;

      if (!token) {
        toast.error("Session expired. Login again.");
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

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/${id}`,
        bookingInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booked successfully!");

      setShowModal(false);
      setConfirmNumber("");

      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Booking failed / No slot available");
    }
  };

  // ================= UI STATES =================
  if (isPending || loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );

  if (!tutor)
    return (
      <div className="text-center py-20 text-slate-500">Tutor not found!</div>
    );

  // ================= UI =================
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold">{tutor.tutorName}</h1>
        <p>{tutor.subject}</p>
        <p>Slots: {tutor.totalSlot}</p>

        <Button
          onClick={() => setShowModal(true)}
          disabled={tutor.totalSlot <= 0}
          className="mt-6"
        >
          Book Session
        </Button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px]">
            <h2 className="text-lg font-bold mb-4">Confirm Booking</h2>

            <input
              type="number"
              value={confirmNumber}
              onChange={(e) => setConfirmNumber(e.target.value)}
              className="w-full border p-2 mb-4"
              placeholder="Confirm number"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 bg-gray-300 p-2"
              >
                Cancel
              </button>

              <button
                onClick={handleBookSession}
                className="w-1/2 bg-blue-600 text-white p-2"
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