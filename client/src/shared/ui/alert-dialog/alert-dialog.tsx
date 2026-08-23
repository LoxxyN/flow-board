import { AlertDialog as HAlertDialog } from '@heroui/react'

interface AlertDialogProps {
  triggerButton: React.ReactNode
  children: React.ReactNode
  status?: 'accent' | 'success' | 'warning' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'cover'
  footer?: React.ReactNode
  title?: string
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export const AlertDialog = ({
  triggerButton,
  title,
  isOpen,
  onOpenChange,
  children,
  footer,
  status = 'danger',
  size = 'md',
}: AlertDialogProps) => {
  return (
    <HAlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      {triggerButton}
      <HAlertDialog.Backdrop>
        <HAlertDialog.Container size={size}>
          <HAlertDialog.Dialog>
            <HAlertDialog.CloseTrigger />
            <HAlertDialog.Header>
              {status && <HAlertDialog.Icon status={status} />}
              <HAlertDialog.Heading>{title}</HAlertDialog.Heading>
            </HAlertDialog.Header>
            <HAlertDialog.Body>{children}</HAlertDialog.Body>
            {footer && <HAlertDialog.Footer>{footer}</HAlertDialog.Footer>}
          </HAlertDialog.Dialog>
        </HAlertDialog.Container>
      </HAlertDialog.Backdrop>
    </HAlertDialog>
  )
}
