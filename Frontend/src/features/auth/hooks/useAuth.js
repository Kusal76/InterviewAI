// Frontend/src/features/auth/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
            return data;
        } catch (err) {
            throw err.response?.data?.message || "Invalid Email or Password";
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return data;
        } catch (err) {
            throw err.response?.data?.message || "Registration failed";
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            localStorage.removeItem('token');
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Notice that the useEffect and getMe calls are completely removed from here!

    return { user, loading, handleRegister, handleLogin, handleLogout };
};