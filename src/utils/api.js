import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3003/api', // (Oyage backend port eka 3003 nam mekaama thiyanna, nattam 5000 wage nam eka danna)
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