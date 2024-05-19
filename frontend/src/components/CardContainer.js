"use client";
import { useState } from "react";
import Image from "next/image";

export default function Card({ image, captions, filled }) {
  const [isFilled, setIsFilled] = useState(filled);

  const toggleFilled = () => {
    setIsFilled(!isFilled);
  };

  const starImage = isFilled ? "/star-filled.png" : "/star.png";

  return (
    <div className="bg-white shadow-xl drop-shadow-xl rounded-lg max-w-[160px]">
      <Image src={image} width={160} height={110} className="rounded-t-lg" />
      <div className="pt-2 px-2 text-black font-bold text-sm">{captions}</div>
      <div className="flex justify-end pb-2 px-2">
        <button onClick={toggleFilled}>
          <Image src={starImage} width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
