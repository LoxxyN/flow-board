import type { DragEndEvent } from '@dnd-kit/react'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { useUpdateTask } from '@features/edit-todo/api'
import type { ITodo, TodoStatus } from '@shared/types'
import { TodoColumn } from '../todo-column'
import { TodoCardView } from '../todo-column/todo-card-view'

const COLUMNS: Array<{ status: TodoStatus; title: string }> = [
  { status: 'todo', title: 'Todo' },
  { status: 'in_progress', title: 'In progress' },
  { status: 'done', title: 'Done' },
]

export const TodoBoard = ({ todos }: { todos: ITodo[] }) => {
  const { mutate } = useUpdateTask()

  const handleDragEnd = (event: DragEndEvent) => {
    const { source, target } = event.operation
    if (event.canceled || !source || !target) return

    const taskId = source.id as number
    const targetId = target.id

    const targetStatus: TodoStatus | undefined =
      targetId === 'todo' || targetId === 'in_progress' || targetId === 'done'
        ? targetId
        : todos.find((t) => t.id === targetId)?.status

    if (!targetStatus) return

    const task = todos.find((t) => t.id === taskId)
    if (!task || task.status === targetStatus) return

    mutate({ id: taskId, patch: { status: targetStatus } })
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-x-5">
        {COLUMNS.map(({ status, title }) => {
          const items = todos.filter((t) => t.status === status)
          return (
            <TodoColumn
              key={status}
              status={status}
              items={items}
              listTitle={title}
              todosCount={items.length}
            />
          )
        })}
      </div>

      <DragOverlay>
        {(source) => {
          const todo = todos.find((t) => t.id === source.id)
          if (!todo) return null
          return <TodoCardView {...todo} />
        }}
      </DragOverlay>
    </DragDropProvider>
  )
}
