// src/api.js
import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/`,
});

// Request interceptor - Skip for auth endpoints
API.interceptors.request.use((req) => {
  // Skip adding token for auth endpoints
  const authEndpoints = ['auth/login/', 'auth/register/', 'token/refresh/'];
  const isAuthEndpoint = authEndpoints.some(endpoint => req.url?.includes(endpoint));
  
  if (!isAuthEndpoint) {
    const token = localStorage.getItem("access");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

// Response interceptor
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) return Promise.reject(err);

      try {
        const res = await API.post("token/refresh/", { refresh });

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return API(originalRequest);
      } catch (error) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default API;