const AUTH_KEY = "sacgs_auth";

export const storeAuth = (payload) => {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(payload));
};

export const getStoredAuth = () => {
  const raw = sessionStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearStoredAuth = () => {
  sessionStorage.removeItem(AUTH_KEY);
};
