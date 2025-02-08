import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const register = async (data, role) => {
  const response = await apiClient.post(`${API_ENDPOINTS.REGISTER}?role=${role}`, data);
  return response.data;
};

export const forgetPassword = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.FORGET_PASSWORD, data);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.VERIFY_OTP, data);
  return response.data;
};

export const setPassword = async (data, token) => {
  const response = await apiClient.post(
    API_ENDPOINTS.SET_PASSWORD + `/${token}`,
    data
  );
  return response.data;
};

export const changePassword = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.CHANGE_PASSWORD, data);
  return response.data;
};


