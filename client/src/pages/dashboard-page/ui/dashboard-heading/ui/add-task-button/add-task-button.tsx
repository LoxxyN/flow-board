import { AddTodo } from '@features/add-todo'
import { Button } from '@heroui/react'
import { Plus } from 'lucide-react'

export const AddTaskButton = () => {
  return (
    <>
      <AddTodo
        triggerButton={
          <Button>
            <Plus />
            <span>Создать задачу</span>
          </Button>
        }
      />
    </>
  )
}
