import { lazy, Suspense } from 'react'
import { Spinner } from '@medix/ui'
import { Route, Routes } from 'react-router'
import { Layout } from './layouts/Layout'

const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
)

const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
)

const PatientDetailPage = lazy(() =>
  import('./pages/PatientDetailPage').then((module) => ({
    default: module.PatientDetailPage,
  })),
)

const PatientsPage = lazy(() =>
  import('./pages/PatientsPage').then((module) => ({
    default: module.PatientsPage,
  })),
)

export function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
