"use client";

import React from "react";
import Image from "next/image";
import useLogin from "../hooks/useLogin";

export const Login = () => {
  const { studentId, setStudentId, password, setPassword, handleLogin, error } =
    useLogin();

  return (
    <div className="bgonlinenewrequest h-screen flex">
      <div className="flex w-full md:w-1/1 justify-center items-center bgonlinenewrequest">
        <form className="bg-none" onSubmit={handleLogin}>
          <Image
            src="/UTCC_BG_S_W.png" // adjust path to your image
            alt="UTCC Logo"
            width={170}  // adjust size
            height={240}
            className="mx-auto mb-4"
          />
          <h1 className="text-white mt-2 text-2xl text-center md:text-center">
            Document request system
          </h1>
          <div className="flex items-center mt-6 justify-center border py-2 px-3 rounded-3xl mb-4 bg-white">
            <input
              className="text-center outline-none border-none text-base w-full font-light placeholder-gray-500"
              type="text"
              name="username"
              id="username"
              placeholder="Student ID. Number"
              value={studentId}
              onChange={(e) => setStudentId(Number(e.target.value))}
              required
            />
          </div>
          <div className="flex items-center justify-center border py-2 px-3 rounded-3xl mb-4 bg-white">
            <input
              className="text-center outline-none border-none text-base w-full font-light placeholder-gray-500"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="block w-full bg-orange-400 mt-4 py-2 px-3 rounded-3xl text-white mb-2"
          >
            Submit
          </button>
          <p className="mt-4 text-white text-xs">
            ****Student is password is the same as for Registrar system****
          </p>
        </form>
      </div>
    </div>
  );
};
