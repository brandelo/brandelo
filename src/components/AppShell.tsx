"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ContactFooterWDB from "@/components/Footer";
import SplashCursor from "@/components/SplashCursor";
import SplashScreen from "@/components/SplashScreen";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
          <SplashScreen />
        </div>
      )}

      <div
        className={
          showSplash
            ? "opacity-0 pointer-events-none select-none"
            : "opacity-100 transition-opacity duration-700"
        }
      >
        <Navbar />
        {/* <SplashCursor /> */}
        {children}
        <ContactFooterWDB />
      </div>
    </>
  );
}
