import { create } from "zustand";
import authService from "../services/authService";

export const useUserStore = create((set, get) => ({
  userData: null,
  isLoading: false,

  // Actions
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await authService.login(email, password);
      set({ userData: response });
    } finally {
      set({ isLoading: false });
    }
  },
}));