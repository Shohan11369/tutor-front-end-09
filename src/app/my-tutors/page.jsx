"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext"; // আপনার কনটেক্সট পাথ অনুযায়ী ঠিক করবেন
import Swal from "sweetalert2";

const MyTutorsPage = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: tutors = [], refetch } = useQuery({
        queryKey: ['myTutors', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutors?email=${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "এই টিউটরটি ডিলিট করতে চান?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'হ্যাঁ, ডিলিট করুন!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/tutors/${id}`);
                refetch();
                Swal.fire('ডিলিট হয়েছে!', 'টিউটরটি রিমুভ করা হয়েছে।', 'success');
            }
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">My Tutors</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Fee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors.map((tutor, index) => (
                            <tr key={tutor._id}>
                                <td>{index + 1}</td>
                                <td>{tutor.name}</td>
                                <td>{tutor.subject}</td>
                                <td>{tutor.fee}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning mr-2">Edit</button>
                                    <button onClick={() => handleDelete(tutor._id)} className="btn btn-sm btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTutorsPage;