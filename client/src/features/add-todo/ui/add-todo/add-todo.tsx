import type { TodoStatus } from '@shared/types'
import { AddTodoModal } from '../add-todo-modal'

interface AddTodoProps {
  triggerButton: React.ReactNode
  defaultSelected: TodoStatus
}

export const AddTodo = ({ triggerButton, defaultSelected }: AddTodoProps) => {
  return <AddTodoModal defaultSelected={defaultSelected} triggerButton={triggerButton} />
}
