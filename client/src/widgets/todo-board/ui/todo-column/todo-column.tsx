import { Chip } from '@heroui/react'
import { For } from '@shared/lib'
import type { ITodo } from '@shared/types'
import { Card } from '@shared/ui'
import { TodoCard } from './todo-card'

interface TodoColumnProps {
	items: ITodo[]
	listTitle: string
	todosCount: number
}

export const TodoColumn = ({
	items,
	todosCount,
	listTitle,
}: TodoColumnProps) => {
	return (
		<Card
			title={listTitle}
			headerRight={<Chip>{todosCount}</Chip>}
			isVertical
			body={
				<ul className='flex flex-col gap-3'>
					<For each={items}>
						{item => (
							<li>
								<TodoCard key={item.id} {...item} />
							</li>
						)}
					</For>
				</ul>
			}
		/>
	)
}
