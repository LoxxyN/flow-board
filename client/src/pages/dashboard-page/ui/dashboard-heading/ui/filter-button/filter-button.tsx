import { Button, type Key } from '@heroui/react'
import { usePriorityContext } from '@shared/lib'
import type { TodoPriority } from '@shared/types'
import { PriorityTags } from '@shared/ui'
import { Funnel } from 'lucide-react'
import { Popover } from '../popover'

export const FilterButton = () => {
  const { setPriorityValue, priorityValue } = usePriorityContext()

  const resetFilter = () => {
    setPriorityValue(new Set([]))
  }

  const handleSelect = (keys: Iterable<Key>) => {
    const set = new Set<TodoPriority>()
    for (const key of keys) {
      if (key === 'high' || key === 'medium' || key === 'low') set.add(key)
    }

    setPriorityValue(set)
  }

  return (
    <>
      <Popover
        triggerButton={
          <Button variant="outline">
            <Funnel />
            Фильтры
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <PriorityTags
            selectedKeys={priorityValue}
            onSelectionChange={handleSelect}
            label="Приоритеты"
          />

          <Button fullWidth onClick={resetFilter}>
            Сбросить фильтр
          </Button>
        </div>
      </Popover>
    </>
  )
}
