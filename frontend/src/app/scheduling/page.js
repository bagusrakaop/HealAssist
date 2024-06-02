"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { format, addMonths, subMonths } from "date-fns";

import RecommendationCard from "@/components/scheduling/recommendationCard";
import { getUserSchedule } from "@/services/schedule.services";

export default function SchedulingPage() {
    const [schedules, setSchedules] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const itemsPerPage = 6;
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.replace("/");
        }
    }, [router]);

    useEffect(() => {
        getUserSchedule()
            .then((res) => {
                setSchedules(res);
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            });
    }, []);

    const uniqueDates = [];
    const uniqueSchedules = schedules.filter((entry) => {
        const date = format(new Date(entry.date), "yyyy-MM-dd");
        if (uniqueDates.includes(date)) {
            return false;
        } else {
            uniqueDates.push(date);
            return true;
        }
    });

    const handleSelectedData = (date) => {
        let data = reformattedData.filter((entry) => entry.date === date);
        setSelectedDate(date);
        setSelectedData(data);
    };

    const genId = (() => {
        let nextId = 1;
        return () => nextId++;
    })();

    const reformattedData = schedules.reduce((acc, current) => {
        const existingUser = acc.find(
            (user) =>
                user.userId === current.userId && user.date === current.date
        );
        if (existingUser) {
            existingUser.Food.push({
                ...current.Food[0],
                uid: genId(),
                time: current.time,
                schedId: current.id,
            });
            if (current.Exercises.length > 0) {
                existingUser.Exercises.push({
                    ...current.Exercises[0],
                    uid: genId(),
                    time: current.time,
                    schedId: current.id,
                });
            } else {
                existingUser.Exercises.push({
                    uid: genId(),
                    time: current.time,
                });
            }
        } else {
            acc.push({
                id: current.id,
                userId: current.userId,
                date: current.date,
                status: current.status,
                createdAt: current.createdAt,
                updatedAt: current.updatedAt,
                user_id: current.user_id,
                Food: [
                    {
                        ...current.Food[0],
                        uid: genId(),
                        time: current.time,
                        schedId: current.id,
                    },
                ],
                Exercises:
                    current.Exercises.length > 0
                        ? [
                              {
                                  ...current.Exercises[0],
                                  uid: genId(),
                                  time: current.time,
                                  schedId: current.id,
                              },
                          ]
                        : [
                              {
                                  uid: genId(),
                                  time: current.time,
                              },
                          ],
            });
        }
        return acc;
    }, []);

    const handleNext = () => {
        if (startIndex + itemsPerPage < currentSchedules.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
        setStartIndex(0); // Reset start index when changing the month
    };

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
        setStartIndex(0); // Reset start index when changing the month
    };

    const currentSchedules = uniqueSchedules.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
            entryDate.getMonth() === currentMonth.getMonth() &&
            entryDate.getFullYear() === currentMonth.getFullYear()
        );
    });

    const visibleSchedules = currentSchedules.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <main className="w-full bg-neutral min-h-screen">
            <div className="flex flex-col items-center py-10">
                <div className="flex flex-col text-primary text-md py-2">
                    Your Schedule
                </div>
                {/* Month */}
                <div className="flex text-primary my-2">
                    <button onClick={handlePrevMonth}>
                        <Image
                            src="/arrowbutton.svg"
                            alt="Left Arrow Button"
                            width={12}
                            height={12}
                            priority
                        />
                    </button>
                    <div className="text-2xl font-bold mx-8">
                        {format(currentMonth, "MMMM yyyy")}
                    </div>
                    <button onClick={handleNextMonth}>
                        <Image
                            src="/arrowbutton.svg"
                            alt="Right Arrow Button"
                            width={12}
                            height={12}
                            style={{ transform: "scaleX(-1)" }}
                            priority
                        />
                    </button>
                </div>
                {/* Day */}
                <div className="flex my-2">
                    <button onClick={handlePrev} disabled={startIndex === 0}>
                        <Image
                            src="/arrowbutton.svg"
                            alt="Left Arrow Button"
                            width={12}
                            height={12}
                            priority
                        />
                    </button>
                    {/* Day Tabs */}
                    <div className="mx-6 flex">
                        {visibleSchedules.map((entry) => {
                            const formattedDate = format(
                                new Date(entry.date),
                                "EEE, d MMM"
                            );
                            return (
                                <button
                                    key={entry.id}
                                    className="btn btn-sm btn-primary w-[10vw] mx-2"
                                    onClick={() =>
                                        handleSelectedData(entry.date)
                                    }
                                >
                                    {formattedDate}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={
                            startIndex + itemsPerPage >= currentSchedules.length
                        }
                    >
                        <Image
                            src="/arrowbutton.svg"
                            alt="Right Arrow Button"
                            width={12}
                            height={12}
                            style={{ transform: "scaleX(-1)" }}
                            priority
                        />
                    </button>
                </div>
                <div className="flex my-10 w-2/3 text-primary ">
                    {/* Food Recommendation */}
                    <div className="w-full h-full mx-2">
                        <div className="font-bold text-xl text-center mb-4">
                            Food Recommendation(s)
                        </div>
                        <div className="bg-white rounded-md p-4">
                            {selectedData.map((entry) =>
                                entry.Food.map((food) => (
                                    <RecommendationCard
                                        key={food.uid}
                                        type="Food"
                                        time={food.time}
                                        initStatus={food.status}
                                        schedId={food.schedId}
                                        id={food.id}
                                        imageSrc={
                                            food.picture || "/food-salad.png"
                                        }
                                        name={food.name}
                                        portionOrDuration={`${food.calories} Calories`}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    {/* Exercise Recommendation */}
                    <div className="w-full h-full mx-2">
                        <div className="font-bold text-xl text-center mb-4">
                            Exercise Recommendation(s)
                        </div>
                        <div className="bg-white rounded-md p-4">
                            {selectedData.map((entry) =>
                                entry.Exercises.map((exercise) => (
                                    <RecommendationCard
                                        key={exercise.uid}
                                        time={exercise.time}
                                        initStatus={exercise.status}
                                        schedId={exercise.schedId}
                                        id={exercise.id}
                                        type="Exercise"
                                        imageSrc={
                                            exercise?.picture ||
                                            "/exercise-gym.png"
                                        }
                                        name={exercise?.name}
                                        portionOrDuration={`${exercise?.duration} Minutes`}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
