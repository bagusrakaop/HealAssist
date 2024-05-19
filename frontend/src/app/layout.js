"use client";
import { Nunito } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { useState } from "react";

import { ModalProvider, useModal } from "@/contexts/modalContext";

const nunito = Nunito({
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const { openSignInModal } = useModal();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
    <div className="w-full h-16 fixed top-0 flex items-center bg-neutral justify-between py-4 shadow-md z-50">
      <button onClick={() => handleButtonClick("logo")}>
        <Image className="pl-10" src="/navbar-logo.svg" alt="HealAssist Navbar Logo" width={180} height={37} priority />
      </button>
      <div className="flex w-1/3 items-center text-primary justify-between">
        <button onClick={() => handleButtonClick("homepage")} className={`${activeButton === "homepage" ? "font-bold" : ""} hover:font-bold`}>
          Homepage
        </button>
        <button onClick={() => handleButtonClick("scheduling")} className={`${activeButton === "scheduling" ? "font-bold" : ""} hover:font-bold`}>
          Scheduling
        </button>
        <button onClick={() => handleButtonClick("favorites")} className={`${activeButton === "favorites" ? "font-bold" : ""} hover:font-bold`}>
          Favorites
        </button>
        <button onClick={() => handleButtonClick("profile")} className={`${activeButton === "profile" ? "font-bold" : ""} hover:font-bold`}>
          Profile
        </button>
      </div>
      <div>
      <button onClick={() => openSignInModal()} className="btn btn-sm btn-primary mr-10">Sign In</button>
      </div>
    </div>
    </>
  );
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={nunito.className}>
      <ModalProvider>
        <Navbar />
        <div className="mt-16">{children}</div>
        </ModalProvider>
      </body>
    </html>
  );
}
