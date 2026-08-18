import { AddTodoModal } from '../add-todo-modal'

export const AddTodo = ({
	triggerButton,
}: {
	triggerButton: React.ReactNode
}) => {
	return <AddTodoModal triggerButton={triggerButton} />
}
