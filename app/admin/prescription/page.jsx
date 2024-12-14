"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "../../lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Zod validation schema for prescription form
const prescriptionSchema = z.object({
  name: z.string().min(1, "Patient name is required"),
  age: z.string().min(1, "Age is required"),
  advice: z.string().min(1, "Advice is required"),
  medicines: z.string().min(1, "Medicines are required"),
  reVisit: z.string().optional(),
});

export default function PrescriptionForm({ patientName }) {
  // Form fields state
  const [name, setName] = useState(patientName || ""); // Default to patientName if passed
  const [age, setAge] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState("");
  const [reVisit, setReVisit] = useState("");
  const [dateIssued] = useState(new Date().toISOString());
  const [issuedBy, setIssuedBy] = useState(""); // This will be the doctor's name
  const [error, setError] = useState("");
  const router = useRouter(); // Router to navigate after submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data using Zod
    const validation = prescriptionSchema.safeParse({ name, age, advice, medicines, reVisit });

    if (!validation.success) {
      setError(validation.error.errors[0].message); // Show the first error
      return;
    }

    try {
      // Prescription data based on the schema
      const prescriptionData = {
        name,
        age,
        advice,
        medicines,
        reVisit,
        issuedBy,  // Using the doctor's name as issuedBy
        dateIssued,
      };

      // Save the prescription in Firestore without using appointmentId
      const prescriptionRef = doc(collection(db, "prescriptions"));
      await setDoc(prescriptionRef, prescriptionData);
      console.log("Prescription added successfully!");
      router.push("/admin/appointments/");
    } catch (error) {
      console.error("Error creating prescription:", error.message);
    }
  };

  return (
    <div className="p-32">
      <h2 className="text-xl font-semibold mb-4">Enter Prescription Details for {patientName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-600">Patient Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Patient's Full Name"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Age</label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Patient's Age"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Advice</label>
          <Textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Advice for the patient"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Medicines</label>
          <Textarea
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            placeholder="Prescribed medicines"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Revisit (if required)</label>
          <Input
            type="text"
            value={reVisit}
            onChange={(e) => setReVisit(e.target.value)}
            placeholder="When to revisit"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Doctor's Name</label>
          <Input
            type="text"
            value={issuedBy}
            onChange={(e) => setIssuedBy(e.target.value)}
            placeholder="Doctor's Name"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="w-full text-white" variant="primary">
          Submit Prescription
        </Button>
      </form>
    </div>
  );
}
