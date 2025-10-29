"use client";

import React from "react";
import Image from "next/image";
import useLogin from "../hooks/useLogin";

export const Login = () => {
  const {
    idCardNumber,
    setIdCardNumber,
    password,
    setPassword,
    handleLogin,
    error,
  } = useLogin();

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      {/* Background split horizontally (top blue, bottom white) */}
      <div className="absolute inset-0">
        <div className="relative h-1/2">
          <Image
            src="/asset/dot_bg.png" //
            alt="Background Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="h-1/2 bg-white" /> {/* Bottom white half */}
      </div>

      {/* Logo - top right */}
      <div className="absolute top-5 right-8 px-8 z-10">
        <Image
          src="/asset/logo_text.png"
          alt="DOT Logo"
          width={190}
          height={160}
          className="h-auto w-auto"
          priority
        />
      </div>

      {/* Centered login form */}
      <div className="relative flex max-w-lg justify-center items-center">
        <form className="w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg" onSubmit={handleLogin}>
          <h1 className="text-4xl">เข้าสู่ระบบ</h1>
          <p className="text-main-color text-[14px] mt-4 font-semibold">
            ระบบการทดสอบเพื่อเป็นมัคคุเทศก์ (e-Exam For Tourist Guide New Entry)
          </p>

          {/* ID Card Input */}
          <div className="mt-4 text-[14px]">เลขบัตรประจำตัวประชาชน</div>
          <div className="flex items-center mt-2 justify-center border py-2 px-3 rounded-lg shadow-sm mb-4 bg-gray-100">
            <input
              className="outline-none border-none text-[14px] w-full font-light placeholder-gray-400 bg-transparent"
              type="text"
              name="username"
              id="username"
              placeholder="ระบุเลขบัตรประจำตัวประชาชน"
              value={idCardNumber}
              onChange={(e) => setIdCardNumber(Number(e.target.value))}
              required
            />
          </div>

          {/* Password Input */}
          <div className="text-[14px]">รหัสผ่าน</div>
          <div className="flex items-center mt-2 justify-center border py-2 px-3 rounded-lg shadow-sm mb-4 bg-gray-100">
            <input
              className="outline-none border-none text-[14px] w-full font-light placeholder-gray-400 bg-transparent"
              type="password"
              name="password"
              id="password"
              placeholder="ระบุรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="block w-full main-color mt-4 py-2 px-3 text-[14px] rounded-lg text-white mb-2"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
};
