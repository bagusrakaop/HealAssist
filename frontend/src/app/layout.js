"use client";
import { Nunito } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { useState } from "react";

import SignInModal from "./components/signInModal";

const nunito = Nunito({
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <html lang="en">
      <body className={nunito.className}>
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
          <SignInModal/>
          </div>
        </div>
        <div className="mt-16">{children}</div>
      </body>
    </html>
  );
}
