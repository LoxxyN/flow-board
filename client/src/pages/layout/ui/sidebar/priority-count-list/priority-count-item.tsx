import type { TodoPriority } from '@shared/types'

interface PriorityCountItem {
  label: string
  count: number
  priority: TodoPriority
}

const colorMap: Record<TodoPriority, string> = {
  high: 'bg-danger',
  medium: 'bg-warning',
  low: 'bg-success',
  none: '',
}

export const PriorityCountItem = ({ label, count, priority }: PriorityCountItem) => {
  return (
    <div className="py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`size-2 rounded-full ${colorMap[priority]}`}></span>
        <p className="text-sm">{label}</p>
      </div>
      <span className="text-muted text-xs">{count}</span>
    </div>
  )
}
