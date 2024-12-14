"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "../../lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["doctor", "receptionist"], "Role is required"), // Dropdown role selection
});

export default function Login() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null); // For storing the role from Firestore or dropdown
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      // Sign in with email/password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in Firestore to get the role
      const userDocRef = doc(db, "staff", email);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        setUserRole(role); // Set user role from Firestore
        if (role === "doctor" || role === "receptionist") {
          router.push("/admin/dashboard"); // Redirect based on role
        }
      } else {
        console.error("User not found in Firestore");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore to get the role
      const userDocRef = doc(db, "staff", user.email);
      const userDoc = await getDoc(userDocRef);
      router.push("/admin/dashboard"); // Redirect based on role
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        setUserRole(role); // Set user role from Firestore
        // router.push("/admin/dashboard"); 
        // if (role === "doctor" || role === "receptionist") {
        //   router.push("/admin/dashboard"); // Redirect based on role
        // }
      } else {
        console.error("User not found in Firestore");
      }
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="mb-52 py-12">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <Input type="email" {...register("email")} placeholder="Email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <Input type="password" {...register("password")} placeholder="Password" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Role</label>
            <select {...register("role")} className="w-full">
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
          
        <div className="mt-6 text-center">
          <p className="text-gray-600">or</p>
          <Button variant="outline" className="mt-3 mb-4 w-full" onClick={handleGoogleLogin}>
            <Image src="/images/google.png" width={20} height={20} alt="Google" />
            Log in with Google
          </Button>
          <Link href="/admin/signup" className="text-center text-blue-500 hover:underline">
            Admin Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
