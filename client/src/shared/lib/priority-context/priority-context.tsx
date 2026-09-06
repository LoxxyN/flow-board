import { useState } from 'react'
import type { TodoPriority } from '@shared/types'
import { PriorityContext } from './context'

export const PriorityContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [priorityValue, setPriorityValue] = useState<Set<TodoPriority>>(new Set())
  const hasFilter = priorityValue.size > 0

  return (
    <PriorityContext.Provider value={{ hasFilter, priorityValue, setPriorityValue }}>
      {children}
    </PriorityContext.Provider>
  )
}
