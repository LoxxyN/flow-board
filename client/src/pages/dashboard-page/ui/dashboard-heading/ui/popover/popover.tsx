import { Popover as HPopover } from '@heroui/react'

export const Popover = ({
  triggerButton,
  children,
  title,
}: {
  triggerButton: React.ReactNode
  children: React.ReactNode
  title?: string
}) => (
  <HPopover>
    <HPopover.Trigger>{triggerButton}</HPopover.Trigger>
    <HPopover.Content>
      <HPopover.Dialog>
        {title && <HPopover.Heading>{title}</HPopover.Heading>}
        {children}
      </HPopover.Dialog>
    </HPopover.Content>
  </HPopover>
)
