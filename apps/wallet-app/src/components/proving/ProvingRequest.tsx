"use client";

import React, { useState, Fragment } from "react";
import { Modal } from "../common/Modal";
import useResolveProofRequest from "@/hooks/useResolveProofRequest";
import { useModal } from "@/hooks/useModal";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";

export const Proving = () => {
  const [uri, setUri] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { isOpen, handleModal } = useModal();
  const { handleResolveProofRequest } = useResolveProofRequest();

  const handleResolvedProofRequest = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const result = await handleResolveProofRequest(uri);

      // ✅ Success condition
      if (result?.body === "") {
        setIsSuccessModalOpen(true);
      } else {
        // ❌ Error condition
        setIsErrorModalOpen(true);
      }

      setUri("");
      handleModal(); // close input modal
    } catch (error) {
      console.error("Error resolving proof request:", error);
      setIsErrorModalOpen(true);
      handleModal();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <h2 className="font-bold text-2xl font-sans">Proving</h2>

        <button
          onClick={handleModal}
          className="bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 rounded-md px-5 py-2.5"
        >
          Proving Request
        </button>

        {/* Main Modal for Proof Request */}
        <Modal
          isOpen={isOpen}
          headerText={"Proof Request"}
          bodyText={"Paste the proof request URI."}
          handleCloseModal={handleModal}
          handleSetUri={setUri}
          handleConfirmation={handleResolvedProofRequest}
          uri={uri}
        />
      </div>

      {/* ✅ Success Modal */}
      <Transition appear show={isSuccessModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsSuccessModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/25" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                ✅ Proof Request Resolved Successfully!
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-600">
                You have credentials that meet the requirements.
              </p>
              <button
                className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                onClick={() => setIsSuccessModalOpen(false)}
              >
                Close
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>

      {/* ❌ Error Modal */}
      <Transition appear show={isErrorModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsErrorModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/25" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
              <DialogTitle className="text-lg font-semibold text-red-600">
                ❌ Something Went Wrong
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-600">
                Unable to resolve the proof request. Please check the URI or try again.
              </p>
              <button
                className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={() => setIsErrorModalOpen(false)}
              >
                Close
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
