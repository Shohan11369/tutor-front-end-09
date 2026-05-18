"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

   
  // const user = { email: 'student@medschool.edu', name: 'Dr. Rahul' };

  const user = null;

  const handleLogout = () => {
    router.refresh();
  };

  return (
    <div className=" p-5 navbar bg-white shadow-md px-6 sticky top-0 z-50">
    
      <div className="flex w-full items-center">
       
        <div className="flex-1 justify-start">
          <Link
            href="/"
            className="text-2xl font-black text-blue-600 tracking-tight"
          >
            Medi<span className="text-teal-500">Queue</span>
          </Link>
        </div>

      
        <div className="flex-none justify-center">
          <ul className="flex justify-between menu menu-horizontal px-1 font-medium text-slate-600 gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/tutors">Find Tutors</Link>
            </li>

            {user && (
              <>
                <li>
                  <Link href="/add-tutor">Add Tutor</Link>
                </li>
                <li>
                  <Link href="/my-tutorials">My Tutorials</Link>
                </li>
                <li>
                  <Link href="/my-bookings">My Bookings</Link>
                </li>
              </>
            )}
          </ul>
        </div>

       
        <div className="flex-1 flex justify-end items-center">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100">
                  <img
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80"
                    alt="Profile"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="px-4 py-2 font-bold text-slate-700">
                  {user.name}
                </li>
                <li className="text-xs px-4 pb-2 text-slate-400">
                  {user.email}
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href="/login"
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-6"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
