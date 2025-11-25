// src/services/api/tenants.js
import apiInstance from "./index";

// GET: Lấy danh sách tất cả người thuê
export const getDataTenants = async () => {
  const response = await apiInstance.get("/tenants");
  return response;
};

export const createTenant = async (userData) => {
  const response = await apiInstance.post("/tenants", userData);
  return response;
};

export const updateTenant = async (tenantId, data) => {
  const response = await apiInstance.put(`/tenants/${tenantId}`, data);
  return response;
};

export const deleteTenant = async (tenantId) => {
  const response = await apiInstance.delete(`/tenants?id=${tenantId}`);
  return response;
};