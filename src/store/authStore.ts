import { create } from 'zustand';
import type { User } from '../types';
import { loginWithEmail, registerWithEmail, logout as firebaseLogout } from '../services/auth/auth.service';
import { getAuthErrorMessage } from '../services/auth/errors';
import type { AuthUser } from '../services/auth/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    try {
      const user = await loginWithEmail(email, password);
      set({ user, isAuthenticated: true });
    } catch (error) {
      const message = getAuthErrorMessage(error);
      throw new Error(message);
    }
  },

  register: async (data) => {
    try {
      const user = await registerWithEmail(data.email, data.password!, data);
      set({ user, isAuthenticated: true });
    } catch (error) {
      const message = getAuthErrorMessage(error);
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      await firebaseLogout();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  updateProfile: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data, updatedAt: new Date() } : null,
    }));
  },
}));