
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authenticateUser, createUser, updateUserData } from '@/utils/userStorage';
import { toast } from "sonner";

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
  updateProfile: (updates: Partial<Omit<User, 'id' | 'email' | 'type'>>) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('stayease_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'guest' | 'host') => {
    setIsLoading(true);
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
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: 'guest' | 'host';
  }) => {
    setIsLoading(true);
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
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Omit<User, 'id' | 'email' | 'type'>>) => {
    if (!user) throw new Error('No user logged in');
    
    setIsLoading(true);
    try {
      const updatedUser = await updateUserData(user.id, updates);
      
      const updatedSession = {
        ...user,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        avatar: updatedUser.avatar
      };
      
      setUser(updatedSession);
      localStorage.setItem('stayease_user', JSON.stringify(updatedSession));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Profile update failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stayease_user');
    toast.success("You've been logged out");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
