import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});

// Interceptor stays the same
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
        // FIX: Remove "/api" prefix
        const response = await api.post('/auth/register', {
            username, email, password
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        // FIX: Remove "/api" prefix
        const response = await api.post("/auth/login", {
            email, password
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function logout() {
    try {
        // FIX: Remove "/api" prefix
        const response = await api.get("/auth/logout");
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getMe() {
    try {
        // FIX: Remove "/api" prefix
        const response = await api.get("/auth/get-me");
        return response.data;
    } catch (err) {
        throw err;
    }
}