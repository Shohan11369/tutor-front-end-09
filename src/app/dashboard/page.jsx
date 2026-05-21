import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CancelBookingButton from "@/components/CancelBookingButton";

export default async function DashboardPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || !token) {
    redirect("/login");
  }


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings/${session?.user?.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const bookings = (await res.json()) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* User Profile Card */}
        <div className="w-full md:w-1/4">
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
            <div className="text-center md:text-left">
              <Image
                src={session?.user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"}
                alt="User Profile"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto md:mx-0 object-cover border-2 border-blue-600/20"
              />
              <h2 className="text-xl font-black mt-4 text-slate-900">{session?.user?.name}</h2>
              <p className="text-sm text-slate-500 font-medium break-all">{session?.user?.email}</p>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>Total Bookings:</span>
                <span className="text-blue-600">{bookings?.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content - Booked Sessions */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Dashboard</h1>
          </div>
          
          <h2 className="text-xl font-bold text-slate-800 mb-4">My Booked Sessions</h2>

          {bookings?.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl shadow-sm">
              <p className="mb-4 text-slate-500 font-medium">You haven't booked any tutor sessions yet.</p>
              <Link href="/tutors">
                <Button color="primary" className="font-bold rounded-xl px-6">
                  Find a Tutor
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings?.map((booking) => (
                <div
                  key={booking?._id}
                  className="flex flex-col sm:flex-row gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-slate-100 rounded-full overflow-hidden shrink-0 border border-slate-100">
                      <Image
                        src={booking?.tutorPhoto || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150"}
                        alt="Tutor"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{booking?.tutorName}</h3>
                      <p className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        {booking?.subject}
                      </p>
                      <p className="text-xs text-slate-400 font-medium mt-1">
                        Booked on: {new Date(booking?.bookedAt || booking?.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-between sm:items-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <Chip 
                      color={booking?.status === "cancelled" ? "danger" : "success"} 
                      variant="flat" 
                      size="sm"
                      className="font-bold px-2"
                    >
                      {booking?.status || "Active"}
                    </Chip>

                    {booking?.status !== "cancelled" && (
                      <CancelBookingButton bookingId={booking?._id} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}