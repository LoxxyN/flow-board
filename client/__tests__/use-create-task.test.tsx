import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCreateTask } from '../src/features/add-todo/api/queries'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const newTodo = { title: 'Новая задача', description: 'Описание', priority: 'medium', status: 'todo' } as const

describe('useCreateTask', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 1, ...newTodo }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('вызывает POST /api/tasks с payload задачи', async () => {
    const { result } = renderHook(() => useCreateTask(), { wrapper })

    act(() => {
      result.current.mutate(newTodo)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/tasks',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      }),
    )
  })

  it('переходит в состояние error при падении запроса', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network down'))
    const { result } = renderHook(() => useCreateTask(), { wrapper })

    act(() => {
      result.current.mutate(newTodo)
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBe('Network down')
  })
})