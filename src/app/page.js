import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import TutorsSection from "@/components/TutorsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        
        <Hero />
         <TutorsSection/>
        <Features />
       
      </div>
      
    </main>
  );
}