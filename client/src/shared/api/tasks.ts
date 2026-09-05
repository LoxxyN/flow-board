import type { ITodo } from '@shared/types'
import { apiClient } from './api-client'

const tasksEndpoint = 'tasks'

export const tasksApi = {
  getTasks: (signal?: AbortSignal) => apiClient<ITodo[]>(tasksEndpoint, { signal }),

  createTask: (newTodo: Omit<ITodo, 'id'>) =>
    apiClient<ITodo>(tasksEndpoint, {
      method: 'POST',
      body: newTodo,
    }),

  updateTask: (id: number, patchTask: Partial<ITodo>) =>
    apiClient<ITodo>(`${tasksEndpoint}/${id}`, {
      method: 'PATCH',
      body: patchTask,
    }),

  deleteTask: (id: number) => apiClient<void>(`${tasksEndpoint}/${id}`, { method: 'DELETE' }),
}
