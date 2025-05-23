
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authenticateUser, createUser } from '@/utils/userStorage';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: 'guest' | 'host';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'guest' | 'host') => Promise<void>;
  signup: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: 'guest' | 'host';
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('stayease_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string, userType: 'guest' | 'host') => {
    try {
      const authenticatedUser = await authenticateUser(email, password);
      
      // Verify user type matches
      if (authenticatedUser.type !== userType) {
        throw new Error(`This account is registered as a ${authenticatedUser.type}, not a ${userType}`);
      }
      
      const userSession = {
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        firstName: authenticatedUser.firstName,
        lastName: authenticatedUser.lastName,
        type: authenticatedUser.type,
        avatar: authenticatedUser.avatar || `https://images.unsplash.com/photo-1494790108755-2616b612b1c2?w=100&h=100&fit=crop&crop=face`
      };
      
      setUser(userSession);
      localStorage.setItem('stayease_user', JSON.stringify(userSession));
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: 'guest' | 'host';
  }) => {
    try {
      const newUser = await createUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        type: userData.userType,
        avatar: `https://images.unsplash.com/photo-1494790108755-2616b612b1c2?w=100&h=100&fit=crop&crop=face`
      });
      
      const userSession = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        type: newUser.type,
        avatar: newUser.avatar
      };
      
      setUser(userSession);
      localStorage.setItem('stayease_user', JSON.stringify(userSession));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stayease_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
