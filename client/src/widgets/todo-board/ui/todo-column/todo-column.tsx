import { useDroppable } from '@dnd-kit/react'
import { AddTodo } from '@features/add-todo'
import { Button, Chip } from '@heroui/react'
import { For } from '@shared/lib'
import type { ITodo, TodoStatus } from '@shared/types'
import { Card } from '@shared/ui'
import { TodoCard } from './todo-card'

interface TodoColumnProps {
  items: ITodo[]
  status: TodoStatus
  listTitle: string
  todosCount: number
}

const TriggerButton = () => {
  return (
    <Button fullWidth variant="outline" className="border-dashed">
      Добавить задачу
    </Button>
  )
}

export const TodoColumn = ({ items, todosCount, listTitle, status }: TodoColumnProps) => {
  const { ref, isDropTarget } = useDroppable({ id: status })

  return (
    <Card
      isVertical
      title={listTitle}
      headerRight={<Chip>{todosCount}</Chip>}
      body={
        <>
          <AddTodo triggerButton={<TriggerButton />} />
          <ul
            ref={ref}
            className={`flex flex-col gap-3 mt-3 min-h-24 h-full rounded-lg ${
              isDropTarget ? 'ring-2 ring-accent/50 bg-accent/5' : ''
            }`}
          >
            <For<ITodo> each={items}>
              {(item) => (
                <li key={item.id}>
                  <TodoCard {...item} />
                </li>
              )}
            </For>
          </ul>
        </>
      }
    />
  )
}
