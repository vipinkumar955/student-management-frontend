// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });
          localStorage.setItem("access", res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return API(originalRequest);
        } catch {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(err);
  }
);

export default API;