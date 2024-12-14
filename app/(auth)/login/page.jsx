"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/appointments"); // Redirect to appointments page for patients
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/appointments"); // Redirect to appointments page for patients
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 ">
        <div className="mb-48 py-10">

       
      <h1 className="text-2xl font-bold mb-6 text-center">Patient Login</h1>
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
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">or</p>
        <Button variant="outline" className="mt-3 w-full" onClick={handleGoogleLogin}>
        <Image src="/images/google.png" width={20} height={20} alt="Google"/>
          Log in with Google
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          <Link href="/admin/login" className="text-blue-500 hover:underline">
            Admin Login
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
