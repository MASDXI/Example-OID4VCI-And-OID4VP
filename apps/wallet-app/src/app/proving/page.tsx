import { Proving } from "@/components/proving/ProvingRequest";

export default async function CredentialPage() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col gap-5">
        {/* TODO QR scan and uri text paste */}
        <Proving></Proving>
      </div>
    </div>
  );
}
