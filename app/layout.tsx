import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar"; // Links across to your root components folder
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreeKenya Signature Mirror Portal",
  description: "Secure Digital Endorsement System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}>
        {/* The Navbar stays fixed at the top globally */}
        <Navbar />
        
        {/* Your app/sign/page.tsx content injects directly here */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}