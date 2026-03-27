import axios from "axios";

// Axios instance with base URL from environment
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
});

// Add access token to request headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Refresh token once on 401 errors
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (!refresh) return Promise.reject(err);

      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/refresh/`, { refresh });
        localStorage.setItem("access", res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return API(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default API;