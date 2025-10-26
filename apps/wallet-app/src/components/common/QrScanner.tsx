import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

interface QRScannerProps {
  onScanResult?: (result: string) => void;
}

export const QRScanner = ({ onScanResult }: QRScannerProps) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: string | null) => {
    if (!result) return;

    // handel allow QR codes starting with "openid4" only
    if (result.startsWith("openid4")) {
      if (onScanResult) onScanResult(result);
      setIsCameraOpen(false); // auto-close camera if passed
      setError(null);
    } else {
      // show small message but keep camera open
      setError("Invalid QR code.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <button
        className="bg-gray-600 text-white text-sm font-medium hover:bg-gray-500 rounded-md px-5 py-2.5"
        onClick={() => {
          setIsCameraOpen(!isCameraOpen);
          setError(null);
        }}
      >
        {isCameraOpen ? "Close Camera" : "Scan QR Code"}
      </button>

      {isCameraOpen && (
        <>
          <Scanner
            onScan={(results) => {
              const value = results?.[0]?.rawValue || "";
              handleScan(value);
            }}
            components={{
              finder: true, // Show finder overlay
            }}
            styles={{
              container: {
                width: "220px", //
                height: "220px",
                borderRadius: "12px",
                overflow: "hidden",
              }
            }}
          />

          {error && (
            <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
          )}
        </>
      )}
    </div>
  );
};
