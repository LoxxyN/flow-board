import { Chip as HChip } from '@heroui/react'
import type { TodoPriority } from '@shared/types/todo'

interface ChipProps {
  priority: TodoPriority
}

const PRIORITY_CONFIG: Record<
  TodoPriority,
  { color: 'success' | 'danger' | 'warning'; label: string }
> = {
  low: { color: 'success', label: 'Низкий' },
  medium: { color: 'warning', label: 'Средний' },
  high: { color: 'danger', label: 'Высокий' },
}

export const Chip = ({ priority }: ChipProps) => {
  const { color, label } = PRIORITY_CONFIG[priority]
  return (
    <HChip variant="primary" color={color}>
      {label}
    </HChip>
  )
}
