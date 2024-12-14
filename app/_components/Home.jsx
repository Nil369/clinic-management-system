"use client";

import { useTheme } from "next-themes";
import Logo from "./Logo";
import Image from "next/image";

export default function Home() {
  const { theme } = useTheme(); // Access the current theme

  return (
    <div>
      {/* Hero Section */}
      {/* <section
        className={`text-center py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Welcome to Our Amazing Service
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Providing top-notch services that exceed your expectations.
          </p>
          <button className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      </section> */}


       {/* Hero Section */}
       <section
        className={`flex flex-col lg:flex-row items-center justify-center py-20 px-10 sm:px-6 lg:px-10 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Left Side - Text Content */}
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Welcome to Our Specialized Care <br />
            <span className="text-blue-500">CMS</span> 
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Experience world-class medical services tailored to your needs, led by
            experts in the field.
          </p>
          <button className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>

        {/* Right Side - Hero Image */}
        <div className="flex-shrink-0 mt-10 lg:mt-0">
          <Image
            src="/images/doctor.webp" // Path to the doctor image (update as needed)
            alt="Hero Doctor"
            className="w-[450px] h-full max-w-md mx-auto lg:max-w-lg "
            width={800}
            height={900}
            priority={true}
          />
        </div>
      </section>

      {/* Featured Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Services</h2>

          {/* Featured Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Card 1 */}
            <div
              className={`shadow-md rounded-lg overflow-hidden hover:shadow-blue-200 transition ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <Image
                src="/images/service1.jpg"
                alt="Feature 2"
                className="w-full h-64 object-cover"
                width={300}
                height={400}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Service One</h3>
                <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  A brief description of Service One and what it offers.
                </p>
                <button className="text-blue-500 hover:text-blue-700">Learn More</button>
              </div>
            </div>

            {/* Featured Card 2 */}
            <div
              className={`shadow-md rounded-lg overflow-hidden hover:shadow-blue-200 transition ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <Image
                src="/images/service2.jpg"
                alt="Feature 2"
                className="w-full h-64 object-cover"
                width={300}
                height={400}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Service Two</h3>
                <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  A brief description of Service Two and what it offers.
                </p>
                <button className="text-blue-500 hover:text-blue-700">Learn More</button>
              </div>
            </div>

            {/* Featured Card 3 */}
            <div
              className={`shadow-md rounded-lg overflow-hidden hover:shadow-blue-200 transition ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <Image
                src="/images/service3.webp"
                alt="Feature 2"
                className="w-full h-64 object-cover"
                width={300}
                height={400}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Service Three</h3>
                <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  A brief description of Service Three and what it offers.
                </p>
                <button className="text-blue-500 hover:text-blue-700">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
