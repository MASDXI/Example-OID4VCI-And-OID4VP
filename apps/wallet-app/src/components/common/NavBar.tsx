"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="main-color">
      <div className="container mx-auto flex h-16 items-center gap-8 px-6">
        {/* Logo */}
        <Link className="block text-white" href={"/"}>
          <span className="sr-only">Home</span>
          <p className="font-semibold text-xl">DOCS Wallet</p>
        </Link>

        {/* Desktop Nav */}
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="transition text-white hover:text-white/75"
                  href={"/credentials"}
                >
                  Credentials
                </Link>
              </li>

              <li>
                <Link
                  className="transition text-white hover:text-white/75"
                  href={"/proving"}
                >
                  Proving
                </Link>
              </li>
            </ul>
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <div className="sm:flex">
              <button
                className="block rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600"
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              >
                Logout
              </button>
            </div>

            {/* Burger Button */}
            <button
              className="block rounded p-2.5 transition md:hidden bg-gray-800 text-white hover:text-white/75"
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden main-color text-white px-6 py-4">
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                className="block transition hover:text-white/75"
                href={"/credentials"}
                onClick={() => setIsMenuOpen(false)}
              >
                Credentials
              </Link>
            </li>
            <li>
              <Link
                className="block transition hover:text-white/75"
                href={"/proving"}
                onClick={() => setIsMenuOpen(false)}
              >
                Proving
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
