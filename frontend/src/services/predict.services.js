import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ML_API_BASE_URL

export const predictCVD = async (body) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/predict`, body)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.response?.data);
        });
    });
  };

