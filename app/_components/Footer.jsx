"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Logo from "./Logo";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  const { theme } = useTheme(); // Access the current theme

  return (
    <footer
      className={`py-6 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Top Section: Logo and Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/" className="hover:text-blue-500 transition">
              <Logo/>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6">
            <Link
              href="/about"
              className={`hover:text-blue-500 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } transition`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`hover:text-blue-500 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } transition`}
            >
              Services
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`my-6 border-t ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          }`}
        ></div>

        {/* Bottom Section: Copyright */}
        <div className="text-center">
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            &copy; {year} | CMS | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
