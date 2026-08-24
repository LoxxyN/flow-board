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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}
