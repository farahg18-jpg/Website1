import { createContext, useContext } from 'react'

export type User = {
  email: string
}

export type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AUTH_STORAGE_KEY = 'haul.auth.user'

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'email' in parsed &&
      typeof (parsed as { email: unknown }).email === 'string'
    ) {
      return { email: (parsed as { email: string }).email }
    }
    return null
  } catch {
    return null
  }
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

