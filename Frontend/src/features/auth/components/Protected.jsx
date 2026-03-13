import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth"; // Adjust the path if necessary

const Protected = ({ children }) => {
    const { user, loading } = useAuth();

    // 🔥 FIX: Wait for the backend to verify the token on refresh
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a', color: 'white' }}>
                <h2>Verifying session...</h2>
            </div>
        );
    }

    // If loading is done and there's STILL no user, then they are truly logged out
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, let them see the protected page!
    return children;
};

export default Protected;