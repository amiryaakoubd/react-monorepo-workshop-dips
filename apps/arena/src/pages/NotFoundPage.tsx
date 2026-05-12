export function NotFoundPage() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        The page you requested does not exist.
      </p>
    </div>
  )
}
