import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleSaveHealth = async (body) => {
    let token = Cookies.get("token");
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}/healths`, body, {
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

export const getUserHealth = async () => {
    let token = Cookies.get("token");
    let id = Cookies.get("id");
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URL}/healths/user/${id}`, {
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
