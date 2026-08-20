import { useQuery } from '@tanstack/react-query'
import { TodoBoard } from '@widgets/todo-board'
import { DashboardHeading } from '../dashboard-heading'

const getData = async () => {
  const res = await fetch('/api/tasks')
  const data = await res.json()
  return data
}

export const DashboardPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['todos'],
    queryFn: getData,
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <>
      <DashboardHeading title="Разработка MVP" />
      <TodoBoard todos={data} />
    </>
  )
}
