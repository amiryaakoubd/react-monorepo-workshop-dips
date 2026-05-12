import { useParams } from 'react-router'
import { PatientPage } from '../PatientPage'

export function PatientDetailPage() {
  const { id } = useParams()

  return <PatientPage selectedId={id} />
}
