import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<void> => {
    // Mock login - in a real app, this would make an API call
    const user = mockUsers.find(u => u.username === username);
    if (user) {
      setCurrentUser(user);
      return Promise.resolve();
    } else {
      return Promise.reject('Invalid credentials');
    }
  };

  const register = async (username: string, password: string): Promise<void> => {
    // Mock registration - in a real app, this would make an API call
    const userExists = mockUsers.some(u => u.username === username);
    if (userExists) {
      return Promise.reject('Username already exists');
    } else {
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        username,
        createdAt: new Date(),
      };
      mockUsers.push(newUser);
      setCurrentUser(newUser);
      return Promise.resolve();
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};