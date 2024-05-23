import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUserProfile = async () => {
    let token = Cookies.get("token");
    let id = Cookies.get("id");
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URL}/users/profile/${id}`, {
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

export const editUserProfile = async (body) => {
    let token = Cookies.get("token");
    let id = Cookies.get("id");
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URL}/users/${id}`, body, {
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
