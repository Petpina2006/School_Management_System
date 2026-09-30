import { apiFetch } from "./api";

// GET ALL CLASSES
export const getClasses = async (page = 1) => {
  return await apiFetch(`/super-admin/classes?page=${page}`, {
    method: "GET",
  });
};

// GET ONE CLASS
export const getClass = async (id) => {
  return await apiFetch(`/super-admin/classes/${id}`, {
    method: "GET",
  });
};

// CREATE CLASS
export const createClass = async (data) => {
  return await apiFetch("/super-admin/classes", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// UPDATE CLASS
export const updateClass = async (id, data) => {
  return await apiFetch(`/super-admin/classes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// DELETE CLASS
export const deleteClass = async (id) => {
  return await apiFetch(`/super-admin/classes/${id}`, {
    method: "DELETE",
  });
};
