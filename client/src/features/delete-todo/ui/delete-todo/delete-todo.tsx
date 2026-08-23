import { DeleteTodoDialog } from '../delete-todo-dialog'

export const DeleteTodo = ({
  id,
  triggerButton,
}: {
  id: number
  triggerButton: React.ReactNode
}) => {
  return <DeleteTodoDialog triggerButton={triggerButton} id={id} />
}
