import { useEffect, useState } from 'react'
import { Spinner } from '@medix/ui'
import { PatientSelectionView } from './features/patients/PatientSelectionView'
import { PatientWorkspace } from './features/patients/PatientWorkspace'
import { fetchPatients } from './lib/api'
import type { Patient } from './types'

type PatientPageProps = {
  selectedId: string | null
  onSelectPatient: (id: string) => void
  onBack: () => void
}

export function PatientPage({
  selectedId,
  onSelectPatient,
  onBack,
}: PatientPageProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(true)

  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>(
    'all',
  )

  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .finally(() => setIsLoadingPatients(false))
  }, [])

  const selectedPatient = patients.find((patient) => patient.id === selectedId)

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase())
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  if (isLoadingPatients) return <Spinner />

  if (selectedPatient) {
    return <PatientWorkspace patient={selectedPatient} onBack={onBack} />
  }

  return (
    <PatientSelectionView
      patients={patients}
      filteredPatients={filteredPatients}
      search={search}
      genderFilter={genderFilter}
      onSearchChange={setSearch}
      onGenderFilterChange={setGenderFilter}
      onSelectPatient={onSelectPatient}
    />
  )
}
