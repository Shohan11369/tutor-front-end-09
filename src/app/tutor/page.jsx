"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; 

export default function TutorsPage() {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const fetchTutors = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
                params: { search, startDate, endDate }
            });
            setTutors(res.data);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch tutors", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchTutors, 500); 
        return () => clearTimeout(timer);
    }, [search, startDate, endDate]);

    const handleBookSession = (tutor) => {
        if (!user) {
            Swal.fire({
                title: "Not Logged In!",
                text: "Please login to book a session.",
                icon: "warning",
                confirmButtonText: "Go to Login"
            }).then((result) => {
                if (result.isConfirmed) router.push('/login');
            });
            return;
        }

      
        router.push(`/tutors/${tutor._id}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-slate-800">Available Tutors</h2>

            {/* Search & Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <input 
                    type="text" placeholder="Search tutor by name..." 
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <input type="date" className="p-3 border rounded-xl" onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" className="p-3 border rounded-xl" onChange={(e) => setEndDate(e.target.value)} />
                <button 
                    onClick={() => { setSearch(""); setStartDate(""); setEndDate(""); }} 
                    className="bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition"
                >
                    Reset Filters
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tutors.length > 0 ? (
                        tutors.map((tutor) => (
                            <div key={tutor._id} className="border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                                <img src={tutor.image} className="w-full h-56 object-cover mb-4 rounded-2xl" alt={tutor.tutorName} />
                                <h3 className="text-2xl font-bold text-slate-900">{tutor.tutorName}</h3>
                                <p className="text-slate-600 font-medium mb-1">Subject: {tutor.subject}</p>
                                <p className="text-slate-500 text-sm mb-4">Available: {tutor.availableDays}</p>
                                <p className="text-teal-600 font-bold text-lg">Fee: ৳{tutor.hourlyFee}/hr</p>
                                
                                <button 
                                    onClick={() => handleBookSession(tutor)} 
                                    className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition transform hover:scale-[1.02]"
                                >
                                    Book Session
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-3 text-lg text-slate-500">No tutors found matching your criteria.</p>
                    )}
                </div>
            )}
        </div>
    );
}