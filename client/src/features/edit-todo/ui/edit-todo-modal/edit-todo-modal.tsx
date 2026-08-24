import { useUpdateTask } from '@features/edit-todo/api'
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  type Key,
} from '@heroui/react'
import type { ITodo, TodoPriority } from '@shared/types'
import { Modal, PriorityTags } from '@shared/ui'
import { useId, useState } from 'react'

interface EditTodoModalProps {
  id: number
  title: string
  description: string
  priority: TodoPriority
  triggerButton: React.ReactNode
}

export const EditTodoModal = ({
  id,
  title,
  description,
  priority,
  triggerButton,
}: EditTodoModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedPriority, setSelectedPriority] = useState<Iterable<Key>>(new Set([priority]))
  const { mutate, isPending } = useUpdateTask()
  const formId = useId()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    const settedPriority = [...selectedPriority][0]

    mutate(
      {
        id,
        patch: {
          title: formData.title as string,
          description: formData.description as string,
          priority: (settedPriority as ITodo['priority']) ?? 'medium',
        },
      },
      { onSuccess: () => setIsOpen(false) },
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Редактирование задачи"
      size="md"
      triggerButton={triggerButton}
      footer={
        <>
          <Button variant="outline" slot="close">
            Отмена
          </Button>
          <Button form={formId} isPending={isPending} type="submit">
            Сохранить
          </Button>
        </>
      }
    >
      <Form className="flex flex-col gap-5" id={formId} onSubmit={onSubmit}>
        <TextField isRequired name="title" type="text" defaultValue={title}>
          <Label className="mb-1.5">Название задачи</Label>
          <Input variant="secondary" placeholder="Введите название задачи..." />
          <FieldError />
        </TextField>

        <TextField isRequired name="description" type="text" defaultValue={description}>
          <Label className="mb-1.5">Описание</Label>
          <TextArea variant="secondary" placeholder="Введите название задачи..." className="h-14" />
          <FieldError />
        </TextField>

        <TextField name="priority">
          <PriorityTags
            label="Приоритет"
            onSelectionChange={(e) => setSelectedPriority(e)}
            selectedKeys={selectedPriority}
          />
        </TextField>
      </Form>
    </Modal>
  )
}
