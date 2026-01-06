import {
  createContext,
} from 'react'
import type { Role, User } from './types'

export type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (args: { email: string; password: string }) => Promise<void>
  register: (args: { email: string; password: string }) => Promise<void>
  loginAsRole: (role: Role) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
)

