// src/services/api/endpoints.js
import apiInstance from "./index";

// POST: Tương tự
export const getSettings  = async (userData) => {
  const response = await apiInstance.get("/settings", userData);
  return response;
};
export const updateSettings  = async (userData) => {
  const response = await apiInstance.put("/settings", userData);
  return response;
};

export const createSettings  = async (userData) => {
  const response = await apiInstance.post("/settings", userData);
  return response;
}