import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types/auth';
import { 
  TEMP_USER, 
  TEMP_CREDENTIALS, 
  AUTH_STORAGE_KEY, 
  LOGIN_SIMULATION_DELAY 
} from '../constants/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that manages authentication state and operations
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Validates login credentials
   */
  const validateCredentials = (username: string, password: string): boolean => {
    if (!username?.trim() || !password?.trim()) {
      setError('Username and password are required');
      return false;
    }
    return true;
  };

  /**
   * Safely stores user data in localStorage
   */
  const saveUserToStorage = useCallback((userData: User): void => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data to localStorage:', error);
    }
  }, []);

  /**
   * Safely retrieves user data from localStorage
   */
  const getUserFromStorage = useCallback((): User | null => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to retrieve user data from localStorage:', error);
      return null;
    }
  }, []);

  /**
   * Authenticates user with provided credentials
   */
  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    if (!validateCredentials(username, password)) {
      setIsLoading(false);
      return false;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, LOGIN_SIMULATION_DELAY));
      
      if (username === TEMP_CREDENTIALS.username && password === TEMP_CREDENTIALS.password) {
        setUser(TEMP_USER);
        saveUserToStorage(TEMP_USER);
        return true;
      } else {
        setError('Invalid username or password');
        return false;
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [saveUserToStorage]);

  /**
   * Logs out the current user and clears stored data
   */
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove user data from localStorage:', error);
    }
  }, []);

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = getUserFromStorage();
    if (savedUser) {
      setUser(savedUser);
    }
  }, [getUserFromStorage]);

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};