// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import Features from "@/components/Features";
// import Footer from "@/components/Footer";
// import TutorsSection from "@/components/TutorsSection";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
//       <div>

//         <Hero />
//          <TutorsSection/>
//         <Features />

//       </div>

//     </main>
//   );
// }

import FeaturedTutors from "@/components/FeaturedTutors";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* ১. হিরো সেকশন বা ব্যানার */}
      <Hero />
      
      {/* ২. রিকোয়ারমেন্ট অনুযায়ী হোম পেজের অ্যাভেইলেবল টিউটর সেকশন */}
      <FeaturedTutors />

      {/* ৩. প্রজেক্টের কোর ফিচার বা সুযোগ-সুবিধা সমূহ */}
      <Features />
    </div>
  );
}
