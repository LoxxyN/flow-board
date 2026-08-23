import { Label } from '@heroui/react'
import { useTasks } from '@shared/api'
import type { TodoPriority } from '@shared/types'
import { PriorityCountItem } from './priority-count-item'

interface PriorityCount {
  priority: TodoPriority
  count: number
  label: string
}

export const PriorityCountList = () => {
  const { data } = useTasks()
  const tasks = data ?? []

  const high = tasks.filter((task) => task.priority === 'high').length
  const medium = tasks.filter((task) => task.priority === 'medium').length
  const low = tasks.filter((task) => task.priority === 'low').length

  const items: PriorityCount[] = [
    { priority: 'high', count: high, label: 'Высокий' },
    { priority: 'medium', count: medium, label: 'Средний' },
    { priority: 'low', count: low, label: 'Низкий' },
  ]

  return (
    <div className="w-full">
      <Label className="text-muted mb-3">Приоритеты</Label>
      <ul className="pl-4">
        {items.map((item) => (
          <li key={item.priority}>
            <PriorityCountItem label={item.label} priority={item.priority} count={item.count} />
          </li>
        ))}
      </ul>
    </div>
  )
}
