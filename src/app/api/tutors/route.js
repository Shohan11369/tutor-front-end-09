import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Tutor from "@/models/Tutor";

export async function GET(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const filter = {};

    if (search) {
      filter.$or = [
        { tutorName: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const tutors = await Tutor.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(tutors);
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutors" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const tutor = await Tutor.create(body);
    return NextResponse.json(tutor, { status: 201 });
  } catch (error) {
    console.error("Error creating tutor:", error);
    return NextResponse.json(
      { error: "Failed to create tutor" },
      { status: 500 },
    );
  }
}
