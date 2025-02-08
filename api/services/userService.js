import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const getAllUsers = async (token) => {
  const response = await apiClient.get(API_ENDPOINTS.ALL_USERS, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

export const getSingleUser = async (userId) => {
  const response = await apiClient.get(`${API_ENDPOINTS.SINGLE_USER}/${userId}`);
  return response.data;
};

export const removeUser = async (id, token) => {
  const response = await apiClient.delete(`${API_ENDPOINTS.REMOVE_USER}/${id}`, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

export const updateUser = async (data, token) => {
  const response = await apiClient.patch(API_ENDPOINTS.UPDATE_USER, data, {
    headers: { Authorization: `${token}`, "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProfile = async (data, token) => {
  const response = await apiClient.patch(API_ENDPOINTS.UPDATE_PROFILE, data, {
    headers: { Authorization: `${token}`, "Content-Type": "multipart/form-data" },
  });
  return response.data;
};



