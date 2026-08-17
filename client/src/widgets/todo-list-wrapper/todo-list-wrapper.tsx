import { Chip } from '@heroui/react'
import { For } from '@shared/lib'
import type { ITodo } from '@shared/types'
import { Card } from '@shared/ui'
import { TodoListCard } from './ui'

interface TodoListProps {
	items: ITodo[]
	listTitle: string
	todosCount: number
}

export const TodoListWrapper = ({
	items,
	todosCount,
	listTitle,
}: TodoListProps) => {
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
								<TodoListCard key={item.id} {...item} />
							</li>
						)}
					</For>
				</ul>
			}
		/>
	)
}
