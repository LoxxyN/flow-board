type TodoStatus = 'todo' | 'in_progress' | 'done'
export type TodoPriority = 'low' | 'medium' | 'high'

export interface ITodo {
	id: number
	title: string
	description: string
	status: TodoStatus
	priority: TodoPriority
}
