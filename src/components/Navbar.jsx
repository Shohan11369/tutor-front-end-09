"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-slate-50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                MediQueue
              </span>
            </Link>
          </div>

    
          <div className="hidden md:flex gap-6 items-center">
            <Link
              href="/"
              className="font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/tutor"
              className="font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              Tutors
            </Link>

            
            {!isPending && session && (
              <>
                <Link
                  href="/add-tutor"
                  className="font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Add Tutor
                </Link>
                <Link
                  href="/my-tutors"
                  className="font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  My Tutors
                </Link>
                <Link
                  href="/booked-sessions"
                  className="font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  My Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* User Profile / Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-20 h-8 bg-slate-200 animate-pulse rounded-full" />
            ) : !session ? (
              <>
                <Link href="/login" className="btn">
                  Login
                </Link>
                <Link href="/register">
                  <Button color="primary">Register</Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                  <Image
                    width={40}
                    height={40}
                    src={session?.user?.image}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold truncate max-w-[100px]">
                      {session?.user?.name}
                    </p>
                    <p className="text-[10px] text-slate-500">Student</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl flex-col py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible flex transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-sm">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500">
                      {session?.user?.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors text-slate-700"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors text-slate-700"
                  >
                    <User className="w-4 h-4" /> Profile Settings
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left w-full border-t border-slate-100 mt-1 pt-2"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white border-b border-slate-200 transition-all">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
          >
            Home
          </Link>
          <Link
            href="/tutors"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
          >
            Tutors
          </Link>

          {!isPending && session && (
            <>
              <Link
                href="/add-tutor"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
              >
                Add Tutor
              </Link>
              <Link
                href="/my-tutors"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
              >
                My Tutors
              </Link>
              <Link
                href="/booked-sessions"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
              >
                My Booked Sessions
              </Link>
            </>
          )}

          <div className="pt-4 border-t border-slate-100 mt-4">
            {!session ? (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="bordered"
                    className="rounded-xl w-full font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    color="primary"
                    className="rounded-xl w-full font-bold"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Account
                </p>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
                >
                  Dashboard
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
