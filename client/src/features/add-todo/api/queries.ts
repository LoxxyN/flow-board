import { TASKS_KEY, tasksApi } from '@shared/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}
