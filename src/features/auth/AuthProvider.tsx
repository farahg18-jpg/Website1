import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  AUTH_STORAGE_KEY,
  AuthContext,
  type AuthContextValue,
  type User,
  readStoredUser,
} from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser())

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      isAuthenticated: user !== null,
      login: async (email: string, password: string) => {
        const trimmedEmail = email.trim()
        const trimmedPassword = password.trim()
        if (!trimmedEmail || !trimmedPassword) {
          throw new Error('Email and password are required.')
        }
        const nextUser: User = { email: trimmedEmail }
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
        setUser(nextUser)
      },
      logout: () => {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        setUser(null)
      },
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

