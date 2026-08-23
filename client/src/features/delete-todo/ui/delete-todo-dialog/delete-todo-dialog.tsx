import { Button } from '@heroui/react'
import { AlertDialog } from '@shared/ui'
import { useState } from 'react'
import { useDeleteTask } from '../../api'

export const DeleteTodoDialog = ({
  id,
  triggerButton,
}: {
  id: number
  triggerButton: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { mutate, isPending, isSuccess } = useDeleteTask()

  if (isSuccess) setIsOpen(!isOpen)

  return (
    <AlertDialog
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      triggerButton={triggerButton}
      title="Вы хотите удалить задачу?"
      footer={
        <>
          <Button slot="close">Отмена</Button>
          <Button onClick={() => mutate(id)} isPending={isPending} variant="danger">
            Удалить
          </Button>
        </>
      }
    >
      <p>Это необратимо удалит задачу без возможности восстановления</p>
    </AlertDialog>
  )
}
