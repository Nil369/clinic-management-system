"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"; // For theme management
import Link from "next/link";

export default function Services() {
  const { theme } = useTheme(); // Get the current theme (dark or light)

  return (
    <div className="max-w-screen-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <section className="text-center mb-16">
        <h1
          className={`text-4xl font-extrabold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Our Services
        </h1>
        <p
          className={`text-xl mb-10 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Discover the features and services that make our CMS platform the best
          choice for healthcare providers and patients.
        </p>
      </section>

      {/* Service Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
        {/* Service 1 */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          } shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50`}
        >
          <h3 className="text-xl font-semibold mb-4">Appointment Scheduling</h3>
          <p>
            Easily manage and schedule appointments for patients, reducing wait
            times and improving operational efficiency.
          </p>
        </div>

        {/* Service 2 */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          } shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50`}
        >
          <h3 className="text-xl font-semibold mb-4">
            Patient Data Management
          </h3>
          <p>
            Securely store and manage patient data, ensuring compliance with
            regulations while improving patient care.
          </p>
        </div>

        {/* Service 3 */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          } shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50`}
        >
          <h3 className="text-xl font-semibold mb-4">
            Real-Time Communication
          </h3>
          <p>
            Enable seamless communication between healthcare providers and
            patients with real-time chat and notifications.
          </p>
        </div>

        {/* Service 4 */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          } shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50`}
        >
          <h3 className="text-xl font-semibold mb-4">
            Prescription Management
          </h3>
          <p>
            Easily track and manage prescriptions for patients, reducing errors
            and ensuring proper medication management.
          </p>
        </div>

        {/* Service 5 */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          } shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50`}
        >
          <h3 className="text-xl font-semibold mb-4">
            Medical Billing & Invoicing
          </h3>
          <p>
            Streamline your billing process with automated invoicing and payment
            tracking to ensure timely payments.
          </p>
        </div>

        {/* Service 6 */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          } shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50`}
        >
          <h3 className="text-xl font-semibold mb-4">Analytics & Reporting</h3>
          <p>
            Gain insights into your practice’s performance with powerful
            analytics and detailed reports.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className={`${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        } py-12 rounded-lg shadow-md mb-16 text-center`}
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Join the many healthcare providers who are improving patient outcomes
          with our CMS platform. Get started today!
        </p>
        <Link href="/login">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-6 rounded-lg">
            Get Started
          </Button>
        </Link>
      </section>
    </div>
  );
}
