/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { Spinner } from '@medix/ui'
import { fetchJournals, updateJournalStatus } from '../../lib/api'
import type { Journal, JournalStatus } from '../../types'
import { JournalEntryCard } from './JournalEntryCard'
import { JournalForm } from './JournalForm'

type PatientJournalWorkspaceProps = {
  patientId: string
}

export function PatientJournalWorkspace({
  patientId,
}: PatientJournalWorkspaceProps) {
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchJournals(patientId)
      .then((data) => setJournals(data))
      .finally(() => setIsLoading(false))
  }, [patientId])

  function handleStatusChange(journalId: string, status: JournalStatus) {
    updateJournalStatus(journalId, status).then(() =>
      fetchJournals(patientId).then(setJournals),
    )
  }

  function handleCreated(journal: Journal) {
    setJournals((previousJournals) => [journal, ...previousJournals])
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section>
        <h2 className="mb-4 text-lg font-semibold">Journal entries</h2>
        {isLoading ? (
          <Spinner />
        ) : journals.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No journal entries yet
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {journals.map((entry) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </section>

      <div>
        <JournalForm patientId={patientId} onCreated={handleCreated} />
      </div>
    </div>
  )
}
