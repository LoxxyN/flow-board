import { Card as HCard, type CardVariants } from '@heroui/react'
import type { ReactNode } from 'react'

interface CardProps extends CardVariants {
	title: string
	description?: string
	headerRight?: ReactNode
	isVertical?: boolean
	body: ReactNode
	footer?: ReactNode
}

export const Card = ({
	title,
	description,
	headerRight,
	isVertical = false,
	body,
	footer,
	variant = 'default',
}: CardProps) => {
	return (
		<HCard
			variant={variant}
			className={isVertical ? 'flex flex-col' : 'flex flex-row'}
		>
			<HCard.Header>
				<div className='flex items-center justify-between'>
					<HCard.Title className='font-semibold'>{title}</HCard.Title>
					{headerRight}
				</div>
				<div>
					{description && <HCard.Description>{description}</HCard.Description>}
				</div>
			</HCard.Header>
			<HCard.Content className='flex-1'>{body}</HCard.Content>
			{footer && <HCard.Footer>{footer}</HCard.Footer>}
		</HCard>
	)
}
