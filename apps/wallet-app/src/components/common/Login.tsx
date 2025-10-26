"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null); // clear previous errors

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left side / marketing */}
      <div className="hidden md:flex md:w-1/2 main-color justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">DOCS Wallet</h1>
          <p className="text-white mt-1">
            DOCS is a digital wallet for receiving and sharing credentials.
          </p>
        </div>
      </div>

      {/* Right side / login form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <div className="w-full max-w-md p-6">
          <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center md:text-left">
            Welcome Back!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7 text-center md:text-left">
            Login to DOCS Wallet.
          </p>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-2xl py-2 px-4 focus:outline-none focus:ring-2 focus:main-color"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded-2xl py-2 px-4 focus:outline-none focus:ring-2 focus:main-color"
            />

            <button
              type="submit"
              className="block w-full bg-gray-700 mt-2 py-2 px-5 rounded-2xl text-white font-semibold hover:bg-gray-600"
            >
              Sign-In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
