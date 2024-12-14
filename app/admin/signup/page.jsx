"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { auth, db } from "../../lib/firebase"; // Ensure firebase is correctly initialized
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GoogleSignup() {
  const [role, setRole] = useState(""); // Store role selection
  const router = useRouter();

  // Google Sign-up function
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Ensure role is selected before proceeding
      if (!role) {
        alert("Please select a role.");
        return;
      }

      // Save the user's data along with the selected role in Firestore
      const userRef = doc(db, "staff", user.email); // Use email as document ID for uniqueness

      // Add user details to Firestore, including role and timestamp
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        role: role, // Role selected by user
        createdAt: new Date().toISOString(), // Store timestamp
      });

      console.log("User added to Firestore successfully!");

      // Redirect user based on their role (doctor or receptionist)
      if (role === "doctor") {
        router.push("/admin/dashboard"); // Redirect to doctor dashboard
      } else if (role === "receptionist") {
        router.push("/admin/dashboard"); // Redirect to receptionist dashboard
      }
    } catch (error) {
      console.error("Google Sign-up error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="mb-72 py-24">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up with Google</h1>

        {/* Role selection */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a Role</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </div>

        {/* Google Sign-up button */}
        <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
          <Image src="/images/google.png" width={20} height={20} alt="Google" />
          Sign Up with Google
        </Button>
      </div>
    </div>
  );
}
