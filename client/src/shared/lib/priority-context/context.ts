import { createContext } from 'react'
import type { TodoPriority } from '@shared/types'

export interface PriorityContext {
  hasFilter: boolean
  priorityValue: Set<TodoPriority>
  setPriorityValue: (priority: Set<TodoPriority>) => void
}

export const PriorityContext = createContext<PriorityContext | null>(null)
