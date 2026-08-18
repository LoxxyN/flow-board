import { AddTaskButton } from './add-task-button'
import { FilterButton } from './filter-button'

export const DashboardHeading = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between w-full">
      <h2 className="font-extrabold text-2xl mb-6">{title}</h2>
      <div className="flex gap-3">
        <FilterButton />
        <AddTaskButton />
      </div>
    </div>
  )
}
