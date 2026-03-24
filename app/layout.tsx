"use client";
import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import { AuthProvider } from '../context/AuthContext';
import AnalyticsTracker from "@/components/AnalyticsTracker"; 
import { db, auth } from "@/lib/firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import MaintenancePage from "@/components/MaintenancePage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubSettings: () => void;

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        
        if (userData?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      unsubSettings = onSnapshot(doc(db, "system", "settings"), (snapshot) => {
        if (snapshot.exists()) {
          setIsMaintenance(snapshot.data().maintenanceMode);
        }
        setLoading(false);
      });
    });

    return () => {
      unsubAuth();
      if (unsubSettings) unsubSettings();
    };
  }, []);

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('nex-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme !== 'light') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-brand-bg text-brand-text transition-colors duration-300`}
      >
        <AuthProvider>
          {loading ? (
            <div className="min-h-screen bg-brand-bg" />
          ) : isMaintenance && !isAdmin ? (
            <MaintenancePage />
          ) : (
            <>
              <AnalyticsTracker /> 
              <Navbar />
              <main className="flex flex-grow">
                {children}
              </main>
              <ScrollTopButton />
              <Footer />
            </>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}