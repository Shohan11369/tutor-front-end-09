"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));

      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.log(error);
       toast.error("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-blue-600 font-bold">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Booking Sessions</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-4 border rounded-xl shadow-sm bg-white"
            >
              <h2 className="text-xl font-bold">{b.tutorName}</h2>
              <p className="text-gray-600">{b.subject}</p>

              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">
                  Confirm: {b.confirmNumber}
                </p>

                <p className="text-sm text-blue-600">
                  {new Date(b.bookedAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => handleCancel(b._id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;