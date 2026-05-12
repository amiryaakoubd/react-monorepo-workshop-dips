import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@medix/ui'
import type { Patient } from '../../types'
import { PatientCard } from './PatientCard'

type GenderFilter = 'all' | 'male' | 'female'

type PatientSelectionViewProps = {
  patients: Patient[]
  filteredPatients: Patient[]
  search: string
  genderFilter: GenderFilter
  onSearchChange: (value: string) => void
  onGenderFilterChange: (value: GenderFilter) => void
}

export function PatientSelectionView({
  patients,
  filteredPatients,
  search,
  genderFilter,
  onSearchChange,
  onGenderFilterChange,
}: PatientSelectionViewProps) {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
        <p className="text-sm text-muted-foreground">
          {filteredPatients.length} of {patients.length} patients
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="patient-search">Search patients</Label>
          <Input
            id="patient-search"
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or diagnosis..."
          />
        </div>
        <div className="flex flex-col gap-2 sm:w-40">
          <Label htmlFor="gender-filter">Gender</Label>
          <Select
            value={genderFilter}
            onValueChange={(value) =>
              onGenderFilterChange(value as GenderFilter)
            }
          >
            <SelectTrigger
              id="gender-filter"
              aria-label="Filter patients by gender"
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          No patients found
        </p>
      ) : (
        <div className="grid gap-3">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  )
}
