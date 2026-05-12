import {
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@medix/ui'
import type { Journal, JournalStatus } from '../../types'

const statusOptions: { value: JournalStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
]

type JournalEntryCardProps = {
  entry: Journal
  onStatusChange: (id: string, status: JournalStatus) => void
}

export function JournalEntryCard({
  entry,
  onStatusChange,
}: JournalEntryCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-none tracking-tight">
              {entry.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatDate(entry.date)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Select
              aria-label={`Change status for ${entry.title}`}
              value={entry.status}
              onValueChange={(value) =>
                onStatusChange(entry.id, value as JournalStatus)
              }
            >
              <SelectTrigger className="w-36 text-sm font-medium">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {entry.content}
        </p>
      </CardContent>
    </Card>
  )
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
