import type { ITodo } from '@shared/types'
import { TodoColumn } from '../todo-column'

export const TodoBoard = ({ todos }: { todos: ITodo[] }) => {
	const todoTodos = [...todos.filter(item => item.status === 'todo')]
	const inProgressTodo = [
		...todos.filter(item => item.status === 'in_progress'),
	]
	const doneTodos = [...todos.filter(item => item.status === 'done')]

	return (
		<div className='grid grid-cols-3 gap-x-5'>
			<TodoColumn
				items={todoTodos}
				listTitle='Todo'
				todosCount={todoTodos.length}
			/>
			<TodoColumn
				items={inProgressTodo}
				listTitle='In progress'
				todosCount={inProgressTodo.length}
			/>
			<TodoColumn
				items={doneTodos}
				listTitle='Done'
				todosCount={doneTodos.length}
			/>
		</div>
	)
}
