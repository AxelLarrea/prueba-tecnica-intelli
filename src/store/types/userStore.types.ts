import type { AuthData } from "../../services/types/authService.types";

export interface UserStore {
  userData: AuthData | null;
  isLoading: boolean;
  
  login: (email: string, password: string) => Promise<AuthData>;
}