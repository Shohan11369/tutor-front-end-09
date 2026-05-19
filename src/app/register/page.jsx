'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axios from 'axios';

const RegisterPage = () => {
    const [passError, setPassError] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        setPassError('');
       
        if (password.length < 6) {
            setPassError('Password must be at least 6 characters.');
            return;
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            setPassError('Must contain at least one uppercase and one lowercase letter.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/register', { name, email, photo, password });
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Account Created Successfully! 🎉',
                    text: 'Please log in now.',
                    confirmButtonColor: '#0d9488'
                });
                router.push('/login');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message || 'Something went wrong.',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-slate-800">Register Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500" required />
                    <input type="email" name="email" placeholder="Email Address" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500" required />
                    <input type="url" name="photo" placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500" required />
                    <input type="password" name="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500" required />
                    {passError && <p className="text-red-500 text-xs font-semibold">{passError}</p>}
                    <button type="submit" className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition">Register</button>
                </form>
                <p className="text-center text-sm text-slate-600">Already have an account? <Link href="/login" className="text-teal-600 font-bold underline">Login</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;