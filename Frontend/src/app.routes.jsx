import { createBrowserRouter } from "react-router-dom";

// Imports
import LandingPage from "./features/interview/pages/LandingPage";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Login from "./features/auth/pages/Login";
// 🔥 1. Import your Register component (adjust the name/path if yours is different)
import Register from "./features/auth/pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    // 🔥 2. Add the Register route here!
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <Home />,
    },
    {
        path: "/interview/:id",
        element: <Interview />,
    }
]);