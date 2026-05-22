import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const id = params.id;
    const bookings = await Booking.find({
      $or: [{ studentId: id }, { studentEmail: id }],
    }).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings for id:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const deleted = await Booking.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 },
    );
  }
}
