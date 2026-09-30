
import { apiFetch } from "./api";

// GET ALL TEACHERS
export const getTeachers = async (page = 1) => {
    return await apiFetch(
        `/super-admin/teachers?page=${page}`,
        {
            method: "GET",
        }
    );
};

// GET ONE TEACHER
export const getTeacher = async (id) => {
    return await apiFetch(
        `/super-admin/teachers/${id}`,
        {
            method: "GET",
        }
    );
};

// CREATE TEACHER
export const createTeacher = async (data) => {
    return await apiFetch(
        "/super-admin/teachers",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
};

// UPDATE TEACHER
export const updateTeacher = async (id, data) => {
    return await apiFetch(
        `/super-admin/teachers/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(data),
        }
    );
};

// DELETE TEACHER
export const deleteTeacher = async (id) => {
    return await apiFetch(
        `/super-admin/teachers/${id}`,
        {
            method: "DELETE",
        }
    );
};

// TEACHER - PROFILE
export const getTeacherProfile = async () => {
    return await apiFetch(
        "/teacher/profile",
        {
            method: "GET",
        }
    );
};

// TEACHER - MY STUDENTS
export const getMyStudents = async () => {
    return await apiFetch(
        "/teacher/students",
        {
            method: "GET",
        }
    );
};

// TEACHER - MY CLASSES
export const getMyClasses = async () => {
    return await apiFetch(
        "/teacher/classes",
        {
            method: "GET",
        }
    );
};

// TEACHER - MY SUBJECTS
export const getMySubjects = async () => {
    return await apiFetch(
        "/teacher/subjects",
        {
            method: "GET",
        }
    );
};
