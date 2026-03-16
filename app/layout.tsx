import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import { AuthProvider } from '../context/AuthContext';
import AnalyticsTracker from "@/components/AnalyticsTracker"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexTrade | Marketplace",
  description: "Modern E-ticaret Deneyimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-950 text-white`}
      >
        <AuthProvider>
          <AnalyticsTracker /> 
          <Navbar />
          <main className="flex flex-grow">
            {children}
          </main>
          <ScrollTopButton />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}