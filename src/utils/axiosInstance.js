/*
 * File         : axiosInstance.js
 * Author       : Ganapathy
 * Description  : Axios instance for making API calls in the Expense Tracker application.
 */

import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create an Axios instance with base URL and default headers
// This instance will be used for all API calls in the application
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error globally
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login page
        // window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error, Please try again");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Requset timeout. Please try again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
