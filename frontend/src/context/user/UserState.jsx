import { useContext, useState } from "react";
import UserContext from "./UserContext";

const UserState = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const host = import.meta.env.VITE_BACKEND_URL
    const authToken = localStorage.getItem("token");

    const getCurrentUser = async () => {
        if (!authToken) return;
        setLoading(true);
        try {
            const res = await fetch(`${host}/api/user/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${authToken}`,
                },

            });
            const response = await res.json();
            if (response.success) {
                return (
                    setUser(response.user)
                )
            } else { setUser(null) }

            if (response?.message === "Invalid token" || response?.message === "Token expired") {
                localStorage.removeItem("token");
                window.location.href = "/";
                return;
            }
        } catch (error) {
            console.error("fetchMe ERROR:", error);
            setUser(null);
        } finally {
            setLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            loading,
            getCurrentUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;