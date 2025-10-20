import { useSession } from "next-auth/react";

const usePresentation = () => {
  const HOLDER_URL = process.env.NEXT_PUBLIC_HOLDER_URL!;
  const { data } = useSession();

  const handleAcceptPresentation= async (resolvedProofRequest: any) => {
    const response = await fetch(`${HOLDER_URL}/accept-presentation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resolvedPresentationRequest: resolvedProofRequest }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };

  return {
    handleAcceptPresentation,
  };
};

export default usePresentation;
