import { Badge, Card, CardContent } from '@medix/ui'
import type { Patient } from '../../types'
import { PatientJournalWorkspace } from '../journal/PatientJournalWorkspace'

type PatientWorkspaceProps = {
  patient: Patient
  onBack: () => void
}

export function PatientWorkspace({ patient, onBack }: PatientWorkspaceProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to patient list
      </button>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {patient.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Born: {formatDate(patient.dateOfBirth)} ·{' '}
                {patient.gender === 'male' ? 'Male' : 'Female'}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground">Patient ID</p>
              <p className="font-mono text-sm font-medium">{patient.id}</p>
            </div>
          </div>
          <div className="mt-4">
            <Badge variant="secondary" className="text-sm">
              {patient.diagnosis}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <PatientJournalWorkspace patientId={patient.id} />
    </div>
  )
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
