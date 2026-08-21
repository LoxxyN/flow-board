import { useTasks } from '@shared/api'
import { TodoBoard } from '@widgets/todo-board'
import { DashboardHeading } from '../dashboard-heading'

export const DashboardPage = () => {
  const { isPending, error, data } = useTasks()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <>
      <DashboardHeading title="Разработка MVP" />
      <TodoBoard todos={data} />
    </>
  )
}
