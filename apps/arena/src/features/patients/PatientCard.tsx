import { Card, CardContent } from '@medix/ui'
import { Link } from 'react-router'
import type { Patient } from '../../types'

type PatientCardProps = {
  patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <Link
      to={`/patients/${patient.id}`}
      className="block w-full text-left text-inherit no-underline"
    >
      <Card className="cursor-pointer transition-shadow hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{patient.name}</h3>
              <p className="text-sm text-muted-foreground">
                {calculateAge(patient.dateOfBirth)} years ·{' '}
                {patient.gender === 'male' ? 'Male' : 'Female'}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              ID: {patient.id}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {patient.diagnosis}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

function calculateAge(dateOfBirth: string): number {
  const born = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - born.getFullYear()
  const month = today.getMonth() - born.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < born.getDate())) {
    age--
  }
  return age
}
