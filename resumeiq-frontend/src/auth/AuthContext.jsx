import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Run once on app load
  useEffect(() => {
    const token = getToken();
    setIsAuth(!!token);
    setLoading(false);
  }, []);

  // ✅ Login must fully sync auth state
  const login = (token) => {
    setLoading(true);
    setToken(token);
    setIsAuth(true);
    setLoading(false);
  };

  const logout = () => {
    removeToken();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
