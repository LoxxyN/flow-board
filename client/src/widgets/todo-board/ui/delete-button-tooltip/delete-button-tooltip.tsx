import { Tooltip } from '@heroui/react'

interface DeleteButtonTooltipProps {
  children: React.ReactNode
  label: string
}

export const DeleteButtonTooltip = ({ children, label }: DeleteButtonTooltipProps) => {
  return (
    <Tooltip delay={0} closeDelay={100}>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Content showArrow placement="bottom">
        <Tooltip.Arrow />
        {label}
      </Tooltip.Content>
    </Tooltip>
  )
}
