import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AuthSession {
  email: string;
  token: string;
  id?: string | null;
  firstName?: string;
  lastName?: string;
  nativeLanguage?: string;
  learningLanguage?: string;
  isEmailVerified?: boolean | null;
  createdAt?: string | null;
}

export type UserProfile = Omit<AuthSession, "token">;

const initialAuth: AuthSession = {
  email: "",
  token: "",
};

interface AuthState {
  auth: AuthSession;
  setAuth: (auth: AuthSession, ttlInms?: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: initialAuth,
        setAuth: (auth: AuthSession) => set({ auth }),
        clearAuth: () =>
          set({
            auth: initialAuth,
          }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({ auth: state.auth }),
      },
    ),
  ),
);
