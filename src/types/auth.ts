/**
 * Authentication-related type definitions
 */

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error?: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthError {
  message: string;
  code?: string;
}