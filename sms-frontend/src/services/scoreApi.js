import { apiFetch } from "./api";

export const getScores = async (page = 1) => {
  return await apiFetch(`/super-admin/scores?page=${page}`, {
    method: "GET",
  });
};

export const getScore = async (id) => {
  return await apiFetch(`/super-admin/scores/${id}`, {
    method: "GET",
  });
};

export const createScore = async (data) => {
  return await apiFetch("/super-admin/scores", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateScore = async (id, data) => {
  return await apiFetch(`/super-admin/scores/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteScore = async (id) => {
  return await apiFetch(`/super-admin/scores/${id}`, {
    method: "DELETE",
  });
};
