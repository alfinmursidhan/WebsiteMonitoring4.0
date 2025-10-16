/**
 * Temporary authentication constants for development
 * TODO: Replace with actual authentication service integration
 */

import type { User, LoginCredentials } from '../types/auth';

export const TEMP_USER: User = {
  id: '1',
  username: 'admin',
  email: 'admin@monitoring.com',
  fullName: 'Administrator',
};

export const TEMP_CREDENTIALS: LoginCredentials = {
  username: 'admin',
  password: 'password123',
};

export const AUTH_STORAGE_KEY = 'auth_user';
export const LOGIN_SIMULATION_DELAY = 1000;