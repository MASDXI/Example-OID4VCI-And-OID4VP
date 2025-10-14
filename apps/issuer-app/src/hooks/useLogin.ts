import { useState } from "react";

const useLogin = () => {
  const [studentId, setStudentId] = useState<number>();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const ISSUER_URL = process.env.NEXT_PUBLIC_ISSUER_URL!;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestData = {
      studentId: studentId,
      password: password,
    };

    try {
      const response = await fetch(`${ISSUER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log({ISSUER_URL});
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
    studentId,
    setStudentId,
    password,
    setPassword,
    handleLogin,
    error,
  };
};

export default useLogin;
