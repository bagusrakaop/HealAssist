import Image from "next/image";
import { useState, useEffect } from "react";

import { getClosestSchedule } from "@/services/schedule.services";
import {
    doneExerciseSchedule,
    missedExerciseSchedule,
} from "@/services/schedule.services";

export default function ActivityContainer() {
    const [schedule, setSchedule] = useState({});
    const [status, setStatus] = useState(null);

    useEffect(() => {
        getClosestSchedule()
            .then((res) => {
                if (res.length > 0) {
                    setSchedule(res[0]);
                    setStatus(res[0].Exercises[0].Schedule_Exercise.status);
                }
            })
            .catch((error) => {
                console.error("Error fetching activity data:", error);
            });
    }, [status]);

    const exerciseMap = {
        "08:00:00": "Morning",
        "12:00:00": "Evening",
        "18:00:00": "Night",
    };

    const timeName = exerciseMap[schedule.time];

    const handleDoneClick = async () => {
        try {
            const res = await doneExerciseSchedule(
                schedule.id,
                schedule.Exercises[0].id
            );
            if (res && res.message) {
                setStatus(1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMissedClick = async () => {
        try {
            const res = await missedExerciseSchedule(
                schedule.id,
                schedule.Exercises[0].id
            );
            if (res && res.message) {
                setStatus(2);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center mt-8">
            {schedule.Exercises && schedule.Exercises.length > 0 ? (
                <div className="p-4 bg-white border-l-4 border-primary shadow-lg drop-shadow-lg rounded-lg">
                    <div className="flex items-center">
                        <div className="m-2 mr-8">
                            <Image
                                src={
                                    schedule.Exercises[0].picture ||
                                    "/exercise-jogging.png"
                                }
                                alt="Jogging"
                                width={95}
                                height={95}
                            />
                        </div>
                        <div className="flex items-center gap-x-10">
                            <div className="text-black">
                                <span className="text-[12px]">Activity</span>
                                <div className="font-bold text-[20px]">
                                    {schedule.Exercises[0].name}
                                </div>
                            </div>
                            <div className="text-black">
                                <span className="text-[12px]">Type</span>
                                <div className="font-bold text-[20px]">
                                    {" "}
                                    Exercise{" "}
                                </div>
                            </div>
                            <div className="text-black">
                                <span className="text-[12px]"> Time</span>
                                <div className="font-bold text-[20px]">
                                    {" "}
                                    {timeName}{" "}
                                </div>
                            </div>
                            {status === 1 && (
                                <div className="flex text-midgreen text-xs justify-center items-end">
                                    Marked as Done
                                </div>
                            )}
                            {status === 2 && (
                                <div className="flex text-midred text-xs justify-center items-end">
                                    Marked as Missed
                                </div>
                            )}
                            {status !== 1 && status !== 2 && (
                                <div className="flex flex-col gap-y-4">
                                    <button
                                        className="px-10 py-2 hover:bg-green-700 active:bg-green-900 text-white font-bold bg-midgreen rounded"
                                        onClick={() => handleDoneClick()}
                                    >
                                        Done
                                    </button>
                                    <button
                                        className="px-10 py-2 hover:bg-red-700 active:bg-red-900 text-white font-bold bg-midred rounded"
                                        onClick={() => handleMissedClick()}
                                    >
                                        Skip
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>No exercise found</div>
            )}
        </div>
    );
}
