'use client';

import { useState } from 'react';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Image as ImageIcon, Loader2, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client'; 

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const image = formData.get("image");
        const password = formData.get("password");
        const role = formData.get("role"); 

       
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            toast.error("Password must be at least 6 characters, with uppercase and lowercase letters.");
            setIsLoading(false);
            return;
        }

        try {
            await authClient.signUp.email({
                email,
                password,
                name,
                image,
                role, 
                callbackURL: "/",
            });

            toast.success("Registration successful! Welcome to MediQueue.");
            router.push("/");
        } catch (err) {
            toast.error(err?.message || "Registration failed. Email might already be in use.");
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google authentication failed.");
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
            <div className="grow flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                        <div className="text-center space-y-2 relative">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Join <span className="text-blue-600">MediQueue</span>
                            </h2>
                            <p className="text-slate-500 font-medium">Create your account to start your journey</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleRegister}>
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <Input name="name" required placeholder="Enter your name" disabled={isLoading} startContent={<User className="w-5 h-5 text-slate-400" />} className="h-14" />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <Input name="email" type="email" required placeholder="Enter your email" disabled={isLoading} startContent={<Mail className="w-5 h-5 text-slate-400" />} className="h-14" />
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Account Type</label>
                                <select 
                                    name="role" 
                                    required 
                                    className="w-full h-14 rounded-2xl border-2 border-slate-200 px-4 bg-white text-slate-700 font-medium hover:border-blue-600 transition-all"
                                >
                                    <option value="student">Student</option>
                                    <option value="tutor">Tutor</option>
                                </select>
                            </div>

                            {/* Image URL Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Profile Image URL</label>
                                <Input name="image" type="url" required placeholder="https://images.unsplash.com/..." disabled={isLoading} startContent={<ImageIcon className="w-5 h-5 text-slate-400" />} className="h-14" />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                                <Input name="password" type="password" required placeholder="••••••••" disabled={isLoading} startContent={<Lock className="w-5 h-5 text-slate-400" />} className="h-14" />
                            </div>

                            {/* Submit Button */}
                            <Button color="primary" type="submit" disabled={isLoading} className="w-full h-14 text-lg font-black rounded-2xl">
                                {isLoading ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Please wait...</span> : <span className="flex items-center">Register <ArrowRight className="ml-2" /></span>}
                            </Button>
                        </form>

                        {/* Google Social Auth */}
                        <Button variant="flat" className="w-full h-14 text-lg font-bold rounded-2xl" onClick={handleGoogleAuth}>
                            Continue with Google
                        </Button>

                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500 font-medium">
                                Already have an account? <Link href="/login" className="text-blue-600 font-black hover:underline">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}