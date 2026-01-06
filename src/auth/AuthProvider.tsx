import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './AuthContext'
import type { Role, User } from './types'

const STORAGE_KEY = 'haul.auth.user'

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

function writeStoredUser(user: User | null) {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser())
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (args: { email: string; password: string }) => {
    const { email } = args
    setLoading(true)
    try {
      await delay(200)
      const next: User = { email, role: 'customer' }
      setUser(next)
      writeStoredUser(next)
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (args: { email: string; password: string }) => {
    const { email } = args
    setLoading(true)
    try {
      await delay(200)
      const next: User = { email, role: 'customer' }
      setUser(next)
      writeStoredUser(next)
    } finally {
      setLoading(false)
    }
  }, [])

  const loginAsRole = useCallback(async (role: Role) => {
    setLoading(true)
    try {
      await delay(100)
      const next: User = { email: `${role}@example.com`, role }
      setUser(next)
      writeStoredUser(next)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    writeStoredUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, loginAsRole, logout }),
    [user, loading, login, register, loginAsRole, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

