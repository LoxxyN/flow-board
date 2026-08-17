import type { ReactNode } from 'react'

interface ForProps<T> {
	each: T[]
	children: (item: T, index: number) => ReactNode
}

export const For = <T,>({ each, children }: ForProps<T>) => {
	return <>{each.map(children)}</>
}
