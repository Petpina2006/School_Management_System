import { apiFetch } from "./api";

// =========================================
// GET ALL USERS
// =========================================
export const getUsers = async (page = 1) => {
    return await apiFetch(
        `/super-admin/users?page=${page}`,
        {
            method: "GET",
        }
    );
};

// =========================================
// GET SINGLE USER
// =========================================
export const getUser = async (id) => {
    return await apiFetch(
        `/super-admin/users/${id}`,
        {
            method: "GET",
        }
    );
};

// =========================================
// CREATE USER
// =========================================
export const createUser = async (data) => {
    return await apiFetch(
        "/super-admin/users",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
};

// =========================================
// UPDATE USER
// =========================================
export const updateUser = async (id, data) => {
    return await apiFetch(
        `/super-admin/users/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(data),
        }
    );
};

// =========================================
// DELETE USER
// =========================================
export const deleteUser = async (id) => {
    return await apiFetch(
        `/super-admin/users/${id}`,
        {
            method: "DELETE",
        }
    );
};