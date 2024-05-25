"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pie from "@/components/home/CircularPercentage";
import ActivityContainer from "@/components/home/UpcomingActivity";
import Card from "@/components/CardContainer";
import SurveyModal from "@/components/home/SurveyModal";
import { getUserHealth } from "@/services/health.services";

export default function Homepage() {
    const [username, setUsername] = useState(null);
    const [health, setHealth] = useState(null);

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
                            <div className="text-2xl font-medium">
                                You have a {health.prediction * 100}% risk of
                                having cardiovascular disease
                            </div>
                            <Pie
                                percentage={health.prediction * 100}
                                color={"#FFAC52"}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-col text-primary py-10">
                <div className="flex flex-row justify-center items-center gap-x-10">
                    <button className="btn btn-sm btn-primary">
                        Your Schedule
                    </button>
                    <button className="btn btn-sm btn-primary">
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
                    <Card
                        image="/food-beef.png"
                        captions="Barbaque Beef with Tomato Sauce"
                        filled={false}
                    />
                    <Card
                        image="/food-beef.png"
                        captions="Barbaque Beef with Tomato Sauce"
                        filled={true}
                    />
                    <Card
                        image="/food-beef.png"
                        captions="Barbaque Beef with Tomato Sauce"
                        filled={false}
                    />
                    <Card
                        image="/food-beef.png"
                        captions="Barbaque Beef with Tomato Sauce"
                        filled={false}
                    />
                </div>
                <div className="text-2xl text-center font-bold mt-16">
                    Exercise Recommendations
                </div>
                <div className="flex justify-center items-center mt-8 gap-8">
                    <Card
                        image="/exercise-swimming.png"
                        captions="Swimming"
                        filled={false}
                    />
                    <Card
                        image="/exercise-swimming.png"
                        captions="Swimming"
                        filled={true}
                    />
                    <Card
                        image="/exercise-swimming.png"
                        captions="Swimming"
                        filled={false}
                    />
                    <Card
                        image="/exercise-swimming.png"
                        captions="Swimming"
                        filled={true}
                    />
                </div>
            </div>
        </main>
    );
}
