import { create } from "zustand";
import type { UserStore } from "./types/userStore.types";
import authService from "../services/authService";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(
  // Persist para que los datos se guarden en el localStorage y no tener que logear de nuevo para obtener nombre en el Header
  persist((set) => ({
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
        return response;
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  {
    name: "user-storage",
  }
  ))