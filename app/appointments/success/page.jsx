"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Success() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger animation on page load
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 text-center py-36 mb-32">
      <div
        className={`${
          animate ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } transition-all duration-700 ease-in-out mb-6`}
      >
        <Image
        src="/images/success.png"
        alt="Success icon"
        width={120}
        height={120}
        className="md:max-md ml-36"
        />
      </div>
      <h1 className="text-2xl text-green-500 font-extrabold mb-6">
        Appointment Booked Successfully!
      </h1>
      <p className="text-gray-600">
        Thank you for booking your appointment. We will contact you shortly.
      </p>
    </div>
  );
}
