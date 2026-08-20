import { AddTodo } from '@features/add-todo'
import { Button, Chip } from '@heroui/react'
import { For } from '@shared/lib'
import type { ITodo } from '@shared/types'
import { Card } from '@shared/ui'
import { TodoCard } from './todo-card'

interface TodoColumnProps {
  items: ITodo[]
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

export const TodoColumn = ({ items, todosCount, listTitle }: TodoColumnProps) => {
  return (
    <Card
      isVertical
      title={listTitle}
      headerRight={<Chip>{todosCount}</Chip>}
      body={
        <>
          <AddTodo triggerButton={<TriggerButton />} />
          <ul className="flex flex-col gap-3">
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
