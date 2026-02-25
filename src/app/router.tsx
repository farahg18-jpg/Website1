import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from '../features/auth/RequireAuth'
import { AppLayout } from '../layouts/AppLayout'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { BookingPage } from '../pages/BookingPage'
import { DashboardPage } from '../pages/DashboardPage'
import { TransportsPage } from '../pages/TransportsPage'
import { TransportDetailPage } from '../pages/TransportDetailPage'
import { SettingsPage } from '../pages/SettingsPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registreren',
    element: <RegisterPage />,
  },
  {
    path: '/boeken',
    element: <BookingPage />,
  },
  {
    path: '/app',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'transporten', element: <TransportsPage /> },
      { path: 'transporten/:id', element: <TransportDetailPage /> },
      { path: 'shipments', element: <TransportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
