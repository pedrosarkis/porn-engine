import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../service/userAPI';
import db from '../config/db';
import jscookie from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const storedUser = await db.user.toArray();
        console.log(storedUser);
        if (storedUser.length > 0) {
          setUser(storedUser[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do IndexedDB:", error);
      } finally {
        setIsInitialized(true);
      }
    }

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      if (response.status === 200) {
        const { user: userData } = await response.json();
        setUser(userData);
        await db.user.clear();
        await db.user.add(userData);
        return true;
      }
    } catch (error) {
      console.error("Erro de login:", error);
    }
    return false;
  };

  const register = async (email, username, password) => {
    try {
      const response = await apiRegister(email, username, password);
      if (response) {
        setUser(response);
        await db.user.clear();
        await db.user.add(response);
        return true;
      }
    } catch (error) {
      console.error("Erro de registro:", error);
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    try {
      await db.user.clear();
    } catch (error) {
      console.error("Erro de logout:", error);
    }
  };

  if (!isInitialized) {
    return null; // ou um componente de fallback se preferir
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);