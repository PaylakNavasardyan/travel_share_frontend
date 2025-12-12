import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Auth, ApiResponse } from '../types'

export const API_URL = process.env.REACT_APP_API_URL

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
});

$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.error("Response interceptor error:", error?.toJSON ? error.toJSON() : error);

    const originalRequest = error.config as (AxiosRequestConfig & { _isRetry?: boolean }) | undefined;

    const status = error.response?.status;

    if (status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<ApiResponse<Auth.Session>>(`${API_URL}/api/user/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.data.accessToken);
        return $api.request(originalRequest);
      } catch (refreshError) {
        console.log("Not authorized (refresh failed).", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;