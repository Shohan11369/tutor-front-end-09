import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Tutor from "@/models/Tutor";
import Booking from "@/models/Booking";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const tutor = await Tutor.findById(params.id);
    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }
    return NextResponse.json(tutor);
  } catch (error) {
    console.error("Error fetching tutor:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutor" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    await connectDB();

    const tutor = await Tutor.findById(params.id);
    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

    if (tutor.totalSlot <= 0) {
      return NextResponse.json(
        { error: "No slots available" },
        { status: 400 },
      );
    }

    tutor.totalSlot = Math.max(tutor.totalSlot - 1, 0);
    await tutor.save();

    const bookingPayload = {
      studentId: body.studentId,
      studentName: body.studentName,
      studentEmail: body.studentEmail,
      tutorName: body.tutorName || tutor.tutorName,
      tutorPhoto: body.tutorPhoto || tutor.image,
      subject: body.subject || tutor.subject,
      hourlyFee: body.hourlyFee || tutor.hourlyFee,
      confirmNumber:
        body.confirmNumber ||
        String(Math.floor(100000 + Math.random() * 900000)),
      status: "active",
      bookedAt: new Date(),
    };

    if (bookingPayload.studentEmail) {
      await Booking.create(bookingPayload);
    }

    return NextResponse.json(tutor);
  } catch (error) {
    console.error("Error booking tutor:", error);
    return NextResponse.json(
      { error: "Failed to book tutor" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const tutor = await Tutor.findByIdAndDelete(params.id);
    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tutor:", error);
    return NextResponse.json(
      { error: "Failed to delete tutor" },
      { status: 500 },
    );
  }
}
