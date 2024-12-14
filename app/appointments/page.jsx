"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker"; // Updated DatePicker Component
import { auth, db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  age: z
    .string()
    .regex(/^\d+$/, "Age must be a number") // Store age as string to match Firestore schema
    .min(1, "Age must be at least 1"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  problem: z.string().min(10, "Problem description must be at least 10 characters long"),
  date: z.string().min(1, "Appointment date is required"), // ISO string from DatePicker
  time: z.string().min(1, "Appointment time is required"),
  prescriptionUrl: z.string().optional(), // Optional field for prescription file URL
});

// Convert 24-hour time to 12-hour format with AM/PM
const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Convert 0 (midnight) to 12
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
};


export default function Appointments() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user found.");
      }
  
      // Convert time to 12-hour format with AM/PM
      const formattedTime = convertTo12HourFormat(data.time);
  
      // Save appointment to Firestore
      await addDoc(collection(db, "appointments"), {
        ...data,
        time: formattedTime, // Save time with AM/PM notation
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });
  
      console.log("Appointment successfully booked!");
      router.push("/appointments/success"); // Redirect to success page
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  
  

  return (
    <div className="max-w-xl mx-auto mt-10 mb-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-600">Name</label>
          <Input type="text" {...register("name")} placeholder="Full Name" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Age</label>
          <Input type="number" {...register("age")} placeholder="Age" />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Phone Number</label>
          <Input type="text" {...register("phone")} placeholder="Phone Number" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Problem</label>
          <Textarea {...register("problem")} placeholder="Describe your issue" />
          {errors.problem && <p className="text-red-500 text-sm">{errors.problem.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Appointment Date</label>
          <DatePicker
            value={watch("date")}
            onChange={(date) => setValue("date", date)}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Appointment Time</label>
          <Input type="time" {...register("time")} />
          {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
        </div>
        <Button type="submit" className="w-full">
          Submit & Book Appointment
        </Button>
      </form>
    </div>
  );
}
