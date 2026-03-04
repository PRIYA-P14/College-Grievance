import api from "./api.js";

const mockAuth = (email, roleOverride) => {
  const role = roleOverride || (email.toLowerCase().includes("admin") ? "admin" : "student");
  return {
    token: "mock-jwt-token",
    user: {
      id: "user-1",
      name: "Campus User",
      email,
      role
    }
  };
};

const shouldUseMocks = () => import.meta.env.VITE_USE_MOCKS !== "false";

export const login = async (payload) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (error) {
    if (shouldUseMocks()) {
      return mockAuth(payload.email, payload.role);
    }
    throw error;
  }
};

export const register = async (payload) => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error) {
    if (shouldUseMocks()) {
      return mockAuth(payload.email, payload.role);
    }
    throw error;
  }
};
