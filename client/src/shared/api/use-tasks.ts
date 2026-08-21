import { useQuery } from '@tanstack/react-query'
import { tasksApi } from './tasks'

export const TASKS_KEY = ['tasks']

export const useTasks = () =>
  useQuery({
    queryKey: TASKS_KEY,
    queryFn: ({ signal }) => tasksApi.getTasks(signal),
  })
