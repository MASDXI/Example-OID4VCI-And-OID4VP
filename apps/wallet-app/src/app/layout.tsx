import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import LayoutWrapper from "@/components/LayoutWrapper";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DOCS Wallet",
  description: "Demonstrate Digital Wallet for holder to receive and resolve proof request of verifiable credential",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionWrapper>
          <ReactQueryProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ReactQueryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
