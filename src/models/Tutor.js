// src/models/Tutor.js
import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  tutorName: String,
  image: String,
  subject: String,
  hourlyFee: Number,
  totalSlot: Number,
  institution: String,
  experience: String,
  location: String,
  teachingMode: String,
  // আপনার ডাটাবেসে থাকা অন্যান্য ফিল্ডগুলো এখানে যোগ করুন
});

const Tutor = mongoose.models.Tutor || mongoose.model("Tutor", tutorSchema);
export default Tutor;