import { createBrowserRouter } from "react-router-dom";

// Imports
import LandingPage from "./features/interview/pages/LandingPage";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
    // --- PUBLIC ROUTES ---
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },

    // --- SECURE ROUTES ---
    {
        path: "/dashboard",
        // 🔥 Wrap the component inside <Protected>
        element: <Protected><Home /></Protected>,
    },
    {
        path: "/interview/:id",
        // 🔥 Wrap the component inside <Protected>
        element: <Protected><Interview /></Protected>,
    }
]);