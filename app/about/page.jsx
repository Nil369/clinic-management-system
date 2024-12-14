"use client";

import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="max-w-screen-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-indigo-500 mb-6">About Us</h1>
        <p className="text-xl text-gray-600 mb-10">
          Learn more about our mission, vision, and what drives us to provide the best healthcare management system for you.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12 rounded-lg shadow-md mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-500 dark:text-green-300 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            At CMS, our mission is to provide a seamless and intuitive platform that empowers healthcare providers and patients alike.
            We aim to simplify appointment management, patient data tracking, and communication, all while ensuring the highest standards of security and privacy.
          </p>
          <Button className="bg-green-500 text-white hover:bg-green-600 py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 mb-16">
        <h2 className="text-3xl font-extrabold text-indigo-400 dark:text-indigo-300 text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white dark:bg-gray-700 shadow-lg p-6 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-500 dark:text-white mb-4">Easy Appointment Booking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Schedule appointments effortlessly with our intuitive booking system, available 24/7.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-lg p-6 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Real-Time Communication</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stay connected with healthcare professionals through real-time chat and notifications.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-lg p-6 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Secure Data Storage</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your data is safe with us. We ensure top-notch security to protect patient records and sensitive information.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12 rounded-lg mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-300 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            We envision a future where healthcare management is effortless, efficient, and accessible to everyone. Our goal is to improve patient outcomes and enhance the healthcare experience by bringing everything into one unified platform.
          </p>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
            Join Us
          </Button>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 mb-16">
        <h2 className="text-3xl font-extrabold text-indigo-400 dark:text-indigo-300 text-center mb-10">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="bg-white dark:bg-gray-700 shadow-lg p-6 rounded-lg w-64 text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
            <img
              src="/images/ceo.webp"
              alt="CEO"
              className="w-48 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-300">CEO & Founder</p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-lg p-6 rounded-lg w-64 text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
            <img
              src="/images/dev.jpg"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Akash Halder</h3>
            <p className="text-gray-600 dark:text-gray-300">Lead Developer</p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-lg p-6 rounded-lg w-64 text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
            <img
              src="/images/manager.webp"
              alt="Team Member"
              className="w-32 h-28 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Emily Clark</h3>
            <p className="text-gray-600 dark:text-gray-300">Product Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
}
