import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  

  const [userId, setUserId] = useState(null); // ✅ Store userId

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get('http://localhost:8081/auth/me', { withCredentials: true });
        setIsLoggedIn(true);
        setRole(res.data.role);
        setUserId(res.data.id); 
      } catch (err) {
        setIsLoggedIn(false);
        setRole(null);
        setUserId(null);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    try {
      const res = await axios.get('http://localhost:8081/auth/me', { withCredentials: true });
      setIsLoggedIn(true);
      setRole(res.data.role);
      setUserId(res.data.id);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8081/auth/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setRole(null);
      setUserId(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
