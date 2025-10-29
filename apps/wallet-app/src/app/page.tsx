import Image from "next/image";
import { MyAccount } from "@/components/profile/MyAccount";

const Home = async () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="w-full bg-gradient-to-tr from-blue-200 to-purple-200 rounded-2xl py-20">
        <div className="flex flex-col md:flex-row items-center px-20">
          <Image
            src={"/assets/mock-profile-pic.jpg"}
            alt="rogers"
            width={200}
            height={200}
            className="rounded-2xl"
          />
          <div className="flex flex-col items-center md:items-start gap-5 px-10 py-5 md:py-0 md:w-full">
            <p className="text-black font-bold text-xl font-sans">
              ID: 71a77c89-bc7e-4713-98de-3ae97b587456
            </p>
            <p className="text-black font-extralight text-xl font-sans">
              John Doe
            </p>
            <div className="bg-white py-3 px-2 rounded-xl md:w-96">
              <p>johndoe@holder.xyz</p>
            </div>
          </div>
        </div>
      </div>
      <MyAccount />
    </div>
  );
};

export default Home;
