import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/api";

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return true; // success flag
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      throw error; // propagate to UI
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return true;
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Yeh custom hook add karo
export const useAuth = () => {
  return useContext(AuthContext);
};
