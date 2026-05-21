import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; 
import Tutor from '@/models/Tutor'; 

export async function GET() {
  try {
    await connectDB();
    
    
    const tutors = await Tutor.find({}); 
   
    console.log("Database response:", tutors); 

    
    return NextResponse.json(tutors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}