"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";  // Custom sidebar for admin dashboard
import { auth } from "../../lib/firebase"; // Ensure Firebase is initialized
import { LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }) {
  const [role, setRole] = useState(""); // Store the role of the user
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle for mobile view
  const router = useRouter();

  // Set user role on initial render
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setRole(currentUser?.role); // Assuming role is stored in the user's authentication data
    }
  }, []);

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Admin Sidebar (Only for Admin Layout) */}
      <div
        className={`lg:w-64 w-full transition-all duration-300 ease-in-out bg-gray-800 text-white p-4 ${
          isSidebarOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <Sidebar role={role} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Mobile Sidebar Button */}
        <button
          className="lg:hidden absolute top-3 right-5 z-50 bg-blue-700 text-white p-3 rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <LayoutDashboard />
        </button>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
