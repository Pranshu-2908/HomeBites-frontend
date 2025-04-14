import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const API_URL =
  process.env.MODE === "developemnt"
    ? "http://localhost:3002/api/v1"
    : "https://homebite-pro.onrender.com/api/v1";

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
