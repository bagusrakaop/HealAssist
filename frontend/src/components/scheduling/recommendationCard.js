import Image from "next/image";
import PropTypes from "prop-types";
import { useState } from "react";

import {
    doneFoodSchedule,
    doneExerciseSchedule,
    missedExerciseSchedule,
    missedFoodSchedule,
} from "@/services/schedule.services";

function RecommendationCard({
    type,
    time,
    initStatus,
    schedId,
    id,
    imageSrc,
    name,
    portionOrDuration,
}) {
    const foodMap = {
        "08:00:00": "Breakfast",
        "12:00:00": "Lunch",
        "18:00:00": "Dinner",
    };

    const exerciseMap = {
        "08:00:00": "Morning",
        "12:00:00": "Evening",
        "18:00:00": "Night",
    };
    const [status, setStatus] = useState(initStatus);
    const mapping = type === "Food" ? foodMap : exerciseMap;

    const timeName = mapping[time];

    const handleDoneClick = async () => {
        try {
            if (mapping == foodMap) {
                const res = await doneFoodSchedule(schedId, id);
                if (res && res.message) {
                    setStatus(1);
                }
            } else {
                const res = await doneExerciseSchedule(schedId, id);
                if (res && res.message) {
                    setStatus(1);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMissedClick = async () => {
        try {
            if (mapping == foodMap) {
                const res = await missedFoodSchedule(schedId, id);
                if (res && res.message) {
                    setStatus(2);
                }
            } else {
                const res = await missedExerciseSchedule(schedId, id);
                if (res && res.message) {
                    setStatus(2);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mb-4">
            <div className="font-bold text-xl mb-2">{timeName}</div>
            {name ? (
                <div className="flex w-full justify-center rounded-md bg-white drop-shadow p-6">
                    <Image
                        className="rounded-md mr-4"
                        src={imageSrc}
                        alt={name}
                        width={80}
                        height={80}
                        priority
                    />
                    <div className="mx-2 w-1/3 text-black">
                        <div className="text-md font-bold">{name}</div>
                        <div className="text-sm font-regular">
                            {portionOrDuration}
                        </div>
                    </div>
                    <div className="w-1/3">
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
                            <>
                                <button
                                    className="btn btn-sm btn-success w-full my-1 text-white"
                                    onClick={() => handleDoneClick()}
                                >
                                    Done
                                </button>
                                <button
                                    className="btn btn-sm btn-error w-full my-1 text-white"
                                    onClick={() => handleMissedClick()}
                                >
                                    Missed
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex h-[128px] bg-white rounded-md drop-shadow p-6">
                    There is no recommendation
                </div>
            )}
        </div>
    );
}

RecommendationCard.propTypes = {
    type: PropTypes.oneOf(["Food", "Exercise"]).isRequired,
    imageSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    portionOrDuration: PropTypes.string,
};

export default RecommendationCard;
