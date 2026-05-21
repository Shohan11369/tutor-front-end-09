"use client";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useSession } from "@/lib/auth-client"; // Better Auth ব্যবহার করছি
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddTutorPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { data: session, isPending } = useSession();
    const router = useRouter();

    // নিরাপত্তা চেক: যদি ইউজার টিউটর না হয়, তবে তাকে সরিয়ে দাও
    useEffect(() => {
        if (!isPending && (!session || session.user.role !== 'tutor')) {
            toast.error("You are not authorized to access this page!");
            router.push("/");
        }
    }, [session, isPending, router]);

    const onSubmit = async (data) => {
        const tutorData = {
            ...data,
            email: session?.user?.email, // সেশন থেকে ইমেইল
            fee: parseFloat(data.fee),
            totalSlot: parseInt(data.totalSlot)
        };

        try {
            const res = await axiosSecure.post('/tutors', tutorData);
            if (res.data.insertedId) {
                toast.success("Tutor profile created successfully!");
                reset();
            }
        } catch (error) {
            toast.error("Failed to add tutor profile. Please try again.");
        }
    };

    if (isPending) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-[2rem] border border-slate-100 mt-10">
            <h2 className="text-3xl font-black mb-6 text-center text-slate-900">Add Your Tutor Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...register("name")} placeholder="Tutor Name" className="input input-bordered w-full rounded-xl" required />
                <input {...register("photo")} placeholder="Photo URL" className="input input-bordered w-full rounded-xl" required />
                
                <select {...register("subject")} className="select select-bordered w-full rounded-xl">
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                </select>

                <input {...register("time")} placeholder="Available Time (e.g. 5pm-8pm)" className="input input-bordered w-full rounded-xl" />
                <input {...register("fee")} type="number" placeholder="Hourly Fee" className="input input-bordered w-full rounded-xl" />
                <input {...register("totalSlot")} type="number" placeholder="Total Slot" className="input input-bordered w-full rounded-xl" />
                <input {...register("date")} type="date" className="input input-bordered w-full rounded-xl" />
                <input {...register("location")} placeholder="Location" className="input input-bordered w-full rounded-xl" />
                
                <button type="submit" className="btn btn-primary md:col-span-2 rounded-xl text-white font-bold h-12 shadow-lg">
                    Submit Profile
                </button>
            </form>
        </div>
    );
};

export default AddTutorPage;