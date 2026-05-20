'use client';

import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client'; // 🎯 Google অথেন্টিকেশনের জন্য ইমপোর্ট

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const registerData = Object.fromEntries(formData.entries());
        const password = registerData.password;

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUpperCase) {
            toast.error("Password must contain at least one uppercase letter.");
            setIsLoading(false);
            return;
        }
        if (!hasLowerCase) {
            toast.error("Password must contain at least one lowercase letter.");
            setIsLoading(false);
            return;
        }
        if (!isLongEnough) {
            toast.error("Password must be at least 6 characters long.");
            setIsLoading(false);
            return;
        }

        toast.success("Registration successful! Welcome to MediQueue.");
        router.push("/");
    };

    // 🎯 গুগল লগইন ফাংশন
    const handleGoogleAuth = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
            <div className="grow flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
                        
                        {/* Decorative element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                        <div className="text-center space-y-2 relative">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Join <span className="text-blue-600">MediQueue</span>
                            </h2>
                            <p className="text-slate-500 font-medium">Create your account to start booking tutors</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleRegister}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <Input id="name" required placeholder="Enter your name" name="name" disabled={isLoading} startContent={<User className="w-5 h-5 text-slate-400" />} className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <Input id="email" required placeholder="Enter your email" type="email" name="email" disabled={isLoading} startContent={<Mail className="w-5 h-5 text-slate-400" />} className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="image" className="text-sm font-bold text-slate-700 ml-1">Profile Image URL</label>
                                <Input id="image" required placeholder="https://images.unsplash.com/..." type="url" name="image" disabled={isLoading} startContent={<ImageIcon className="w-5 h-5 text-slate-400" />} className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-bold text-slate-700 ml-1">Password</label>
                                <Input id="password" required placeholder="••••••••" type="password" name="password" disabled={isLoading} startContent={<Lock className="w-5 h-5 text-slate-400" />} className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl" />
                            </div>

                            <Button color="primary" type="submit" disabled={isLoading} className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group">
                                {isLoading ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Moving to Home...</span> : <span className="flex items-center justify-center w-full">Register <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></span>}
                            </Button>
                        </form>

                        {/* 🎯 Google বাটন: আগের ডিজাইনের সাথে মানানসই */}
                        <Button 
                            variant="flat" 
                            className="w-full h-14 text-lg font-bold rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all"
                            onClick={handleGoogleAuth}
                        >
                            Continue with Google
                        </Button>

                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500 font-medium">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-600 font-black hover:underline underline-offset-4 transition-all">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}