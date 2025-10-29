"use client";

import { ProofPage } from "@/components/ProofPage";
import { Login } from "@/components/Login";
// import { ProfilePage } from "@/components/ProfilePage";
import useGetUser from "@/hooks/useGetUser";
import { Loading } from "@/components/Loading";

export default function Home() {
  // return <ProofPage></ProofPage>
  
  const { user, loading } = useGetUser();

  if (loading) return <Loading />;

  return <>{user ? <ProofPage /> : <Login />}</>;
}
