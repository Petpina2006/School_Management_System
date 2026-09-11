import { apiFetch } from "./api";

export const getStudents = async (page = 1) => {
    return await apiFetch(
        `/super-admin/students?page=${page}`,
        {
            method: "GET",
        }
    );
};

export const getStudent = async (id) => {
    return await apiFetch(
        `/super-admin/students/${id}`,
        {
            method: "GET",
        }
    );
};

export const createStudent = async (data) => {
    return await apiFetch(
        "/super-admin/students",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
};

export const updateStudent = async (id, data) => {
    return await apiFetch(
        `/super-admin/students/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(data),
        }
    );
};

export const deleteStudent = async (id) => {
    return await apiFetch(
        `/super-admin/students/${id}`,
        {
            method: "DELETE",
        }
    );
};