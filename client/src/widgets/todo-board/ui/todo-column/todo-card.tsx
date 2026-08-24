import { DeleteTodo } from '@features/delete-todo'
import { Button } from '@heroui/react'
import type { TodoPriority } from '@shared/types'
import { Avatar, Card, Chip } from '@shared/ui'
import { Trash2 } from 'lucide-react'
import { DeleteButtonTooltip } from '../delete-button-tooltip'

interface TodoCardProps {
  id: number
  title: string
  description: string
  priority: TodoPriority
}

export const TodoCard = ({ id, title, description, priority }: TodoCardProps) => {
  return (
    <Card
      isVertical
      variant="secondary"
      title={title}
      description={description}
      body={
        <div className="flex justify-between">
          <Avatar
            imgSrc="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            alt="Avatar"
          />
          <div className="flex items-center gap-2">
            <DeleteTodo
              id={id}
              triggerButton={
                <DeleteButtonTooltip label="Удалить">
                  <Button size="sm" isIconOnly variant="danger-soft">
                    <Trash2 />
                  </Button>
                </DeleteButtonTooltip>
              }
            />

            <Chip className="h-full" priority={priority} />
          </div>
        </div>
      }
    />
  )
}
