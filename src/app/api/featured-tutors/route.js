import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; 
import Tutor from '@/models/Tutor'; 

export async function GET() {
  try {
    await connectDB();
    
    // ১. ডাটাবেস থেকে টিউটর খুঁজুন
    const tutors = await Tutor.find({}); 
    
    // ২. কনসোল লগ করে দেখুন ডেটা কি দেখা যাচ্ছে?
    console.log("Database response:", tutors); 

    // ৩. শুধুমাত্র ডেটা রিটার্ন করুন
    return NextResponse.json(tutors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}