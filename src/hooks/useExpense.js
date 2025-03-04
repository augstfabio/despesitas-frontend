import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useExpense = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const API_URL = import.meta.env.VITE_API_URL;

    const getExpenses = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Usuário não autenticado");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/despesas`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Erro ao buscar despesas");
            }

            return await res.json();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createExpense = async (expenseData) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Usuário não autenticado");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/despesas`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(expenseData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Erro ao criar despesa");
            }

            return await res.json();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const deleteExpense = async (id) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Usuário não autenticado");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${API_URL}/despesas/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Erro ao deletar despesa");
            }

            return await res.json();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }
    const updateExpense = async (id, updates) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Usuário não autenticado");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/despesas/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updates)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Erro ao atualizar despesa");
            }

            return await res.json();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return { loading, error, getExpenses, createExpense, updateExpense, deleteExpense };
};
