import { TASKS_KEY, tasksApi } from '@shared/api'
import type { ITodo } from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateTaskVariables {
  id: number
  patch: Partial<ITodo>
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, patch }: UpdateTaskVariables) => tasksApi.updateTask(id, patch),

    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY })

      const prevTodos = queryClient.getQueryData<ITodo[]>(TASKS_KEY)

      queryClient.setQueryData<ITodo[]>(TASKS_KEY, (oldTodos) =>
        oldTodos?.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)),
      )

      return { prevTodos }
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.prevTodos) {
        queryClient.setQueryData(TASKS_KEY, ctx.prevTodos)
      }
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}
