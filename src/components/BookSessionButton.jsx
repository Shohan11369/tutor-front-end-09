import Image from "next/image";
import { Chip } from "@heroui/react";
import CancelBookingButton from "./CancelBookingButton";

const BookingCard = ({ booking }) => {
  // ড্যাশবোর্ড বা বুকিং লিস্ট থেকে ডাইনামিক ডাটা রিসিভ করা হচ্ছে
  const { _id, tutorName, tutorPhoto, subject, bookedAt, createdAt, status } = booking || {};

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm sm:items-center justify-between transition-all duration-300 hover:shadow-md">
      <div className="flex gap-4 items-center">
        {/* Tutor Profile Image */}
        <div className="relative w-16 h-16 bg-slate-100 rounded-full overflow-hidden shrink-0 border border-slate-100">
          <Image
            src={tutorPhoto || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150"}
            alt={tutorName || "Tutor"}
            fill
            className="object-cover"
          />
        </div>

        {/* Booking Details */}
        <div>
          <h3 className="font-bold text-lg text-slate-900">{tutorName || "Tutor Name"}</h3>
          <p className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
            {subject || "Subject"}
          </p>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Booked on: {bookedAt || createdAt ? new Date(bookedAt || createdAt).toDateString() : "Date N/A"}
          </p>
        </div>
      </div>

      {/* Status and Action Controls */}
      <div className="flex sm:flex-col justify-between sm:items-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <Chip 
          color={status === "cancelled" ? "danger" : "success"} 
          variant="flat" 
          size="sm"
          className="font-bold px-2"
        >
          {status || "Active"}
        </Chip>

        {/* সেশন ক্যানসেল করার বাটন (যদি অলরেডি ক্যানসেলড না হয়ে থাকে) */}
        {status !== "cancelled" && _id && (
          <CancelBookingButton bookingId={_id} />
        )}
      </div>
    </div>
  );
};

export default BookingCard;