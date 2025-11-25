// src/services/api/rooms.js
import apiInstance from "./index";

// GET: Lấy danh sách tất cả phòng
export const getDataRooms = async () => {
  const response = await apiInstance.get("/rooms");
  return response;
};

export const createRoom = async (roomData) => {
  const response = await apiInstance.post("/rooms", roomData);
  return response;
};

export const updateRoom = async (roomId, roomData) => {
  const response = await apiInstance.put(`/rooms?id=${roomId}`, roomData);
  return response;
};

export const deleteRoom = async (roomId) => {
  const response = await apiInstance.delete(`/rooms?id=${roomId}`);
  return response;
};