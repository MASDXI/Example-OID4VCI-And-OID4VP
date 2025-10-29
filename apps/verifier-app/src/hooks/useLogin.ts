import { useState } from "react";

const useLogin = () => {
  const [idCardNumber, setIdCardNumber] = useState<number>();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL!;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestData = {
      idCardNumber: idCardNumber,
      password: password,
    };

    try {
      const response = await fetch(`${VERIFIER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log({VERIFIER_URL});
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user_id", data.id);
        location.reload();
        console.log("Login successful:", data);
      } else {
        setError("Login failed: " + response.statusText);
      }
    } catch (error) {
      setError("Error during login: " + (error as Error).message);
    }
  };

  return {
    idCardNumber,
    setIdCardNumber,
    password,
    setPassword,
    handleLogin,
    error,
  };
};

export default useLogin;
