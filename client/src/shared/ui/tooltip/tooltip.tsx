import { Tooltip as HTooltip } from '@heroui/react'

interface TooltipProps {
	children: React.ReactNode
	label: string
}

export const Tooltip = ({ children, label }: TooltipProps) => {
	return (
		<HTooltip delay={0} closeDelay={100}>
			<HTooltip.Trigger>{children}</HTooltip.Trigger>
			<HTooltip.Content showArrow placement="bottom">
				<HTooltip.Arrow />
				{label}
			</HTooltip.Content>
		</HTooltip>
	)
}
