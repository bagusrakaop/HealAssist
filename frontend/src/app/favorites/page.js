"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Card from "@/components/CardContainer";
import Image from "next/image";
import AddFavoritesModal from "@/components/favorites/addFavoritesModal";

export default function Favorites() {
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
        router.replace("/");
    }
}, []);

  return (
    <main className="w-full bg-neutral min-h-screen">
      <div className="flex flex-col items-center py-10">
        {/* Favorite Food */}
        <div className="w-4/5">
          <div className="font-bold text-2xl text-primary mb-4">Your Favorite Food</div>
          <div className="flex flex-wrap gap-8">
            <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false} />
            <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false} />
            <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false} />
            {/* Button Add Favorite Food */}
            <button className="my-auto" onClick={() => setIsFoodModalOpen(true)}>
              <Image src="/add-favorite-button.svg" alt="Add Favorite" width={100} height={100} priority />
              <div className="text-primary text-center font-bold mt-4">Add</div>
            </button>
          </div>
        </div>
        {/* Favorite Exercise */}
        <div className="w-4/5 mt-10">
          <div className="font-bold text-2xl text-primary mb-4">Your Favorite Exercise</div>
          <div className="flex flex-wrap gap-8">
            <Card image="/exercise-swimming.png" captions="Swimming" filled={false} />
            <Card image="/exercise-swimming.png" captions="Swimming" filled={false} />
            {/* Button Add Favorite Exercise */}
            <button className="my-auto" onClick={() => setIsExerciseModalOpen(true)}>
              <Image src="/add-favorite-button.svg" alt="Add Favorite" width={100} height={100} priority />
              <div className="text-primary text-center font-bold mt-4">Add</div>
            </button>
          </div>
        </div>
      </div>
      {/* Modal Add Favorite Food */}
      {isFoodModalOpen && (
        <AddFavoritesModal title="Select All Foods That You Like" onClose={() => setIsFoodModalOpen(false)}>
          <div className="flex flex-wrap gap-8">
            <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false} />
            <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false} />
            <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false} />
            <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false} />
          </div>
          <div className="flex gap-8 justify-end my-6">
            <button className="btn btn-sm btn-error my-1 text-white" onClick={() => setIsFoodModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-sm btn-success my-1 text-white">Done</button>
          </div>
        </AddFavoritesModal>
      )}
      {/* Modal Add Favorite Exercise */}
      {isExerciseModalOpen && (
        <AddFavoritesModal title="Select All Exercises That You Like" onClose={() => setIsExerciseModalOpen(false)}>
          <div className="flex flex-wrap gap-8">
            <Card image="/exercise-swimming.png" captions="Swimming" filled={false} />
            <Card image="/exercise-swimming.png" captions="Swimming" filled={false} />
            <Card image="/exercise-swimming.png" captions="Swimming" filled={false} />
            <Card image="/exercise-swimming.png" captions="Swimming" filled={false} />
          </div>
          <div className="flex gap-8 justify-end my-6">
            <button className="btn btn-sm btn-error my-1 text-white" onClick={() => setIsExerciseModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-sm btn-success my-1 text-white">Done</button>
          </div>
        </AddFavoritesModal>
      )}
    </main>
  );
}
