"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("user_id");
    location.reload();
  };

  const handleExamClick = () => {
    window.location.href = "/examregister";
  };

  return (
    <div className="bg-[#EBEBF0]">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        {/* Left: Logo + Exam Button */}
        <div className="flex items-center gap-6">
          <Link href={"/"}>
            <Image
              src="/asset/logo_text.png" // ✅ Ensure this path is correct
              alt="DOT Logo"
              width={180}
              height={60}
              className="h-auto w-auto"
              priority
            />
          </Link>

          <button
            onClick={handleExamClick}
            className="rounded-md bg-blue-900 px-5 py-2.5 text-sm font-medium active:bg-blue-950 text-white transition"
          >
            e-Exam Registration
          </button>
        </div>

        {/* Right: Logout (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleLogOut}
            className="rounded-md bg-gray-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden rounded p-2.5 bg-gray-800 text-white hover:opacity-75"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          {isMenuOpen ? (
            // Close Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Burger Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#EBEBF0] border-t border-gray-200 px-6 py-4">
          <ul className="space-y-4 text-sm font-medium text-gray-700">
            <li>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleExamClick();
                }}
                className="block w-full text-left rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 transition"
              >
                e-Exam Registration
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogOut();
                }}
                className="w-full text-left text-red-600 hover:opacity-75"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
