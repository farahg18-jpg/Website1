import { type FormEvent, type ReactNode } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/me"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading…</p>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function HomePage() {
  const { user, logout, loginAsRole, loading } = useAuth()

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>Haul</h1>

      {user ? (
        <>
          <p>
            Signed in as <strong>{user.email}</strong> ({user.role})
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <Link to="/me">Account</Link>
            <button type="button" onClick={logout} disabled={loading}>
              Log out
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <Link to="/login">Go to login</Link>
            <button
              type="button"
              onClick={() => loginAsRole('customer')}
              disabled={loading}
            >
              Quick login (customer)
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function LoginPage() {
  const { user, login, register, loginAsRole, loading } = useAuth()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    const submitter = (e.nativeEvent as SubmitEvent | undefined)?.submitter
    const intent =
      submitter instanceof HTMLButtonElement ? submitter.value : 'login'

    if (intent === 'login') {
      await login({ email, password })
    } else {
      await register({ email, password })
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>Login</h1>

      {user ? (
        <>
          <p>
            Already signed in as <strong>{user.email}</strong> ({user.role}).
          </p>
          <Link to="/">Go home</Link>
        </>
      ) : null}

      <form style={{ display: 'grid', gap: 8 }} onSubmit={onSubmit}>
        <label style={{ display: 'grid', gap: 4, textAlign: 'left' }}>
          Email
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label style={{ display: 'grid', gap: 4, textAlign: 'left' }}>
          Password
          <input name="password" type="password" placeholder="••••••••" required />
        </label>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button type="submit" name="intent" value="login" disabled={loading}>
            Log in
          </button>
          <button type="submit" name="intent" value="register" disabled={loading}>
            Register
          </button>
          <Link to="/">Cancel</Link>
        </div>
      </form>

      <div style={{ display: 'grid', gap: 8 }}>
        <p style={{ margin: 0 }}>Quick login as:</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button type="button" disabled={loading} onClick={() => loginAsRole('customer')}>
            Customer
          </button>
          <button type="button" disabled={loading} onClick={() => loginAsRole('driver')}>
            Driver
          </button>
          <button type="button" disabled={loading} onClick={() => loginAsRole('admin')}>
            Admin
          </button>
        </div>
      </div>
    </div>
  )
}

function AccountPage() {
  const { user, logout, loading } = useAuth()

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>Account</h1>
      <p>
        Email: <strong>{user?.email}</strong>
      </p>
      <p>
        Role: <strong>{user?.role}</strong>
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <Link to="/">Home</Link>
        <button type="button" onClick={logout} disabled={loading}>
          Log out
        </button>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>Not found</h1>
      <Link to="/">Go home</Link>
    </div>
  )
}

