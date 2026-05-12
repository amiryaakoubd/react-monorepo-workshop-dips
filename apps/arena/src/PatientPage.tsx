import { useEffect, useState } from 'react'
import { Spinner } from '@medix/ui'
import { useSearchParams } from 'react-router'
import { PatientSelectionView } from './features/patients/PatientSelectionView'
import { PatientWorkspace } from './features/patients/PatientWorkspace'
import { fetchPatients } from './lib/api'
import type { Patient } from './types'

type PatientPageProps = {
  selectedId?: string
}

export function PatientPage({ selectedId }: PatientPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(true)

  const search = searchParams.get('search') ?? ''
  const genderParam = searchParams.get('gender')
  const genderFilter: 'all' | 'male' | 'female' =
    genderParam === 'male' || genderParam === 'female' ? genderParam : 'all'

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
    return <PatientWorkspace patient={selectedPatient} />
  }

  function handleSearchChange(value: string) {
    const nextParams = new URLSearchParams(searchParams)
    const normalizedValue = value.trim()

    if (normalizedValue) {
      nextParams.set('search', normalizedValue)
    } else {
      nextParams.delete('search')
    }

    setSearchParams(nextParams)
  }

  function handleGenderFilterChange(value: 'all' | 'male' | 'female') {
    const nextParams = new URLSearchParams(searchParams)

    if (value === 'all') {
      nextParams.delete('gender')
    } else {
      nextParams.set('gender', value)
    }

    setSearchParams(nextParams)
  }

  return (
    <PatientSelectionView
      patients={patients}
      filteredPatients={filteredPatients}
      search={search}
      genderFilter={genderFilter}
      onSearchChange={handleSearchChange}
      onGenderFilterChange={handleGenderFilterChange}
    />
  )
}
