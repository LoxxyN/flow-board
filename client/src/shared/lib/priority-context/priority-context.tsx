import type { TodoPriority } from '@shared/types'
import { createContext, useContext, useState } from 'react'

interface PriorityContext {
  hasFilter: boolean
  priorityValue: Set<TodoPriority>
  setPriorityValue: (priority: Set<TodoPriority>) => void
}

const PriorityContext = createContext<PriorityContext | null>(null)

export const PriorityContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [priorityValue, setPriorityValue] = useState<Set<TodoPriority>>(new Set())
  const hasFilter = priorityValue.size > 0

  return (
    <PriorityContext.Provider value={{ hasFilter, priorityValue, setPriorityValue }}>
      {children}
    </PriorityContext.Provider>
  )
}

export const usePriorityContext = () => {
  const context = useContext(PriorityContext)
  if (!context) {
    throw new Error('usePriorityContext must be used within a PriorityContextProvider')
  }
  return context
}
