"use client";
import { useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";
import { decodeOpenIDUrl } from "@/app/lib/decodeOpenIDUrl";
import { NavBar } from "./NavBar";
import useGetProof from "../hooks/useGetProof";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export const ProofPage: React.FC = () => {
  const { proof, handleRequestProof } = useGetProof();
  const { Canvas } = useQRCode();
  const [copied, setCopied] = useState(false);

  const companyName = "XYZ Corporation";

  // Auto-call on page refresh / mount
  useEffect(() => {
    handleRequestProof();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    if (proof) {
      navigator.clipboard.writeText(decodeOpenIDUrl(proof));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br p-4">
        <div className="w-full max-w-md border bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          
          {/* Company request text */}
          <p className="text-center text-gray-700 text-sm mb-6">
            You have a VC presentation request from{" "}
            <span className="font-semibold">{companyName}</span> requiring
            proof of your graduation degree.
          </p>

          {/* QR Code */}
          {proof ? (
            <div className="flex flex-col items-center gap-5 w-full">
              <Canvas
                text={proof}
                options={{
                  errorCorrectionLevel: "Q",
                  margin: 3,
                  scale: 4,
                  width: 180,
                }}
              />

              {/* Copyable decoded proof */}
              <div
                className="w-full relative border rounded-lg px-4 py-2 text-center break-words cursor-pointer hover:bg-gray-100 transition flex items-center justify-center gap-2"
                onClick={handleCopy}
              >
                <p className="text-black text-xs font-light truncate">
                  {decodeOpenIDUrl(proof)}
                </p>
                <FontAwesomeIcon
                  icon={faCopy}
                  className="text-gray-400 text-sm"
                />
                {copied && (
                  <span className="absolute top-1 right-2 text-green-500 text-xs">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-4">Generating proof request...</p>
          )}
        </div>
      </div>
    </div>
  );
};
