import { useSession } from "next-auth/react";

const useResolveProofRequest = () => {
  const HOLDER_URL = process.env.NEXT_PUBLIC_HOLDER_URL!;
  const { data } = useSession();

  const handleResolveProofRequest = async (uri: string) => {
    const response = await fetch(`${HOLDER_URL}/resolve-proof-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proofRequest: uri }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };

  return {
    handleResolveProofRequest,
  };
};

export default useResolveProofRequest;
