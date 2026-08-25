import { useSortable } from '@dnd-kit/react/sortable'
import { TodoCardView, type TodoCardProps } from './todo-card-view'

interface TodoCard extends TodoCardProps {
  index: number
  group: string
}

export const TodoCard = ({ id, title, description, priority, index, group }: TodoCard) => {
  const { ref, isDragSource } = useSortable({ id, index, group })

  return (
    <li ref={ref} style={isDragSource ? { opacity: 0.4 } : undefined}>
      <TodoCardView id={id} title={title} description={description} priority={priority} />
    </li>
  )
}
