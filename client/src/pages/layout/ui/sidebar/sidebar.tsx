import { PriorityCountList } from './priority-count-list'

export const Sidebar = () => {
  return (
    <div className="w-full h-full border-r">
      <aside className="p-4">
        <PriorityCountList />
      </aside>
    </div>
  )
}
