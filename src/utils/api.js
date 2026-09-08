import axios from 'axios';

const DEFAULT_API_BASE_URL = "https://backend-developmnet-test.onrender.com";

function normalizeApiBaseUrl(baseUrl) {
    if (!baseUrl) {
        return `${DEFAULT_API_BASE_URL}/api`;
    }

    const trimmedBaseUrl = baseUrl.trim().replace(/\/+$/, "");
    return trimmedBaseUrl.endsWith("/api") ? trimmedBaseUrl : `${trimmedBaseUrl}/api`;
}

function resolveApiBaseUrl() {
    if (typeof import.meta !== "undefined" && import.meta.env) {
        const viteBaseUrl =
            import.meta.env.VITE_API_BASE_URL ||
            import.meta.env.VITE_API_URL;

        if (viteBaseUrl) {
            return normalizeApiBaseUrl(viteBaseUrl);
        }
    }

    if (typeof process !== "undefined" && process.env) {
        const reactBaseUrl = process.env.REACT_APP_API_URL;

        if (reactBaseUrl) {
            return normalizeApiBaseUrl(reactBaseUrl);
        }
    }

    return normalizeApiBaseUrl(DEFAULT_API_BASE_URL);
}

const api = axios.create({
    baseURL: resolveApiBaseUrl(),
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true 
});

api.interceptors.request.use(
    (config) => {
        // ඔයා Login වෙද්දී token එක save කරපු නම (බොහෝවිට 'token') 
        const token = localStorage.getItem("token"); 
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);




export default api;
