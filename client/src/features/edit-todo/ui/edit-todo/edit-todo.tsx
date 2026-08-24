import type { TodoPriority } from '@shared/types'
import { EditTodoModal } from '../edit-todo-modal'

interface EditTodoProps {
  id: number
  title: string
  description: string
  priority: TodoPriority
  triggerButton: React.ReactNode
}

export const EditTodo = ({ id, title, description, priority, triggerButton }: EditTodoProps) => {
  return (
    <EditTodoModal
      id={id}
      title={title}
      description={description}
      priority={priority}
      triggerButton={triggerButton}
    />
  )
}
