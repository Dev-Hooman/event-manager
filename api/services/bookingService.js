import apiClient from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const createBooking = async (data, token) => {
  const response = await apiClient.post(API_ENDPOINTS.CREATE_BOOKING, data, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

export const getAllBookings = async (token) => {
  const response = await apiClient.get(API_ENDPOINTS.ALL_BOOKINGS, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

export const getUserBookings = async (token) => {
  const response = await apiClient.get(API_ENDPOINTS.USER_BOOKINGS, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

export const cancelBooking = async (bookingId, token) => {
  const response = await apiClient.delete(
    `${API_ENDPOINTS.CANCEL_BOOKING}/${bookingId}`,
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response.data;
};

export const updateBookingStatus = async (bookingId, data, token) => {
  const response = await apiClient.patch(
    `${API_ENDPOINTS.UPDATE_BOOKING_STATUS}/${bookingId}`,
    data,
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response.data;
};
