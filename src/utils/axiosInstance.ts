import axios from "axios";

import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "aplication/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accesToken = localStorage.getItem("token");
    if (accesToken) {
      config.headers.Authorization = `Bearer ${accesToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
