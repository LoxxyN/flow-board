import { Chip } from '@heroui/react'
import type { TodoPriority } from '@shared/types'

type PriorityStatus = 'success' | 'warning' | 'danger'
interface PriorityCountItem {
  label: string
  count: number
  priority: TodoPriority
}

const priorityMap: Record<TodoPriority, PriorityStatus> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
}

export const PriorityCountItem = ({ label, count, priority }: PriorityCountItem) => {
  return (
    <div className="py-2 flex items-center justify-between">
      <p className="text-sm">{label}</p>
      <Chip className="min-w-5" variant="primary" size="sm" color={priorityMap[priority]}>
        <span className="w-full flex justify-center">{count}</span>
      </Chip>
    </div>
  )
}
