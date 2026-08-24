import { useDraggable } from '@dnd-kit/react'
import { TodoCardView, type TodoCardProps } from './todo-card-view'

export const TodoCard = ({ id, title, description, priority }: TodoCardProps) => {
  const { ref, isDragging } = useDraggable({ id })

  return (
    <div ref={ref} style={isDragging ? { opacity: 0.4 } : undefined}>
      <TodoCardView id={id} title={title} description={description} priority={priority} />
    </div>
  )
}
