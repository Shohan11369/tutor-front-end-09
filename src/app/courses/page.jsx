import TutorCard from "@/components/TutorCard";
import TutorsHeader from "@/components/TutorsHeader";
import { fetchTutors } from "@/lib/tutors/data";
import { Button } from "@heroui/react";
import { GraduationCap, Filter } from "lucide-react";

const TutorsPage = async ({ searchParams }) => {
    const sParams = await searchParams;

    // সার্চ টার্ম ও ফিল্টার প্যারামিটার ডেটা ফেচিং ফাংশনে পাঠানো হচ্ছে
    const tutors = await fetchTutors(sParams?.searchTerm || "");

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <TutorsHeader />

            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        Find All Tutors
                    </h2>
                    <Button
                        variant="flat"
                        startContent={<Filter className="w-4 h-4" />}
                        className="rounded-full font-bold"
                    >
                        Filters
                    </Button>
                </div>

                {/* রিকোয়ারমেন্ট অনুযায়ী ৩-কলাম গ্রিড লেআউট */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutors && tutors.length > 0 ? (
                        tutors.map((tutor) => (
                            <TutorCard key={tutor._id} tutor={tutor} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-slate-500 font-medium">No tutors found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TutorsPage;