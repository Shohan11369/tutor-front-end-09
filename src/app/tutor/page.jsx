"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function TutorsPage() {
    const [tutors, setTutors] = useState([]);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { user } = useContext(AuthContext);
    const router = useRouter();

   
    const fetchTutors = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/tutors`, {
                params: { search, startDate, endDate }
            });
            setTutors(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchTutors(); }, [search, startDate, endDate]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">All Tutors</h2>

            {/*search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-slate-100 p-6 rounded-lg">
                <input type="text" placeholder="Search tutor by name..." className="p-2 border rounded" onChange={(e) => setSearch(e.target.value)} />
                <input type="date" className="p-2 border rounded" onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" className="p-2 border rounded" onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={() => { setSearch(""); setStartDate(""); setEndDate(""); }} className="bg-red-500 text-white rounded">Reset Filters</button>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tutors.map((tutor) => (
                    <div key={tutor._id} className="border p-5 rounded-lg shadow-lg">
                        <img src={tutor.image} className="w-full h-48 object-cover mb-4 rounded" alt={tutor.tutorName} />
                        <h3 className="text-xl font-bold">{tutor.tutorName}</h3>
                        <p>Subject: {tutor.subject}</p>
                        <p>Fee: ৳{tutor.hourlyFee}/hr</p>
                        <button onClick={() => !user ? router.push('/login') : console.log("Booking logic")} className="w-full mt-4 bg-teal-600 text-white py-2 rounded">Book Session</button>
                    </div>
                ))}
            </div>
        </div>
    );
}