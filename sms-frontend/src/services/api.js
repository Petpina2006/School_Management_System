const API_URL = "http://127.0.0.1:8000/api";

export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
    const error = new Error(
        data.error || data.message || "Request failed"
    );

    error.status = response.status;
    error.response = data;

    throw error;
}

    return data;
};