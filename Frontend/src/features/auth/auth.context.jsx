// Frontend/src/features/auth/auth.context.jsx
import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api"; // Adjust path if needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 🔥 Starts as true!

    // 🔥 This checks the session exactly ONE time when the app refreshes
    useEffect(() => {
        const checkSession = async () => {
            try {
                const data = await getMe();
                if (data && data.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Session check failed");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};