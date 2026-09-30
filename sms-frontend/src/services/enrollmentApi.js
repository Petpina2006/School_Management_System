import { apiFetch } from "./api";

// GET ALL ENROLLMENTS
export const getEnrollments = async (page = 1) => {
  return await apiFetch(`/super-admin/enrollments?page=${page}`, {
    method: "GET",
  });
};

// GET ONE ENROLLMENT
export const getEnrollment = async (id) => {
  return await apiFetch(`/super-admin/enrollments/${id}`, {
    method: "GET",
  });
};

// CREATE ENROLLMENT
export const createEnrollment = async (data) => {
  return await apiFetch("/super-admin/enrollments", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// UPDATE ENROLLMENT
export const updateEnrollment = async (id, data) => {
  return await apiFetch(`/super-admin/enrollments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// DELETE ENROLLMENT
export const deleteEnrollment = async (id) => {
  return await apiFetch(`/super-admin/enrollments/${id}`, {
    method: "DELETE",
  });
};
