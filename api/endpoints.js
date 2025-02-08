export const API_ENDPOINTS = {
  //Auth
  REGISTER: "/api/v1/auth/register-user",
  FORGET_PASSWORD: "/api/v1/auth/forget-password",
  SET_PASSWORD: "/api/v1/auth/set-password",
  VERIFY_OTP: "/api/v1/auth/verify-otp",
  CHANGE_PASSWORD: "/api/v1/auth/change-password",
  UPDATE_PROFILE: "/api/v1/user/update-profile",

  //Events
  CREATE_EVENT: "/api/v1/event/create-event",
  ALL_EVENTS: "/api/v1/event/all-events",
  USER_EVENTS: "/api/v1/event/all-user-events",
  SINGLE_EVENT: "/api/v1/event/single-event",
  UPDATE_EVENT: "/api/v1/event/update-event",
  DELETE_EVENT: "/api/v1/event/delete-event",

  //User
  ALL_USERS: "/api/v1/user/all-users",
  SINGLE_USER: "/api/v1/user/single-user",
  REMOVE_USER: "/api/v1/user/remove-user",
  UPDATE_USER: "/api/v1/user/update-profile",
  UPDATE_USER: "/api/v1/user/update-user",

  //Bookings
  CREATE_BOOKING: "/api/v1/booking/create-booking",
  ALL_BOOKINGS: "/api/v1/booking/all-bookings",
  USER_BOOKINGS: "/api/v1/booking/my-bookings",
  CANCEL_BOOKING: "/api/v1/booking/cancel-booking",
  UPDATE_BOOKING_STATUS: "/api/v1/booking/update-booking-status",
};
