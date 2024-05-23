import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUserSchedule = async () => {
    let token = Cookies.get("token");
    let id = Cookies.get("id");
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URL}/schedule/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};

export const doneFoodSchedule = async (schedId, foodId) => {
    let token = Cookies.get("token");
    let body = {
        status: 1,
    };
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URL}/schedule/${schedId}/food/${foodId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};

export const missedFoodSchedule = async (schedId, foodId) => {
    let token = Cookies.get("token");
    let body = {
        status: 2,
    };
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URL}/schedule/${schedId}/food/${foodId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};

export const doneExerciseSchedule = async (schedId, exId) => {
    let token = Cookies.get("token");
    let body = {
        status: 1,
    };
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URL}/schedule/${schedId}/exercise/${exId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};

export const missedExerciseSchedule = async (schedId, exId) => {
    let token = Cookies.get("token");
    let body = {
        status: 2,
    };
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URL}/schedule/${schedId}/exercise/${exId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};
