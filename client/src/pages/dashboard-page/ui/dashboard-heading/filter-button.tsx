import { Button } from '@heroui/react'
import { Funnel } from 'lucide-react'

export const FilterButton = () => {
  return (
    <>
      <Button variant="outline">
        <Funnel />
        Фильтры
      </Button>
    </>
  )
}
