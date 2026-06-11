import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar"; // We'll create this next

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BridgeSync Pro | eTIMS Compliance",
  description: "The official Excel-to-KRA bridge for Kenyan SMEs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <div className="flex h-screen overflow-hidden">
          {/* Milestone 1: The Sidebar Navigation */}
          <Sidebar />
          
          <main className="flex-1 overflow-y-auto p-8 pt-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}