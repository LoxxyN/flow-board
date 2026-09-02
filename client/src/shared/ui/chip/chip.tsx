import { Chip as HChip } from '@heroui/react'
import type { TodoPriority } from '@shared/types/todo'

interface ChipProps {
  priority: TodoPriority
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const PRIORITY_CONFIG: Record<
  TodoPriority,
  { color: 'default' | 'success' | 'danger' | 'warning'; label: string }
> = {
  none: { color: 'default', label: '' },
  low: { color: 'success', label: 'Низкий' },
  medium: { color: 'warning', label: 'Средний' },
  high: { color: 'danger', label: 'Высокий' },
}

export const Chip = ({ priority, size = 'md', className }: ChipProps) => {
  const { color, label } = PRIORITY_CONFIG[priority]
  return (
    <HChip className={className} size={size} variant="primary" color={color}>
      {label}
    </HChip>
  )
}
