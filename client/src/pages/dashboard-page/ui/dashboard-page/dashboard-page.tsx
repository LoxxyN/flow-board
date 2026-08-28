import { useTasks } from '@shared/api'
import { PriorityContextProvider } from '@shared/lib'
import { TodoBoard } from '@widgets/todo-board'
import { DashboardHeading } from '../dashboard-heading'
import { DashboardLoading } from './dashboard-loading'

export const DashboardPage = () => {
  const { isPending, error, data } = useTasks()

  if (isPending) return <DashboardLoading />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <PriorityContextProvider>
      <DashboardHeading title="Разработка MVP" />
      <TodoBoard todos={data} />
    </PriorityContextProvider>
  )
}
