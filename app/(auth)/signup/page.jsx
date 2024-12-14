"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  age: z.string().min(1, "Age must be at least 1").max(120, "Invalid age"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        age: data.age,
        phone: data.phone,
        role: "patient",
        createdAt: new Date().toISOString(),
      });

      console.log("User added to Firestore and redirecting...");
      router.push("/appointments");
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="mb-44 py-16">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Name</label>
            <Input type="text" {...register("name")} placeholder="Full Name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
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
            <label className="block mb-1 text-gray-600">Age</label>
            <Input type="number" {...register("age")} placeholder="Age" />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Phone</label>
            <Input type="text" {...register("phone")} placeholder="Phone Number" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
