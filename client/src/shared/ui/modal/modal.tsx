import { Modal as HModal } from '@heroui/react'
import type { ReactNode } from 'react'

interface ModalProps {
  triggerButton: ReactNode
  children: ReactNode
  title?: string
  footer?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'cover' | 'full'
}

export const Modal = ({ triggerButton, title, children, footer, size = 'md' }: ModalProps) => {
  return (
    <HModal>
      <HModal.Trigger>{triggerButton}</HModal.Trigger>
      <HModal.Backdrop>
        <HModal.Container size={size}>
          <HModal.Dialog>
            <HModal.CloseTrigger />
            {title && (
              <HModal.Header>
                <HModal.Heading className="text-xl">{title}</HModal.Heading>
              </HModal.Header>
            )}
            <HModal.Body>{children}</HModal.Body>
            {footer && <HModal.Footer>{footer}</HModal.Footer>}
          </HModal.Dialog>
        </HModal.Container>
      </HModal.Backdrop>
    </HModal>
  )
}
