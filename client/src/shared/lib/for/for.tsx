import type { ReactNode } from 'react'

interface ForProps<T> {
  each: T[]
  empty?: React.ReactNode
  children: (item: T, index: number) => ReactNode
}

export const For = <T,>({ each, empty, children }: ForProps<T>) => {
  if (each.length === 0 || !each) return empty

  return <>{each.map(children)}</>
}
