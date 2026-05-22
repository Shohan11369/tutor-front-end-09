import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TutorCard from "./TutorCard"; 
import { fetchFeaturedTutors } from "@/lib/tutors/data"; 

// Next.js-এর জন্য ডাইনামিক রেন্ডারিং নিশ্চিত করা
export const dynamic = 'force-dynamic';

const FeaturedTutors = async () => {
    // ব্যাকএন্ড থেকে ডাটা ফেচ করা
    const tutors = await fetchFeaturedTutors();
    
    // শুধু সেই টিউটরদের দেখাচ্ছি যারা বুক করা হয়নি (Optional: চাইলে কন্ডিশন সরাতে পারেন)
    // const availableTutors = tutors.filter(tutor => !tutor.booked);

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                            Top Rated Experts
                        </h2>
                        <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            Available Tutors
                        </h3>
                        <p className="text-slate-500 max-w-xl font-medium">
                            Find and book top-tier premium tutors handpicked to guide your learning journey and solve your doubts instantly.
                        </p>
                    </div>
                    
                    <Link href="/tutor">
                        <Button
                            variant="flat"
                            color="primary"
                            className="rounded-full font-bold group px-6"
                        >
                            View All Tutors <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Tutors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                    {tutors && tutors.length > 0 ? (
                        tutors.slice(0, 4).map((tutor) => (
                            <TutorCard key={tutor._id} tutor={tutor} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
                            <p className="text-slate-400 font-medium">No available tutors found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTutors;