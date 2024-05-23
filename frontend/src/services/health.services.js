import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleSaveHealth = async (body) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}/healths`, body)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err.response?.data);
            });
    });
};
