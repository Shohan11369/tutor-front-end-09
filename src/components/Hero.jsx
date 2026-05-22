"use client";
import { Button } from "@heroui/react";
import { ArrowRight, Star, Play, Calendar, ShieldCheck, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-50">
            <Swiper
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {/* ─── SLIDE 1: GENERAL HERO ─── */}
                <SwiperSlide>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-600/20 text-blue-600 font-bold text-sm">
                                    <Star className="w-4 h-4 fill-blue-600" />
                                    <span>Trusted by 10,000+ Medical Students</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                                    Find & Book{' '}
                                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">
                                        Expert Medical
                                    </span>{' '}
                                    Tutors
                                </h1>
                                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                                    Connect with certified doctors, senior medical students, and industry experts. Secure your learning slots today and boost your medical career.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <Link href="/tutor">
                                        <Button
                                            color="primary"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-blue-600/30 group w-full sm:w-auto"
                                        >
                                            Find Tutors <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="bordered"
                                        size="lg"
                                        className="h-14 px-8 text-lg font-bold rounded-full group w-full sm:w-auto"
                                    >
                                        <Play className="mr-2 fill-slate-900 group-hover:scale-110 transition-transform" /> Watch Demo
                                    </Button>
                                </div>
                            </div>

                            {/* Right Image Container */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                        alt="Medical Learning"
                                        fill
                                        className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="flex -space-x-3">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <Image
                                                        key={i}
                                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                                        width={40}
                                                        height={40}
                                                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                                        alt="student avatar"
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-sm">Join the Community</p>
                                                <p className="text-xs text-slate-500">500+ active bookings today</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* ─── SLIDE 2: TIME SLOTS & BOOKING FOCUS ─── */}
                <SwiperSlide>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 rounded-full border border-emerald-600/20 text-emerald-600 font-bold text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>Real-Time Slot Booking System</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                                    Never Miss a{' '}
                                    <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600">
                                        Live Mentorship
                                    </span>{' '}
                                    Session
                                </h1>
                                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                                    Our interactive platform allows you to check tutor availability instantly. Grab your preferred slot before it runs out!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <Link href="/tutor">
                                        <Button
                                            color="success"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold rounded-full text-white shadow-2xl shadow-emerald-600/30 group w-full sm:w-auto"
                                        >
                                            Book A Slot Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                                    <Image
                                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
                                        alt="Doctor Tutoring"
                                        fill
                                        className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* ─── SLIDE 3: QUALITY & CERTIFICATION FOCUS ─── */}
                <SwiperSlide>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 rounded-full border border-indigo-600/20 text-indigo-600 font-bold text-sm">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>100% Verified Instructors</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                                    Learn From{' '}
                                    <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
                                        Top-Ranked
                                    </span>{' '}
                                    Professionals
                                </h1>
                                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                                    Every tutor on MediQueue goes through a rigorous screening process. Learn premium medical concepts with complete trust.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <Link href="/tutor">
                                        <Button
                                            color="secondary"
                                            size="lg"
                                            className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-indigo-600/30 group w-full sm:w-auto"
                                        >
                                            Explore Instructors <Award className="ml-2 group-hover:scale-110 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                                    <Image
                                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
                                        alt="Verified Doctors"
                                        fill
                                        className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;