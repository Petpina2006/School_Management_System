import { apiFetch } from "../api";

export const getSuperAdminDashboard = () => apiFetch("/super-admin/dashboard");
// Get Super Admin Profile
export const getSuperAdminProfile = async () => {
    return await apiFetch("/super-admin/profile");
};

// Update Super Admin Profile
export const updateSuperAdminProfile = async (data) => {
    return await apiFetch("/super-admin/profile", {
        method: "PUT",
        body: JSON.stringify(data),
    });
};
// export {
//   getUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
// } from "./userApi";
// export const getStudents = () => apiFetch("/students");
// export const getTeachers = () => apiFetch("/teachers");
// export const getClasses = () => apiFetch("/classes");
// export const getSubjects = () => apiFetch("/subjects");
// export const getEnrollments = () => apiFetch("/enrollments");
// export const getScores = () => apiFetch("/scores");
// export const getAttendance = () => apiFetch("/attendance");
