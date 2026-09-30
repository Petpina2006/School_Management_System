import { apiFetch } from "../api";

// Dashboard
export const getTeacherDashboard = async () => {
    return await apiFetch("/teacher/dashboard");
};

// Profile
export const getTeacherProfile = async () => {
    return await apiFetch("/teacher/profile");
};

export const updateTeacherProfile = async (data) => {
    return await apiFetch("/teacher/profile", {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

// Students
export const getTeacherStudents = async () => {
    return await apiFetch("/teacher/students");
};

// Classes
export const getTeacherClasses = async () => {
    return await apiFetch("/teacher/classes");
};

// Subjects
export const getTeacherSubjects = async () => {
    return await apiFetch("/teacher/subjects");
};

// Scores
export const getTeacherScores = async () => {
    return await apiFetch("/teacher/scores");
};

export const createTeacherScore = async (data) => {
    return await apiFetch("/teacher/scores", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

// Attendance
export const getTeacherAttendance = async () => {
    return await apiFetch("/teacher/attendance");
};

export const createTeacherAttendance = async (data) => {
    return await apiFetch("/teacher/attendance", {
        method: "POST",
        body: JSON.stringify(data),
    });
};