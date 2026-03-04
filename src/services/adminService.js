import api from "./api.js";
import { mockComplaints } from "../utils/mockData.js";

const shouldUseMocks = () => import.meta.env.VITE_USE_MOCKS !== "false";

export const fetchAllComplaints = async (filters = {}) => {
  try {
    const { data } = await api.get("/admin/grievances", { params: filters });
    return data;
  } catch (error) {
    if (shouldUseMocks()) {
      return mockComplaints;
    }
    throw error;
  }
};

export const updateComplaintStatus = async (id, payload) => {
  try {
    const { data } = await api.patch(`/admin/grievances/${id}`, payload);
    return data;
  } catch (error) {
    if (shouldUseMocks()) {
      return { id, ...payload };
    }
    throw error;
  }
};

export const suspendStudent = async (studentId) => {
  try {
    const { data } = await api.post(`/admin/students/${studentId}/suspend`);
    return data;
  } catch (error) {
    if (shouldUseMocks()) {
      return { id: studentId, status: "suspended" };
    }
    throw error;
  }
};
