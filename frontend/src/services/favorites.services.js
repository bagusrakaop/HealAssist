import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllFoods = async () => {
  let token = Cookies.get("token");
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/foods`, {
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

export const getAllExercises = async () => {
  let token = Cookies.get("token");
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/exercises`, {
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