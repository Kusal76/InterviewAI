import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure your .env has VITE_API_BASE_URL=http://localhost:3000
    withCredentials: true
});

// Interceptor grabs the token from localStorage for GitHub auth!
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export async function register({ username, email, password }) {
    try {
        // Added /api back to the path
        const response = await api.post('/api/auth/register', {
            username, email, password
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        // Added /api back to the path
        const response = await api.post("/api/auth/login", {
            email, password
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function logout() {
    try {
        // Added /api back to the path
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getMe() {
    try {
        // Added /api back to the path. This fixes the 404 Session check!
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (err) {
        throw err;
    }
}