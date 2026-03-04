import api from "./api.js";
import { mockComplaints } from "../utils/mockData.js";

export const submitGrievance = async (payload) => {
  try {
    const { data } = await api.post("/grievances", payload);
    return data;
  } catch (error) {
    if (import.meta.env.VITE_USE_MOCKS === "true") {
      return { id: `mock-${Date.now()}`, ...payload };
    }
    throw error;
  }
};

export const fetchMyComplaints = async () => {
  try {
    const { data } = await api.get("/grievances/my");
    return data;
  } catch (error) {
    if (import.meta.env.VITE_USE_MOCKS === "true") {
      return mockComplaints;
    }
    throw error;
  }
};

export const rateComplaint = async (id, rating) => {
  try {
    const { data } = await api.post(`/grievances/${id}/rating`, { rating });
    return data;
  } catch (error) {
    if (import.meta.env.VITE_USE_MOCKS === "true") {
      return { id, rating };
    }
    throw error;
  }
};
