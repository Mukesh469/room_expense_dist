import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);

    const [loading, setLoading] = useState(false);

    const isAuthenticated = !!authToken;
    const host = import.meta.env.VITE_BACKEND_URL

    const register = async (formData) => {
        setLoading(true);

        try {
            const res = await fetch(`${host}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const response = await res.json();

            // if backend returned error
            if (!response.success) {
                return {
                    success: false,
                    message: response.message || "Registration failed"
                };
            }

            const token = response.token;

            if (!token) {
                return {
                    success: false,
                    message: "Token not received"
                };
            }

            setAuthToken(token);
            localStorage.setItem("token", token);

            return {
                success: true,
                message: response.message || "User registered successfully"
            };

        } catch (error) {
            console.error("Register API error:", error);

            return {
                success: false,
                message: error.message || "Something went wrong"
            };
        } finally {
            setLoading(false);
        }
    };

    const login = async (phone, password) => {
        setLoading(true);

        try {
            const res = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, password })
            });
            const response = await res.json();

            if (response.success) {
                const token = response?.token;

                if (!token) {
                    return { success: false, message: response?.message || "Invalid auth response" };
                }

                setAuthToken(token);
                localStorage.setItem("token", token);
                return { success: true, message: response?.message || "Authentication successful" };
            }

            if (response?.message === "Invalid token" || response?.message === "Token expired") {
                localStorage.removeItem("token");
                window.location.href = "/";
                return;
            }

            return { success: false, message: response?.message };
        } catch (error) {
            return { success: false, message: error.message || "Something went wrong" };
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                authToken,
                isAuthenticated,
                register,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;