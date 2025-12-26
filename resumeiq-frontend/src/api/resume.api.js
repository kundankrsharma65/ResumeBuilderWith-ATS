import api from "./axios";

/**
 * Upload resume for ATS + AI analysis
 * POST /api/resume/upload
 */
export const uploadResumeApi = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  // ✅ Let Axios set multipart headers automatically
  return api.post("/api/resume/upload", formData);
};

/**
 * Create resume using AI
 * POST /api/resume/create
 */
export const createResumeApi = (data) => {
  return api.post("/api/resume/create", data);
};

/**
 * Improve existing resume using AI
 * POST /api/resume/{id}/improve
 */
export const improveResumeApi = (id) => {
  return api.post(`/api/resume/${id}/improve`);
};

/**
 * Get resume history of logged-in user
 * GET /api/resume/history
 */
export const getResumeHistoryApi = () => {
  return api.get("/api/resume/history");
};
