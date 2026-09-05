import { DragDropProvider } from '@dnd-kit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import type { ITodo } from '../src/shared/types'
import { TodoColumn } from '../src/widgets/todo-board/ui/todo-column'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <DragDropProvider>{children}</DragDropProvider>
  </QueryClientProvider>
)

const tasks: ITodo[] = [
  { id: 1, title: 'Купить молоко', description: '2 литра', priority: 'medium', status: 'todo' },
]

const renderColumn = (items: ITodo[]) =>
  render(<TodoColumn items={items} status="todo" listTitle="To Do" todosCount={items.length} />, {
    wrapper,
  })

describe('TodoColumn', () => {
  it('рендерит заголовок колонки и счётчик задач', () => {
    renderColumn(tasks)
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('рендерит карточки задач', () => {
    renderColumn(tasks)
    expect(screen.getByText('Купить молоко')).toBeInTheDocument()
  })

  it('показывает пустое состояние, когда задач нет', () => {
    renderColumn([])
    expect(screen.getByText('Задачи отсутствуют')).toBeInTheDocument()
  })
})