// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin, register as apiRegister } from '../service/userAPI';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    if (response.status === 200) {
      setUser({email, password});
      return true;
    }
    return false;
  };

  const register = async (email, username, password) => {
    const response = await apiRegister(email, username, password);
    if (response) {
      setUser(response);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
