"use client";
// Modal সম্পর্কিত সব কম্পোনেন্ট এখান থেকে ইম্পোর্ট করুন
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from "@heroui/modal";

// Button এবং অন্যান্য সাধারণ কম্পোনেন্ট @heroui/react থেকে
import { Button } from "@heroui/react";

// হুকটি আলাদাভাবে
import { useDisclosure } from "@heroui/use-disclosure";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AlertCircle } from "lucide-react";

export default function CancelBookingButton({ bookingId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCancelBooking = async (onClose) => {
    setLoading(true);
    try {
      // ১. JWT টোকেন সংগ্রহ করা
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;
      
      if (!token) {
        toast.error("Authentication expired. Please log in again.");
        return;
      }

      // ২. বুকিং ক্যানসেলের জন্য এপিআই রিকোয়েস্ট (ক্যানসেল বা ডিলিট এপিআই এন্ডপয়েন্ট)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`, {
        method: "DELETE", // আপনার ব্যাক-এন্ড যদি PATCH দিয়ে status: "cancelled" করে, তবে এখানে METHOD পরিবর্তন করে PATCH দিতে পারেন
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to cancel the booking.");
      }

      toast.success("Booking successfully cancelled.");
      onClose(); // মডালটি বন্ধ করার জন্য
      router.refresh(); // ড্যাশবোর্ডের ডাটা আপডেট করার জন্য

    } catch (error) {
      toast.error(error.message || "Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ট্রিপল ডট বা ড্যাশবোর্ডের ক্যানসেল বাটন */}
      <Button
        color="danger"
        variant="light"
        size="sm"
        className="font-bold rounded-xl"
        onPress={onOpen}
      >
        Cancel
      </Button>

      {/* HeroUI-র স্ট্যান্ডার্ড কনফার্মেশন মডাল */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        backdrop="blur"
        motionProps={{
          variants: {
            enter: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
            exit: { y: 20, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
          }
        }}
        className="max-w-md mx-4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-2 items-center text-danger">
                <AlertCircle className="w-5 h-5" />
                <span className="font-black text-xl tracking-tight">Confirm Cancellation</span>
              </ModalHeader>
              
              <ModalBody>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Are you sure you want to cancel this tutor booking? This action cannot be undone and your reserved slot will be released back to others.
                </p>
              </ModalBody>
              
              <ModalFooter>
                <Button
                  variant="flat"
                  color="default"
                  className="font-bold rounded-xl"
                  onPress={onClose}
                  disabled={loading}
                >
                  Keep Booking
                </Button>
                <Button
                  color="danger"
                  className="font-black rounded-xl shadow-lg shadow-danger/20"
                  isLoading={loading}
                  onPress={() => handleCancelBooking(onClose)}
                >
                  Yes, Cancel Session
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}