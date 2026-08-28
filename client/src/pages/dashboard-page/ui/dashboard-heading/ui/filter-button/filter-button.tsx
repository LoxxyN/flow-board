import { Button } from '@heroui/react'
import { usePriorityContext } from '@shared/lib'
import { PriorityTags } from '@shared/ui'
import { Funnel } from 'lucide-react'
import { Popover } from '../popover'

export const FilterButton = () => {
  const { setPriorityValue, priority } = usePriorityContext()

  const resetFilter = () => {
    setPriorityValue(['none'])
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
            selectedKeys={priority}
            onSelectionChange={setPriorityValue}
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
