"use client";

import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="bg-[#051A49]">
      <div className="container mx-auto flex flex-col justify-center h-20 px-6">
        <div className="flex flex-col items-start">
          <Link href={"/"}>
            <p className="font-semibold text-2xl text-white">jobsddee</p>
          </Link>
          <span className="text-xs text-gray-400 mt-0">
            by find
          </span>
        </div>
      </div>
    </div>
  );
};
