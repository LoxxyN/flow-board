import { TASKS_KEY, tasksApi } from '@shared/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => tasksApi.deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}
