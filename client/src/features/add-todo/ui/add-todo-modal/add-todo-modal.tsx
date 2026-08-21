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
import { Modal, Select } from '@shared/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { PriorityTags } from '../priority-tags'

type StatusOption = 'todo' | 'in_progress' | 'done'
interface StatusOptions {
  id: StatusOption
  label: string
}

interface NewTodo {
  title: string
  description: string
  status: StatusOption
  priority: string
}

const statusOptions: StatusOptions[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
]

export const AddTodoModal = ({ triggerButton }: { triggerButton: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [status, setStatus] = useState<StatusOption | null>('todo')
  const [priority, setPriority] = useState<Iterable<Key>>(new Set(['medium']))

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newTodo: NewTodo) => {
      return fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(newTodo),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setIsOpen(false)
    },
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    const settedPriority = [...priority][0]

    const newTodo: NewTodo = {
      title: formData.title as string,
      description: formData.description as string,
      priority: (settedPriority ?? 'medium').toString(),
      status: status ?? 'todo',
    }

    mutation.mutate(newTodo)
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
          <Button form="add_task" isPending={mutation.isPending} type="submit">
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
            onChange={(keys) => setStatus(keys as StatusOption)}
            defaultValue="todo"
            options={statusOptions}
          />
        </TextField>

        <TextField name="priority">
          <PriorityTags
            label="Приоритет"
            onSelectionChange={(e) => setPriority(e)}
            selectedKeys={priority}
          />
        </TextField>
      </Form>
    </Modal>
  )
}
