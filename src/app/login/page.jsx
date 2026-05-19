'use client';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axios from 'axios';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await axios.post('http://localhost:8080/auth/login', { email, password });
            if (response.data.token) {
      
                login(response.data.user, response.data.token);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful! 🚀',
                    text: 'Welcome back to MediQueue!',
                    confirmButtonColor: '#0d9488'
                });
                router.push('/');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: error.response?.data?.message || 'Invalid Credentials',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-slate-800">Account Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" name="email" placeholder="Email Address" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500" required />
                    <input type="password" name="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500" required />
                    <button type="submit" className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition">Login</button>
                </form>
                <p className="text-center text-sm text-slate-600">Don't have an account? <Link href="/register" className="text-teal-600 font-bold underline">Register</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;