import { apiFetch } from "./api";

// GET ALL SUBJECTS
export const getSubjects = async (page = 1) => {
  return await apiFetch(`/super-admin/subjects?page=${page}`, {
    method: "GET",
  });
};

// GET ONE SUBJECT
export const getSubject = async (id) => {
  return await apiFetch(`/super-admin/subjects/${id}`, {
    method: "GET",
  });
};

// CREATE SUBJECT
export const createSubject = async (data) => {
  return await apiFetch("/super-admin/subjects", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// UPDATE SUBJECT
export const updateSubject = async (id, data) => {
  return await apiFetch(`/super-admin/subjects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// DELETE SUBJECT
export const deleteSubject = async (id) => {
  return await apiFetch(`/super-admin/subjects/${id}`, {
    method: "DELETE",
  });
};
