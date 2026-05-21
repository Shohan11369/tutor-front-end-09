"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================
  // FETCH TUTOR
  // =====================
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/tutors/${id}`
        );

        setTutor(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Tutor load failed");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutor();
  }, [id]);

  // =====================
  // BOOK SESSION
  // =====================
  const handleBookSession = async () => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    if (tutor?.totalSlot <= 0) {
      toast.error("No slots available");
      return;
    }

    try {
      // 🔥 SAFE TOKEN GET
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      if (!token) {
        toast.error("Login again (token missing)");
        return;
      }

      const bookingData = {
        studentName: session.user.name,
        studentEmail: session.user.email,

        tutorName: tutor.tutorName,
        tutorPhoto: tutor.image,
        subject: tutor.subject,
        hourlyFee: tutor.hourlyFee,

        confirmNumber: Math.floor(100000 + Math.random() * 900000),
      };

      const res = await axios.patch(
        `http://localhost:8080/tutors/${id}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Booking successful!");

      setTutor((prev) => ({
        ...prev,
        totalSlot: prev.totalSlot - 1,
      }));
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Booking failed"
      );
    }
  };

  // =====================
  // UI
  // =====================
  if (loading) return <p>Loading...</p>;
  if (!tutor) return <p>Tutor not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{tutor.tutorName}</h1>
      <p>{tutor.subject}</p>
      <p>Slots: {tutor.totalSlot}</p>

      <Button
        onPress={handleBookSession}
        disabled={tutor.totalSlot <= 0}
        color="primary"
      >
        {tutor.totalSlot <= 0
          ? "Fully Booked"
          : "Book Session Now"}
      </Button>
    </div>
  );
}