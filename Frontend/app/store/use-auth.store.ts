'use client'

import { create } from 'zustand'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  nativeLanguage: string
  learningLanguage: string
}

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  setUser: (user) => set({ user }),

  logout: () => {
    set({ user: null })

    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      window.location.href = '/signin'
    }
  },
}))
