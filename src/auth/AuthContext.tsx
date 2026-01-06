import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Role, User } from './types'

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (args: { email: string; password: string }) => Promise<void>
  register: (args: { email: string; password: string }) => Promise<void>
  loginAsRole: (role: Role) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

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
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const stored = readStoredUser()
    setUser(stored)
    setLoading(false)
  }, [])

  async function login(args: { email: string; password: string }) {
    const { email } = args
    setLoading(true)
    await delay(200)
    const next: User = { email, role: 'customer' }
    setUser(next)
    writeStoredUser(next)
    setLoading(false)
  }

  async function register(args: { email: string; password: string }) {
    const { email } = args
    setLoading(true)
    await delay(200)
    const next: User = { email, role: 'customer' }
    setUser(next)
    writeStoredUser(next)
    setLoading(false)
  }

  async function loginAsRole(role: Role) {
    setLoading(true)
    await delay(100)
    const next: User = { email: `${role}@example.com`, role }
    setUser(next)
    writeStoredUser(next)
    setLoading(false)
  }

  function logout() {
    setUser(null)
    writeStoredUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, loginAsRole, logout }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

