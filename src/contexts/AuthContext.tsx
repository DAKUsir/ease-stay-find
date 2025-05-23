
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    // Simulate API call
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      firstName: email.split('@')[0],
      lastName: 'User',
      type: userType,
      avatar: `https://images.unsplash.com/photo-1494790108755-2616b612b1c2?w=100&h=100&fit=crop&crop=face`
    };
    
    setUser(mockUser);
    localStorage.setItem('stayease_user', JSON.stringify(mockUser));
  };

  const signup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: 'guest' | 'host';
  }) => {
    // Simulate API call
    const mockUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      type: userData.userType,
      avatar: `https://images.unsplash.com/photo-1494790108755-2616b612b1c2?w=100&h=100&fit=crop&crop=face`
    };
    
    setUser(mockUser);
    localStorage.setItem('stayease_user', JSON.stringify(mockUser));
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
