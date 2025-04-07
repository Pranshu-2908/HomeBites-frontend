import axios from "axios";

const API_URL = "http://localhost:5001/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosInstanceWithFormData = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
