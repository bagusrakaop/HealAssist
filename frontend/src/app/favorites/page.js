"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Card from "@/components/CardContainer";
import Image from "next/image";
import { toast } from "react-hot-toast";
import AddFavoritesModal from "@/components/favorites/addFavoritesModal";
import {
    getAllFoods,
    getAllExercises,
    getUserFoods,
    getUserExercises,
    handleSaveExercises,
    handleSaveFoods,
} from "@/services/favorites.services";

export default function Favorites() {
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
    const [allFoods, setAllFoods] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const [userFoods, setUserFoods] = useState([]);
    const [userExercises, setUserExercises] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.replace("/");
        } else {
            getAllFoods()
                .then((foods) => {
                    setAllFoods(foods);
                })
                .catch((error) => {
                    console.error("Error fetching favorite foods:", error);
                });

            getAllExercises()
                .then((exercises) => {
                    setAllExercises(exercises);
                })
                .catch((error) => {
                    console.error("Error fetching favorite exercises:", error);
                });

            getUserFoods()
                .then((foods) => {
                    setUserFoods(foods);
                })
                .catch((error) => {
                    console.error("Error fetching favorite foods:", error);
                });

            getUserExercises()
                .then((exercises) => {
                    setUserExercises(exercises);
                })
                .catch((error) => {
                    console.error("Error fetching favorite exercises:", error);
                });
        }
    }, []);

    const handleFoodSelect = (id) => {
        const food = allFoods.find((food) => food.id === id);
        if (selectedFoods.includes(food)) {
            setSelectedFoods(selectedFoods.filter((food) => food.id !== id));
        } else {
            setSelectedFoods([...selectedFoods, food]);
        }
    };

    const handleExerciseSelect = (id) => {
        const exercise = allExercises.find((exercise) => exercise.id === id);
        if (selectedExercises.includes(exercise)) {
            setSelectedExercises(
                selectedExercises.filter((exercise) => exercise.id !== id)
            );
        } else {
            setSelectedExercises([...selectedExercises, exercise]);
        }
    };

    const handleChosenFoods = async () => {
        const selectedFoodIds = selectedFoods.map((food) => food.id);
        const data = {
            userId: Cookies.get("id"),
            foodIds: selectedFoodIds,
        };

        try {
            const res = await handleSaveFoods(data);
            if (res && res.message) {
                toast.success("Foods saved successfully");
                setIsFoodModalOpen(false);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleChosenExercises = async () => {
        const selectedExerciseIds = selectedExercises.map(
            (exercise) => exercise.id
        );
        const data = {
            userId: Cookies.get("id"),
            exIds: selectedExerciseIds,
        };

        try {
            const res = await handleSaveExercises(data);
            if (res && res.message) {
                toast.success("Exercises saved successfully");
                setIsExerciseModalOpen(false);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <main className="w-full bg-neutral min-h-screen">
            <div className="flex flex-col items-center py-10">
                {/* Favorite Food */}
                <div className="w-4/5">
                    <div className="font-bold text-2xl text-primary mb-4">
                        Your Favorite Food
                    </div>
                    <div className="flex flex-wrap gap-8">
                        {userFoods &&
                            userFoods.foodList &&
                            userFoods.foodList.map((food) => (
                                <Card
                                    key={food.id}
                                    image={food.picture}
                                    captions={food.name}
                                    filled={true}
                                />
                            ))}
                        {!userFoods ||
                            !userFoods.foodList ||
                            (!userFoods.foodList.length && (
                                <div>No favorite foods found.</div>
                            ))}
                        {/* Button Add Favorite Food */}
                        <button
                            className="my-auto"
                            onClick={() => setIsFoodModalOpen(true)}
                        >
                            <Image
                                src="/add-favorite-button.svg"
                                alt="Add Favorite"
                                width={100}
                                height={100}
                                priority
                            />
                            <div className="text-primary text-center font-bold mt-4">
                                Add
                            </div>
                        </button>
                    </div>
                </div>
                {/* Favorite Exercise */}
                <div className="w-4/5 mt-10">
                    <div className="font-bold text-2xl text-primary mb-4">
                        Your Favorite Exercise
                    </div>
                    <div className="flex flex-wrap gap-8">
                        {userExercises &&
                            userExercises.exerciseList &&
                            userExercises.exerciseList.map((exercise) => (
                                <Card
                                    key={exercise.id}
                                    image={exercise.picture}
                                    captions={exercise.name}
                                    filled={true}
                                />
                            ))}
                        {!userExercises ||
                            !userExercises.exerciseList ||
                            (!userExercises.exerciseList.length && (
                                <div>No favorite exercises found.</div>
                            ))}

                        {/* Button Add Favorite Exercise */}
                        <button
                            className="my-auto"
                            onClick={() => setIsExerciseModalOpen(true)}
                        >
                            <Image
                                src="/add-favorite-button.svg"
                                alt="Add Favorite"
                                width={100}
                                height={100}
                                priority
                            />
                            <div className="text-primary text-center font-bold mt-4">
                                Add
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal Add Favorite Food */}
            {isFoodModalOpen && (
                <AddFavoritesModal
                    title="Select All Foods That You Like"
                    onClose={() => setIsFoodModalOpen(false)}
                >
                    <div className="flex flex-wrap gap-8">
                        {allFoods.map((food) => (
                            <Card
                                key={food.id}
                                image={food.picture}
                                captions={food.name}
                                filled={selectedFoods.includes(food)}
                                onSelect={() => handleFoodSelect(food.id)}
                            />
                        ))}
                    </div>
                    <div className="flex gap-8 justify-end my-6">
                        <button
                            className="btn btn-sm btn-error my-1 text-white"
                            onClick={() => setIsFoodModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-sm btn-success my-1 text-white"
                            onClick={handleChosenFoods}
                        >
                            Done
                        </button>
                    </div>
                </AddFavoritesModal>
            )}

            {/* Modal Add Favorite Exercise */}
            {isExerciseModalOpen && (
                <AddFavoritesModal
                    title="Select All Exercises That You Like"
                    onClose={() => setIsExerciseModalOpen(false)}
                >
                    <div className="flex flex-wrap gap-8">
                        {allExercises.map((exercise) => (
                            <Card
                                key={exercise.id}
                                image={exercise.picture}
                                captions={exercise.name}
                                filled={selectedExercises.includes(exercise)}
                                onSelect={() =>
                                    handleExerciseSelect(exercise.id)
                                }
                            />
                        ))}
                    </div>
                    <div className="flex gap-8 justify-end my-6">
                        <button
                            className="btn btn-sm btn-error my-1 text-white"
                            onClick={() => setIsExerciseModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-sm btn-success my-1 text-white"
                            onClick={handleChosenExercises}
                        >
                            Done
                        </button>
                    </div>
                </AddFavoritesModal>
            )}
        </main>
    );
}
