import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { TodoCardView } from '../src/widgets/todo-board/ui/todo-column/todo-card-view'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const renderCard = (props?: Partial<React.ComponentProps<typeof TodoCardView>>) =>
  render(
    <TodoCardView
      id={1}
      title="Купить молоко"
      description="2 литра"
      priority="medium"
      {...props}
    />,
    { wrapper },
  )

describe('TodoCardView', () => {
  it('рендерит title и description', () => {
    renderCard()
    expect(screen.getByText('Купить молоко')).toBeInTheDocument()
    expect(screen.getByText('2 литра')).toBeInTheDocument()
  })

  it('показывает label приоритета в Chip', () => {
    renderCard({ priority: 'high' })
    expect(screen.getByText('Высокий')).toBeInTheDocument()
  })

  it('показывает кнопки редактирования и удаления', () => {
    const { container } = renderCard()
    expect(container.querySelector('.lucide-pencil')).toBeInTheDocument()
    expect(container.querySelector('.lucide-trash-2')).toBeInTheDocument()
  })
})