"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; // Import getDocs
import { db } from "../../../lib/firebase"; // Firebase configuration
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema for form validation
const formSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  patientAge: z.string().min(1, "Age is required"),
  phone: z.string().min(10, "Phone number is required"),
  problem: z.string().min(1, "Problem description is required"),
  doctorAssigned: z.string().min(1, "Doctor is required"), // Ensure doctor is selected
});

export default function AppointmentsForm() {
  const [token, setToken] = useState(""); // Store generated token
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Fetch doctors from Firestore for assignment
  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsRef = collection(db, "staff");
      const doctorSnap = await getDocs(doctorsRef);
      const availableDoctors = doctorSnap.docs
        .filter(doc => doc.data().role === "doctor")
        .map(doc => ({ id: doc.id, name: doc.data().name }));
      setDoctors(availableDoctors);
    };
    fetchDoctors();
  }, []);

  // Generate a random token for the patient
  const generateToken = () => {
    const tokenNumber = Math.floor(Math.random() * 10000);
    setToken(tokenNumber);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const { patientName, patientAge, phone, problem, doctorAssigned } = data;

      const appointmentData = {
        patientName,
        patientAge,
        phone,
        problem,
        doctorAssigned,
        token,
        createdAt: new Date().toISOString(),
      };

      // Save appointment in Firestore
      await setDoc(doc(db, "appointments", token.toString()), appointmentData);
      console.log("Appointment added successfully!");
      router.push("/appointments/success"); // Redirect to appointments page after 3 seconds for admin

      // Redirect based on role after a successful appointment creation
      setTimeout(() => {
        router.push("/admin/appointments/add");
      }, 3000); // Redirect after 3 seconds
      
    } catch (error) {
      console.error("Error creating appointment:", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 mb-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Appointment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-600">Patient Name</label>
          <Input
            type="text"
            {...register("patientName")}
            placeholder="Patient's Full Name"
          />
          {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Age</label>
          <Input
            type="number"
            {...register("patientAge")}
            placeholder="Age"
          />
          {errors.patientAge && <p className="text-red-500 text-sm">{errors.patientAge.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Phone Number</label>
          <Input
            type="text"
            {...register("phone")}
            placeholder="Phone Number"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Problem</label>
          <Textarea
            {...register("problem")}
            placeholder="Describe the problem"
          />
          {errors.problem && <p className="text-red-500 text-sm">{errors.problem.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Assign Doctor</label>
          <Select
            {...register("doctorAssigned")}
            onValueChange={value => setValue("doctorAssigned", value)} // Update value on selection
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.name}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.doctorAssigned && <p className="text-red-500 text-sm">{errors.doctorAssigned.message}</p>}
        </div>

        <div>
          <Button type="button" onClick={generateToken} className="w-full">
            Generate Token
          </Button>
          {token && <p className="text-center mt-2 text-gray-500">Generated Token: {token}</p>}
        </div>

        <Button type="submit" className="w-full bg-blue-500 text-white">
          Submit Appointment
        </Button>
      </form>
    </div>
  );
}
