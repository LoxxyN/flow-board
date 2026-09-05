import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AddTodoModal } from '../src/features/add-todo/ui/add-todo-modal/add-todo-modal'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const renderModal = () => {
  const user = userEvent.setup()
  render(<AddTodoModal triggerButton={<button>Открыть форму</button>} />, { wrapper })
  return user
}

const openModal = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByText('Открыть форму'))
  await screen.findByText('Новая задача')
}

describe('AddTodoModal', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 1, title: 'test' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('открывается по клику на trigger', async () => {
    const user = renderModal()
    expect(screen.queryByText('Новая задача')).not.toBeInTheDocument()

    await openModal(user)

    expect(screen.getByText('Новая задача')).toBeInTheDocument()
  })

  it('не сабмитит, пока обязательные поля пустые', async () => {
    const user = renderModal()
    await openModal(user)

    await user.click(screen.getByRole('button', { name: 'Создать' }))

    await waitFor(() => {
      const titleInput = screen.getByRole('textbox', { name: 'Название задачи' })
      expect(titleInput).toHaveAttribute('aria-invalid', 'true')
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('создаёт задачу и закрывает модалку', async () => {
    const user = renderModal()
    await openModal(user)

    await user.type(screen.getByRole('textbox', { name: 'Название задачи' }), 'Новая задача')
    await user.type(screen.getByRole('textbox', { name: 'Описание' }), 'Описание задачи')

    await user.click(screen.getByRole('button', { name: 'Создать' }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/tasks',
        expect.objectContaining({ method: 'POST' }),
      )
    })

    await waitFor(() => expect(screen.queryByText('Новая задача')).not.toBeInTheDocument())
  })
})