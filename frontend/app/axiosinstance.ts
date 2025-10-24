// lib/axiosInstance.ts
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/` || 'https://api.example.com', // fallback base URL
  //  validateStatus: (status) => status >= 200 && status < 300,
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
   
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Optional: handle global errors
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized. Redirect to login.');
        // Optionally redirect or logout user
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;