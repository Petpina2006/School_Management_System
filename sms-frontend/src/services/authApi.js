import { apiFetch } from "./api";

// Login
export const loginUser = async (credentials) => {
    return await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
};

// Register
export const registerUser = async (userData) => {
    return await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });
};

// Logout
export const logoutUser = async () => {
    return await apiFetch("/logout", {
        method: "POST",
    });
};