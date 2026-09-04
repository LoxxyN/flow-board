import { Skeleton } from '@heroui/react'
import type { TodoPriority } from '@shared/types'

interface PriorityCountItem {
  label: string
  count: number
  priority: TodoPriority
  isPending: boolean
}

const colorMap: Record<TodoPriority, string> = {
  high: 'bg-danger',
  medium: 'bg-warning',
  low: 'bg-success',
}

export const PriorityCountItem = ({ label, count, priority, isPending }: PriorityCountItem) => {
  return (
    <div className="py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`size-2 rounded-full ${colorMap[priority]}`}></span>
        <p className="text-sm">{label}</p>
      </div>

      {isPending ? (
        <Skeleton className="h-4 w-6 rounded-full" />
      ) : (
        <span className="text-muted text-xs">{count}</span>
      )}
    </div>
  )
}
