import type { ReactNode } from 'react'
import {
  BrandMark,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
} from '@medix/ui'
import { LayoutDashboard, Users } from 'lucide-react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { NavLink, Outlet, useLocation } from 'react-router'
import { logError } from '../lib/logger'

const navLinks: {
  to: string
  label: string
  icon: typeof LayoutDashboard
  end?: boolean
}[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/patients', label: 'Patients', icon: Users },
]

export function Layout() {
  const location = useLocation()
  const section = location.pathname.startsWith('/patients')
    ? 'patients'
    : 'dashboard'

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-sidebar flex-col shrink-0">
        <div className="border-b p-4">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 text-left text-foreground transition-colors hover:text-foreground/80"
            aria-label="Go to dashboard"
          >
            <BrandMark productName="Arena" size="lg" />
          </NavLink>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavButton key={to} to={to} end={end}>
              <Icon className="h-4 w-4" />
              {label}
            </NavButton>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 h-14">
            <NavLink
              to="/"
              className="flex items-center gap-2.5 text-left text-foreground transition-colors hover:text-foreground/80"
              aria-label="Go to dashboard"
            >
              <BrandMark productName="Arena" size="sm" />
            </NavLink>
            <nav className="flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon, end }) => (
                <NavButton key={to} to={to} end={end} compact>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </NavButton>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <ErrorBoundary
            FallbackComponent={PageErrorFallback}
            onError={(error, info) => {
              logError(error, `Page content failed to render on ${section}`)
              logError(info.componentStack, `Component stack for ${section}`)
            }}
            resetKeys={[section]}
          >
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

function PageErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>We couldn&apos;t load this page</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Something on this screen failed, but the rest of Arena is still
          available. Try loading the page again or use the navigation to move
          somewhere else.
        </p>
        <div>
          <Button type="button" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function NavButton({
  to,
  end,
  compact,
  children,
}: {
  to: string
  end?: boolean
  compact?: boolean
  children: ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center rounded-md font-medium transition-colors',
          compact ? 'gap-1.5 px-2.5 py-1.5 text-sm' : 'gap-2 px-3 py-2 text-sm',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        )
      }
    >
      {children}
    </NavLink>
  )
}
