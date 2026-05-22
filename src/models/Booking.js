import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tutorId: String,
  studentName: String,
  studentEmail: String,
  tutorName: String,
  tutorPhoto: String,
  subject: String,
  hourlyFee: Number,
  confirmNumber: String,
  bookedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;