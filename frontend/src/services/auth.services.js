import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleUserLogin = async (body) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}/auth/login`, body)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};

export const sendOTP = async (body) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}/auth/send-otp`, body)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};

export const handleUserRegister = async (body) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}/auth/register`, body)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};

export const sendResetPassword = async (body) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}/auth/forgot-password`, body)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};

export const handleResetPassword = async (body) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}/auth/reset-password`, body)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};
