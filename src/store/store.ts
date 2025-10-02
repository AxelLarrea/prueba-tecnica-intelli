import { create } from "zustand";
import authService from "../services/authService";
import type { UserStore } from "./types/store.types";

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  isLoading: false,

  // Actions
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token);
      set({ userData: response });
    } finally {
      set({ isLoading: false });
    }
  },
}));