import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getStoredAuth, clearStoredAuth, storeAuth } from "../utils/storage.js";
import { setAuthToken } from "../services/api.js";
import * as authService from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored?.token) {
      setToken(stored.token);
      setUser(stored.user);
      setAuthToken(stored.token);
    }
    setLoading(false);
  }, []);

  const login = async (payload) => {
    const response = await authService.login(payload);
    setToken(response.token);
    setUser(response.user);
    setAuthToken(response.token);
    storeAuth(response);
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    setToken(response.token);
    setUser(response.user);
    setAuthToken(response.token);
    storeAuth(response);
  };

  const logout = () => {
    clearStoredAuth();
    setToken("");
    setUser(null);
    setAuthToken("");
  };

  const value = useMemo(
    () => ({ token, user, loading, login, register, logout }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
