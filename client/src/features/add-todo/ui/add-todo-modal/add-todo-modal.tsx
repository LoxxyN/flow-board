import { useCreateTask } from '@features/add-todo/api'
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
import type { ITodo, TodoStatus } from '@shared/types'
import { Modal, PriorityTags, Select } from '@shared/ui'
import { useState } from 'react'

interface StatusOptions {
  id: TodoStatus
  label: string
}

const statusOptions: StatusOptions[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
]

export const AddTodoModal = ({ triggerButton }: { triggerButton: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [status, setStatus] = useState<TodoStatus | null>('todo')
  const [priority, setPriority] = useState<Iterable<Key>>(new Set(['medium']))
  const { mutate, isPending } = useCreateTask()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    const settedPriority = [...priority][0]

    const newTodo: Omit<ITodo, 'id'> = {
      title: formData.title as string,
      description: formData.description as string,
      priority: (settedPriority as ITodo['priority']) ?? 'medium',
      status: (status as ITodo['status']) ?? 'todo',
    }

    mutate(newTodo, { onSuccess: () => setIsOpen(false) })
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Новая задача"
      size="md"
      triggerButton={triggerButton}
      footer={
        <>
          <Button variant="outline" slot="close">
            Отмена
          </Button>
          <Button form="add_task" isPending={isPending} type="submit">
            Создать
          </Button>
        </>
      }
    >
      <Form className="flex flex-col gap-5" id="add_task" onSubmit={onSubmit}>
        <TextField isRequired name="title" type="text">
          <Label className="mb-1.5">Название задачи</Label>
          <Input variant="secondary" placeholder="Введите название задачи..." />
          <FieldError />
        </TextField>

        <TextField isRequired name="description" type="text">
          <Label className="mb-1.5">Описание</Label>
          <TextArea variant="secondary" placeholder="Введите название задачи..." className="h-14" />
          <FieldError />
        </TextField>

        <TextField>
          <Label className="mb-1.5">Статус</Label>
          <Select<StatusOptions>
            variant="secondary"
            value={status}
            onChange={(keys) => setStatus(keys as TodoStatus)}
            defaultValue="todo"
            options={statusOptions}
          />
        </TextField>

        <PriorityTags
          label="Приоритет"
          onSelectionChange={(e) => setPriority(e)}
          selectedKeys={priority}
        />
      </Form>
    </Modal>
  )
}
