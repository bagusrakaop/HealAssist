"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pie from "@/components/home/CircularPercentage";
import ActivityContainer from "@/components/home/UpcomingActivity";
import Card from "@/components/CardContainer";
import SurveyModal from "@/components/home/SurveyModal";
import { getUserHealth } from "@/services/health.services";
import { useRouter } from "next/navigation";
import { getUserExercises, getUserFoods } from "@/services/favorites.services";

export default function Homepage() {
    const [username, setUsername] = useState(null);
    const [health, setHealth] = useState(null);
    const [allFoods, setAllFoods] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.replace("/");
        } else {
            getUserFoods()
                .then((foods) => {
                    setAllFoods(foods);
                })
                .catch((error) => {
                    console.error("Error fetching favorite foods:", error);
                });

            getUserExercises()
                .then((exercises) => {
                    setAllExercises(exercises);
                })
                .catch((error) => {
                    console.error("Error fetching favorite exercises:", error);
                });
        }
    }, []);

    useEffect(() => {
        const usernameCookie = Cookies.get("username");
        if (usernameCookie) {
            setUsername(usernameCookie);
        }
    }, []);

    useEffect(() => {
        if (username) {
            getUserHealth()
                .then((res) => {
                    setHealth(res);
                    console.log(res);
                })
                .catch((error) => {
                    console.error("Error fetching health data:", error);
                });
        }
    }, [username]);

    if (!username) {
        return <div className="bg-white text-primary">Loading...</div>;
    }

    return (
        <main className="w-full bg-white min-h-screen">
            <SurveyModal />
            <div className="flex flex-col bg-neutral text-primary justify-center py-10">
                <div className="text-2xl text-center font-bold">
                    Hello, {username}!
                </div>
                <div className="text-2xl text-center font-bold">
                    here is your current condition
                </div>
                {!health ? (
                    <div className="text-center font-bold text-red-500">
                        Please fill the health survey first
                    </div>
                ) : (
                    <>
                        <div className="flex flex-row justify-center items-center">
                            <div className="text-2xl font-medium pt-5">
                                {health.prediction === 1
                                    ? "You have a risk of cardiovascular disease, let's fix your daily habit with us!"
                                    : "You do not have a risk of cardiovascular disease, keep it up!"}
                            </div>
                            {/* <Pie
                                percentage={health.prediction}
                                color={"#FFAC52"}
                            /> */}
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-col text-primary py-10">
                <div className="flex flex-row justify-center items-center gap-x-10">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => router.push(`/scheduling`)}
                    >
                        Your Schedule
                    </button>
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => router.push(`/favorites`)}
                    >
                        Your Favorites
                    </button>
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                            document.getElementById("survey").showModal()
                        }
                    >
                        Update Condition
                    </button>
                </div>
                <div className="text-2xl text-center font-bold mt-16">
                    Today's Upcoming Activity
                </div>
                <ActivityContainer />
                <div className="text-2xl text-center font-bold mt-16">
                    Food Recommendations
                </div>
                <div className="flex justify-center items-center mt-8 gap-8">
                    {allFoods &&
                        allFoods.foodList &&
                        allFoods.foodList.map((food) => (
                            <Card
                                key={food.id}
                                image={food.picture}
                                captions={food.name}
                                filled={true}
                            />
                        ))}
                    {!allFoods ||
                        !allFoods.foodList ||
                        (!allFoods.foodList.length && (
                            <div>No favorite foods found.</div>
                        ))}
                </div>
                <div className="text-2xl text-center font-bold mt-16">
                    Exercise Recommendations
                </div>
                <div className="flex justify-center items-center mt-8 gap-8">
                    {allExercises &&
                        allExercises.exerciseList &&
                        allExercises.exerciseList.map((exercise) => (
                            <Card
                                key={exercise.id}
                                image={exercise.picture}
                                captions={exercise.name}
                                filled={true}
                            />
                        ))}
                    {!allExercises ||
                        !allExercises.exerciseList ||
                        (!allExercises.exerciseList.length && (
                            <div>No favorite exercises found.</div>
                        ))}
                </div>
            </div>
        </main>
    );
}
