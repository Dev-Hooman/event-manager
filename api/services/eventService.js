import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const createEvent = async (data, token) => {
  const response = await apiClient.post(API_ENDPOINTS.CREATE_EVENT, data, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getEvents = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ALL_EVENTS);
  return response.data;
};

export const getUsersEvents = async (token) => {
  const response = await apiClient.get(API_ENDPOINTS.ALL_EVENTS, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getSingleEvent = async (id) => {
  const response = await apiClient.get(`${API_ENDPOINTS.SINGLE_EVENT}/${id}`);
  return response.data;
};

export const updateEvent = async (id, data, token) => {
  const response = await apiClient.patch(
    `${API_ENDPOINTS.UPDATE_EVENT}/${id}`,
    data,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteEvent = async (id, token) => {
  const response = await apiClient.delete(
    `${API_ENDPOINTS.DELETE_EVENT}/${id}`,
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response.data;
};
