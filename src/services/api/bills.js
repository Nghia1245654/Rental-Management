// src/services/api/endpoints.js
import apiInstance from "./index";

// POST: Tương tự
export const getDataBills = async (userData) => {
  const response = await apiInstance.get("/bills", userData);
  return response;
};
export const createBills  = async (data) => {
  const response = await apiInstance.post("/bills", data);
  return response;
};
export const updateBills  = async (id, data) => {
  const response = await apiInstance.put(`/bills?id=${id}`, data);
  return response;
};
export const deleteBills  = async (id) => {
  const response = await apiInstance.delete(`/bills?id=${id}`);
  return response;
};