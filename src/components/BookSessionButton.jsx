"use client";

import { Button } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookSessionButton({ tutor }) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleBooking = async () => {
        // ১. ইউজার লগইন করা না থাকলে আটকে দেওয়া
        if (!session?.user) {
            toast.error("Please login first to book a session.");
            router.push("/login");
            return;
        }

        // ২. স্লট চেক করা (যদি ০ হয় তবে বুকিং করতে দেবে না)
        if (tutor?.totalSlot <= 0) {
            toast.error("Sorry, no available slots left for this tutor.");
            return;
        }

        // ৩. JWT টোকেন সংগ্রহ করা
        const { data: jwtData } = await authClient.token();
        const token = jwtData?.token;
        if (!token) {
            toast.error("Authentication failed. Please log in again.");
            return;
        }

        // 🎯 অ্যাসাইনমেন্ট রিকোয়ারমেন্ট অনুযায়ী বুকিং অবজেক্ট তৈরি
        const updatedBookingData = {
            userId: session?.user?.id,
            studentName: session?.user?.name,
            studentEmail: session?.user?.email,
            tutorId: tutor?._id,
            tutorName: tutor?.name,
            tutorPhoto: tutor?.photo,
            subject: tutor?.subject,
            hourlyFee: tutor?.hourlyFee
        };

        try {
            // ৪. এপিআই রাউট আপডেট (enrollments থেকে bookings-এ রূপান্তর)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${tutor?._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedBookingData)
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data?.message || "Booking failed. Please try again.");
                return;
            }

            toast.success(`Successfully booked a session with ${tutor?.name}!`);
            // সফল বুকিংয়ের পর সরাসরি ড্যাশবোর্ডে রিডাইরেক্ট
            router.push("/dashboard");
            router.refresh(); // ডাটা রিলোড করার জন্য

        } catch (err) {
            toast.error("Something went wrong with the booking request.");
            console.error(err);
        }
    };

    return (
        <Button
            color={tutor?.totalSlot <= 0 ? "default" : "primary"}
            size="lg"
            className="w-full font-bold shadow-lg mt-4 text-base"
            onPress={handleBooking}
            disabled={tutor?.totalSlot <= 0}
        >
            {tutor?.totalSlot <= 0 ? "Fully Booked" : "Book Session Now"}
        </Button>
    );
}