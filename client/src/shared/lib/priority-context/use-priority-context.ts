import { useContext } from 'react'
import { PriorityContext } from './context'

export const usePriorityContext = () => {
  const context = useContext(PriorityContext)
  if (!context) {
    throw new Error('usePriorityContext must be used within a PriorityContextProvider')
  }
  return context
}
