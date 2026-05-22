"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

export default function AddTutorPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    tutorName: "",
    image: "",
    subject: "",
    availableDays: "",
    availableTimeSlot: "",
    hourlyFee: "",
    totalSlot: "",
    sessionStartDate: "",
    institution: "",
    experience: "",
    location: "",
    teachingMode: "Online",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.post("http://localhost:8080/tutor", {
  //       ...form,
  //       hourlyFee: Number(form.hourlyFee),
  //       totalSlot: Number(form.totalSlot),
  //     });

  //     toast.success("Tutor added successfully!");

  //     setForm({
  //       tutorName: "",
  //       image: "",
  //       subject: "",
  //       availableDays: "",
  //       availableTimeSlot: "",
  //       hourlyFee: "",
  //       totalSlot: "",
  //       sessionStartDate: "",
  //       institution: "",
  //       experience: "",
  //       location: "",
  //       teachingMode: "Online",
  //     });

  //     setTimeout(() => {
  //       router.push("/tutors");
  //     }, 500);

  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Failed to add tutor");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // validation
  if (
    !form.tutorName ||
    !form.image ||
    !form.subject ||
    !form.availableDays ||
    !form.availableTimeSlot ||
    !form.hourlyFee ||
    !form.totalSlot ||
    !form.sessionStartDate ||
    !form.institution ||
    !form.experience ||
    !form.location
  ) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tutor`, {
      ...form,
      hourlyFee: Number(form.hourlyFee),
      totalSlot: Number(form.totalSlot),
    });

    toast.success("Tutor added successfully!");

    setForm({
      tutorName: "",
      image: "",
      subject: "",
      availableDays: "",
      availableTimeSlot: "",
      hourlyFee: "",
      totalSlot: "",
      sessionStartDate: "",
      institution: "",
      experience: "",
      location: "",
      teachingMode: "Online",
    });

    setTimeout(() => {
      router.push("/tutor");
    }, 500);

  } catch (err) {
    console.log(err);
    toast.error("Failed to add tutor");
  }
};

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Tutor</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="tutorName"
          onChange={handleChange}
          value={form.tutorName}
          placeholder="Tutor Name"
          className="border p-2 w-full"
        />

        <input
          name="image"
          onChange={handleChange}
          value={form.image}
          placeholder="Image URL"
          className="border p-2 w-full"
        />

        <input
          name="subject"
          onChange={handleChange}
          value={form.subject}
          placeholder="Subject"
          className="border p-2 w-full"
        />

        <input
          name="availableDays"
          onChange={handleChange}
          value={form.availableDays}
          placeholder="Available Days"
          className="border p-2 w-full"
        />

        <input
          name="availableTimeSlot"
          onChange={handleChange}
          value={form.availableTimeSlot}
          placeholder="Time Slot"
          className="border p-2 w-full"
        />

        <input
          name="hourlyFee"
          type="number"
          onChange={handleChange}
          value={form.hourlyFee}
          placeholder="Fee"
          className="border p-2 w-full"
        />

        <input
          name="totalSlot"
          type="number"
          onChange={handleChange}
          value={form.totalSlot}
          placeholder="Total Slot"
          className="border p-2 w-full"
        />

        <input
          name="sessionStartDate"
          type="date"
          onChange={handleChange}
          value={form.sessionStartDate}
          className="border p-2 w-full"
        />

        <input
          name="institution"
          onChange={handleChange}
          value={form.institution}
          placeholder="Institution"
          className="border p-2 w-full"
        />

        <input
          name="experience"
          onChange={handleChange}
          value={form.experience}
          placeholder="Experience"
          className="border p-2 w-full"
        />

        <input
          name="location"
          onChange={handleChange}
          value={form.location}
          placeholder="Location"
          className="border p-2 w-full"
        />

        <select
          name="teachingMode"
          onChange={handleChange}
          value={form.teachingMode}
          className="border p-2 w-full"
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Both">Both</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Tutor
        </button>

      </form>
    </div>
  );
}