import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Change if using proxy or deployed backend
});

// Attach token automatically if present
instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instance;
