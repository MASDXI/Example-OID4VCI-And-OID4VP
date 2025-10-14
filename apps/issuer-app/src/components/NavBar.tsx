"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const handleLogOut = () => {
    localStorage.removeItem("user_id");
    location.reload();
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between gap-8 px-6">
        <Link className="block" href={"/"}>
          <p className="font-light text-xl text-gray-400">Document request system</p>
        </Link>
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-4">
            <button>
              <span className="font-light text-gray-400 px-4">Log out</span>
              <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500" onClick={handleLogOut} />
            </button>

            <button className="block rounded p-2.5 transition md:hidden bg-gray-800 text-white hover:text-white/75">
              <span className="sr-only">Toggle menu</span>
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
