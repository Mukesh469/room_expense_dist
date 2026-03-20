import Dashboard from "../pages/private/dashboard/Dashboard";
import Landing from "../pages/public/LandingPage";
import Login from "../pages/public/auth/Login";


export const publicRoutes = [
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
];

export const privateRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
];