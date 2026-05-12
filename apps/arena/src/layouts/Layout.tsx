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
import { logError } from '../lib/logger'

type Page = 'dashboard' | 'patients'

type LayoutProps = {
  page: Page
  onNavigate: (page: Page) => void
  onGoHome: () => void
  children: ReactNode
}

const navLinks: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
]

export function Layout({ page, onNavigate, onGoHome, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-sidebar flex-col shrink-0">
        <div className="border-b p-4">
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-2.5 text-left text-foreground transition-colors hover:text-foreground/80"
            aria-label="Go to dashboard"
          >
            <BrandMark productName="Arena" size="lg" />
          </button>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {navLinks.map(({ id, label, icon: Icon }) => (
            <NavButton
              key={id}
              active={page === id}
              onClick={() => onNavigate(id)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavButton>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              type="button"
              onClick={onGoHome}
              className="flex items-center gap-2.5 text-left text-foreground transition-colors hover:text-foreground/80"
              aria-label="Go to dashboard"
            >
              <BrandMark productName="Arena" size="sm" />
            </button>
            <nav className="flex items-center gap-1">
              {navLinks.map(({ id, label, icon: Icon }) => (
                <NavButton
                  key={id}
                  compact
                  active={page === id}
                  onClick={() => onNavigate(id)}
                >
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
              logError(error, `Page content failed to render on ${page}`)
              logError(info.componentStack, `Component stack for ${page}`)
            }}
            resetKeys={[page]}
          >
            {children}
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
  active,
  compact,
  onClick,
  children,
}: {
  active: boolean
  compact?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center rounded-md font-medium transition-colors',
        compact ? 'gap-1.5 px-2.5 py-1.5 text-sm' : 'gap-2 px-3 py-2 text-sm',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      )}
    >
      {children}
    </button>
  )
}
