"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const handleLogOut = () => {
    localStorage.removeItem("user_id");
    location.reload();
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between gap-8 px-6">
        <Link className="block" href={"/"}>
          <p className="font-light text-xl text-gray-600">
            Document request system
          </p>
        </Link>
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-4">
            <button>
              <span className="font-light text-gray-400 px-4">Log out</span>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="text-red-500"
                onClick={handleLogOut}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
