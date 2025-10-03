import { create } from "zustand";
import type { UserStore } from "./types/userStore.types";
import authService from "../services/authService";

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  isLoading: false,

  // Actions
  // TODO: agregar un timer para expiración de token
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