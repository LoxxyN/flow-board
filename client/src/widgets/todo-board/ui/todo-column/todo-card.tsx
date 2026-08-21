import type { TodoPriority } from '@shared/types'
import { Avatar, Card, Chip } from '@shared/ui'

interface TodoCardProps {
  title: string
  description: string
  priority: TodoPriority
}

export const TodoCard = ({ title, description, priority }: TodoCardProps) => {
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
          <Chip priority={priority} />
        </div>
      }
    />
  )
}
