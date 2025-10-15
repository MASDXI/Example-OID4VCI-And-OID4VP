"use client";
import { useState } from "react";
import { useQRCode } from "next-qrcode";
import {
  faAddressCard,
  faFileCode,
  faFileSignature,
  faHistory,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../hooks/useGetUser";
import useGetVC from "../hooks/useGetVC";
import { decodeOpenIDUrl } from "@/app/lib/decodeOpenIDUrl";
import { NavBar } from "./NavBar";
import { CardButton } from "./CardButton";

export const Profile: React.FC<User> = (props: User) => {
  const { username, name, faculty, major } = props;
  const { vc, handleRequestVc } = useGetVC();
  const { Canvas } = useQRCode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = async () => {
    await handleRequestVc(); // fetch VC
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <NavBar />
      {/* Header */}
      <div className="flex flex-col items-start justify-start px-4 py-[15px] pl-16 bg-blue-400">
        <div className="mb-2 text-xld text-white">{username}</div>
        <div className="mb-2 text-xl text-white">{name}</div>
        <div className="mb-2 font-light text-white">{faculty}</div>
        <div className="mb-2 -mt-1 font-light text-white">{major}</div>
      </div>

      <h1 className="text-xl text-black text-center mt-6">
        Online Request Form
      </h1>

      {/* Card buttons */}
      <div className="flex items-center justify-center">
        <div className="flex flex-wrap justify-center items-stretch gap-6 mt-6">
          <CardButton
            iconColor="text-orange-500"
            icon={faHistory}
            label="History"
          />
          <CardButton
            iconColor="text-red-500"
            icon={faAddressCard}
            label="Degree Certificate"
          />
          <CardButton
            iconColor="text-green-500"
            icon={faFileSignature}
            label="Transcript"
          />
          <CardButton
            iconColor="text-blue-500"
            icon={faFileCode}
            label="Digital Degree Certificate PDF"
          />
          <CardButton
            iconColor="text-red-500"
            icon={faAddressCard}
            label="Digital Degree Certificate VC"
            onClick={handleOpenModal} // open modal
          />
          <CardButton
            iconColor="text-purple-500"
            icon={faFileSignature}
            label="Digital Transcript PDF"
          />
          <CardButton
            iconColor="text-blue-500"
            icon={faUserGraduate}
            label="Expected Graduation Request"
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">
              Digital Degree VC
            </h2>
            {vc ? (
              <>
                <div className="flex justify-center mb-4">
                  <Canvas
                    text={vc}
                    options={{
                      errorCorrectionLevel: "Q",
                      margin: 3,
                      scale: 4,
                      width: 200,
                    }}
                  />
                </div>
                <div className="border rounded-lg px-4 py-2 text-center break-words">
                  <p className="text-sm text-black">{decodeOpenIDUrl(vc)}</p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center">Generating VC...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
