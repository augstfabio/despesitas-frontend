import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuth = () => {
    const { setUser } = useAuthContext();
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Falha no login");
            }

            const data = await res.json();


            localStorage.setItem("token", data.token);

           
            setUser(data.user); 
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                throw new Error("Falha no registro");
            }

            const data = await res.json();

            
            localStorage.setItem("token", data.token);
            setUser(data.user); 
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null); 
    };

    return { loading, error, login, register, logout };
};