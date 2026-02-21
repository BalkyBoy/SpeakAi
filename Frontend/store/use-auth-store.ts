import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Auth {
  email: string;
  token: string;
  id?: string | null;
  firstName?: string;
  lastName?: string;
  nativeLanguage?: string;
  learningLanguage?: string;
  isEmailVerified?: boolean | null;
  createdAt?: string | null
}

const initialAuth: Auth = {
  email: "",
  token: "",
};

interface AuthState {
  auth: Auth;
  setAuth: (auth: Auth, ttlInms?: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: initialAuth,
        setAuth: (auth: Auth) => set({ auth }),
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
