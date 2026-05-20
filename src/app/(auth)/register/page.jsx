"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client"; 

const RegisterPage = () => {
  const [passError, setPassError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    setPassError("");

    if (password.length < 6) {
      setPassError("Password must be at least 6 characters.");
      return;
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setPassError(
        "Must contain at least one uppercase and one lowercase letter.",
      );
      return;
    }

    try {
    
      await authClient.signUp.email({
        email,
        password,
        name,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully! 🎉",
        text: "Please log in now.",
        confirmButtonColor: "#0d9488",
      });

      router.push("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong.",
        confirmButtonColor: "#ef4444",
      });
    }
  };


  const handleGoogleRegister = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Could not register with Google.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-slate-800">
          Register Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500"
            required
          />
          <input
            type="url"
            name="photo"
            placeholder="Photo URL"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-teal-500"
            required
          />
          {passError && (
            <p className="text-red-500 text-xs font-semibold">{passError}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition"
          >
            Register
          </button>
        </form>

       
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleRegister}
          className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center justify-center gap-2"
        >
          Register with Google
        </button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-600 font-bold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
