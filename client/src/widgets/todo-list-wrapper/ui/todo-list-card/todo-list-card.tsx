import type { TodoPriority } from '@shared/types'
import { Avatar, Card, Chip } from '@shared/ui'

interface TodoListCardProps {
	title: string
	description: string
	priority: TodoPriority
}

export const TodoListCard = ({
	title,
	description,
	priority,
}: TodoListCardProps) => {
	return (
		<Card
			title={title}
			description={description}
			variant='secondary'
			isVertical
			body={
				<div className='flex justify-between'>
					<Avatar
						imgSrc='https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'
						alt='Avatar'
					/>
					<Chip priority={priority} />
				</div>
			}
		/>
	)
}
