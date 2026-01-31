"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  nativeLanguage: string
  learningLanguage: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore auth state on refresh
  useEffect(() => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null

    if (!token) {
      setLoading(false)
      return 
    }

    // OPTIONAL: Replace this with `/auth/me` API call later
    // For now we only trust signup/login to set the user
    setLoading(false)
  }, [])

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken")
      window.location.href = "/signin"
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
