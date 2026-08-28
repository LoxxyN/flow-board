import type { Key } from '@heroui/react'
import type { TodoPriority } from '@shared/types'
import { createContext, useContext, useState } from 'react'

interface PriorityContext {
  priority: TodoPriority | string
  setPriorityValue: (priority: Iterable<Key>) => void
}

const PriorityContext = createContext<PriorityContext | null>(null)

export const PriorityContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [priorityValue, setPriorityValue] = useState<Iterable<Key>>(new Set(['none']))

  const priority = [...priorityValue][0] as TodoPriority
  console.log(priority)

  return (
    <PriorityContext.Provider value={{ priority, setPriorityValue }}>
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
