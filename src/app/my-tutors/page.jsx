"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";

const MyTutorsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

 
  // SAME FETCH 

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

  // DELETE SAME LOGIC
 
  const handleDelete = async (id) => {
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));

      Swal.fire("Deleted!", "Booking removed.", "success");
    } catch (error) {
      Swal.fire("Error!", "Delete failed", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-blue-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-black mb-6">
          My Tutors (Same Bookings Data)
        </h2>

        {/* TABLE UI ONLY (NEW DESIGN) */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border">
          <table className="w-full">

            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Tutor Name</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Fee</th>
                <th className="p-4">Confirm</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id} className="border-t hover:bg-slate-50">

                  <td className="p-4">{i + 1}</td>

                  <td className="p-4 font-bold">
                    {b.tutorName}
                  </td>

                  <td className="p-4">
                    {b.subject}
                  </td>

                  <td className="p-4 text-blue-600 font-semibold">
                    ${b.hourlyFee}
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {b.confirmNumber}
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {b.bookedAt
                      ? new Date(b.bookedAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default MyTutorsPage;