import type { DragEndEvent } from '@dnd-kit/react'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { useUpdateTask } from '@features/edit-todo/api'
import { TASKS_KEY } from '@shared/api'
import type { ITodo, TodoStatus } from '@shared/types'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { TodoColumn } from '../todo-column'
import { TodoCardView } from '../todo-column/todo-card-view'

const COLUMNS: Array<{ status: TodoStatus; title: string }> = [
  { status: 'todo', title: 'Todo' },
  { status: 'in_progress', title: 'In progress' },
  { status: 'done', title: 'Done' },
]

const isTodoStatus = (value: unknown): value is TodoStatus =>
  value === 'todo' || value === 'in_progress' || value === 'done'

export const TodoBoard = ({ todos }: { todos: ITodo[] }) => {
  const { mutate } = useUpdateTask()
  const queryClient = useQueryClient()

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { source, target } = event.operation
      if (event.canceled || !source || !target) return

      const taskId = source.id as number
      const targetId = target.id as number | string

      const task = todos.find((t) => t.id === taskId)
      if (!task) return

      const targetStatus: TodoStatus = isTodoStatus(targetId)
        ? targetId
        : (todos.find((t) => t.id === targetId)?.status ?? task.status)

      queryClient.setQueryData<ITodo[]>(TASKS_KEY, (old) => {
        if (!old) return old

        const currentTask = old.find((t) => t.id === taskId)
        if (!currentTask) return old

        const isColumnTarget = isTodoStatus(targetId)
        const nextTargetStatus: TodoStatus = isColumnTarget
          ? targetId
          : (old.find((t) => t.id === targetId)?.status ?? currentTask.status)

        const targetColumn = old.filter((t) => t.status === nextTargetStatus && t.id !== taskId)
        const targetIndex = isColumnTarget
          ? targetColumn.length
          : targetColumn.findIndex((t) => t.id === targetId)

        const insertIndex = targetIndex < 0 ? targetColumn.length : targetIndex
        const nextTargetColumn = [...targetColumn]
        nextTargetColumn.splice(insertIndex, 0, { ...currentTask, status: nextTargetStatus })

        const nextByStatus = new Map<TodoStatus, ITodo[]>()

        for (const { status } of COLUMNS) {
          if (status === nextTargetStatus) {
            nextByStatus.set(status, nextTargetColumn)
          } else if (status === currentTask.status) {
            nextByStatus.set(
              status,
              old.filter((t) => t.status === status && t.id !== taskId),
            )
          } else {
            nextByStatus.set(
              status,
              old.filter((t) => t.status === status),
            )
          }
        }

        return COLUMNS.flatMap(({ status }) => nextByStatus.get(status) ?? [])
      })

      if (task.status !== targetStatus) {
        mutate({ id: taskId, patch: { status: targetStatus } })
      }
    },
    [todos, mutate, queryClient],
  )

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

      <DragOverlay className="pointer-events-none">
        {(source) => {
          const todo = todos.find((t) => t.id === source.id)
          if (!todo) return null
          return <TodoCardView {...todo} />
        }}
      </DragOverlay>
    </DragDropProvider>
  )
}
