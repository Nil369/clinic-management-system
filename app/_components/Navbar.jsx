"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import ModeToggle from "@/components/ThemeBtn";
import { Menu } from "lucide-react";
import { auth,db } from "../lib/firebase"; // Firebase auth import
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // Fetch the user's role from Firestore (assuming role is stored in Firestore)
        const userRef = doc(db, "staff", user.email); // Firestore document reference
        const userDoc = await getDoc(userRef); // Fetch user document from Firestore

        if (userDoc.exists()) {
          const role = userDoc.data().role; // Extract role from Firestore document
          setUserRole(role); // Set user role in state
        } else {
          console.log("No user document found in Firestore.");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      setUser(null); // Reset user state
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  return (
    <nav
      className={`p-4 shadow-lg ${
        theme === "dark" ? "bg-zinc-950" : "bg-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo (leftmost side) */}
        <div className={theme === "dark" ? "text-white" : "text-gray-800"}>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Navigation Links for Desktop based on condition */}
        {!user ? (
          <div className="lg:flex space-x-6 hidden">
            <Link
              href="/"
              className={`${
                theme === "dark"
                  ? "text-white font-bold hover:text-blue-400 hover:font-bold"
                  : "text-gray-800 font-bold hover:text-blue-600 hover:font-bold"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${
                theme === "dark"
                  ? "text-white font-bold hover:text-blue-400 hover:font-bold"
                  : "text-gray-800 font-bold hover:text-blue-600 hover:font-bold"
              }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`${
                theme === "dark"
                  ? "text-white font-bold hover:text-blue-400 hover:font-bold"
                  : "text-gray-800 font-bold hover:text-blue-600 hover:font-bold"
              }`}
            >
              Services
            </Link>
          </div>
        ) : (
          <></>
        )}

        {/* Conditional Render based on Authentication */}
         {/* Conditional Render based on Authentication */}
         <div className="hidden lg:flex items-center space-x-4">
          {!user ? (
            <>
              <Link href="/login">
                <Button variant="primary" className="text-white">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="text-gray-500">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex justify-center items-center">
                    {user.displayName ? user.displayName[0] : "U"}
                  </div>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <span className={theme === "dark" ? "text-white" : "text-gray-800"}>
                        {user.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {/* Show Appointments for Patient */}
                    <DropdownMenuItem onClick={() => router.push("/appointments")}>
                      Appointments
                    </DropdownMenuItem>

                    {/* Show Admin Dashboard for Doctor/Receptionist */}
                    {userRole == "doctor" || userRole == "receptionist" ? (
                      <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
                        Admin Dashboard
                      </DropdownMenuItem>
                    ) : null}

                    {/* Sign Out */}
                    <DropdownMenuItem onClick={handleSignOut} className="bg-red-500 text-white">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 w-2/3 h-full transition-transform ${
            isSidebarOpen
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          } lg:hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white text-black"
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <Logo />
            <Button
              onClick={toggleSidebar}
              className="text-red-500 font-bold bg-red-100"
            >
              X
            </Button>
          </div>
          <div className="space-y-6 p-4">
            <Link
              href="/"
              className="block text-gray-400 font-bold hover:text-gray-600"
              onClick={toggleSidebar}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-400 font-bold hover:text-gray-600"
              onClick={toggleSidebar}
            >
              About
            </Link>
            <Link
              href="/services"
              className="block text-gray-400 font-bold hover:text-gray-600"
              onClick={toggleSidebar}
            >
              Services
            </Link>
            {!user ? (
              <>
                <Link href="/login">
                  <Button
                    variant="primary"
                    className="text-white font-bold mb-4 mt-5 mr-3 hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="outline"
                    className="text-black hover:text-gray-700"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/appointments" className="ml-3">
                <div className="flex flex-col items-start space-x-3 ">
                  {/* Display user email and photo */}
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 mr-10 rounded-full bg-gray-300 text-white flex justify-center items-center">
                      {user.displayName ? user.displayName[0] : "U"}
                    </div>
                  )}
                  <span
                    className={
                      theme === "dark"
                        ? "text-white hover:text-gray-200"
                        : "text-gray-800 hover:text-gray-900"
                    }
                  >
                    {user.email}
                  </span>
                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    className="text-white hover:bg-red-500 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mode Toggle and Hamburger Icon */}
        <div className="flex items-center space-x-2">
          <ModeToggle /> {/* Mode Toggle Icon */}
          <div className="block lg:hidden">
            <Button
              variant="outline"
              onClick={toggleSidebar}
              className={
                theme === "dark"
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }
            >
              <span className="material-icons">
                <Menu />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
