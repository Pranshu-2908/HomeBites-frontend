import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/user";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
