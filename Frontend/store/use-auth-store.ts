import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Auth {
  email: string;
  token: string;
  id: string;
  firstName: string;
  lastName: string;
  nativeLanguage: string;
  learningLanguage: string;
  isLoggedIn: boolean;
}

const initialAuth: Auth = {
  email: "",
  token: "",
  id: "",
  firstName: "",
  lastName: "",
  nativeLanguage: "",
  learningLanguage: "",
  isLoggedIn: false,
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
