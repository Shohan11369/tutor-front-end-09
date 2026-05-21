"use client";
import { useContext } from "react";
import { Button, Chip } from "@heroui/react";
import { Calendar, DollarSign, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";

const TutorCard = ({ tutor }) => {
  const {
    _id,
    tutorName,
    image,
    subject,
    hourlyFee,
    availableDays,
    availableTimeSlot,
    totalSlot,
    institution,
  } = tutor;

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleBookSession = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required!",
        text: "Please log in to book a session.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }
    router.push(`/tutors/${_id}`);
  };

  return (
    <div className="group flex flex-col bg-white rounded-[2rem] border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-16/10 bg-slate-100">
        <Image
          alt={tutorName}
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          src={image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
          fill
        />
        <div className="absolute top-4 right-4">
          <Chip variant="solid" className="bg-white text-slate-800 font-bold shadow-lg shadow-blue-600/20 px-3 py-1 border border-slate-100">
            {subject || "General"}
          </Chip>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col grow space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold leading-tight line-clamp-1">{tutorName}</h3>
          <p className="text-sm text-slate-500 font-medium line-clamp-1">{institution || "Independent Tutor"}</p>
        </div>

        {/* Info Badges */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="line-clamp-1">
              {availableDays || "Flexible"} | {availableTimeSlot || "Anytime"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <Users className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Available Slots:{" "}
              <strong className={totalSlot === 0 ? "text-danger" : "text-slate-900"}>
                {totalSlot}
              </strong>
            </span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="pt-4 mt-auto border-t border-slate-100 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hourly Fee</span>
            <span className="text-2xl font-black text-blue-600 flex items-center">
              <DollarSign className="w-5 h-5 -mr-0.5" />
              {hourlyFee}
            </span>
          </div>

          <Button
            variant={totalSlot === 0 ? "flat" : "solid"}
            color={totalSlot === 0 ? "default" : "primary"}
            onClick={handleBookSession}
            className="font-bold rounded-xl px-5 h-11"
          >
            {totalSlot === 0 ? "Fully Booked" : "Book Session"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;