import api from "./axios";

/**
 * LOGIN
 * POST /api/auth/login
 */
export const loginApi = (data) => {
  return api.post("/api/auth/login", data);
};

/**
 * REGISTER
 * POST /api/auth/register
 */
export const registerApi = (data) => {
  return api.post("/api/auth/register", data);
};

/**
 * VERIFY EMAIL OTP
 * POST /api/auth/verify-email
 */
export const verifyOtpApi = (data) => {
  return api.post("/api/auth/verify-email", data);
};

/**
 * FORGOT PASSWORD - SEND OTP
 * POST /api/auth/forgot-password?email=
 */
export const forgotPasswordApi = (email) => {
  return api.post(
    `/api/auth/forgot-password?email=${encodeURIComponent(email)}`
  );
};

/**
 * RESET PASSWORD WITH OTP
 * POST /api/auth/reset-password
 */
export const resetPasswordApi = (data) => {
  return api.post("/api/auth/reset-password", data);
};
