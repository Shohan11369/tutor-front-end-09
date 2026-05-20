"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";

import Swal from "sweetalert2";

import { authClient } from "@/lib/auth-client"; 

const LoginPage = () => {
  const router = useRouter();

  // email

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    const password = e.target.password.value;

    try {
      const { data, error } = await authClient.signIn.email({
        email,

        password,
      });

      if (error) {
        throw new Error(error.message || "Invalid Credentials");
      }

      Swal.fire({
        icon: "success",

        title: "Login Successful! 🚀",

        confirmButtonColor: "#0d9488",
      });

      router.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",

        title: "Login Failed",

        text: err.message,

        confirmButtonColor: "#ef4444",
      });
    }
  };

  // google

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",

        callbackURL: "/",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Google Login Failed",

        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 py-12 px-4 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 dark:text-white">
          Account Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-teal-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition"
          >
            Login
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2 dark:text-white"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-teal-600 font-bold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
