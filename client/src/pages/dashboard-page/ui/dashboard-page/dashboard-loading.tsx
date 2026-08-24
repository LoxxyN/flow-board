import { Skeleton } from '@heroui/react'
import { Card } from '@shared/ui'

export const DashboardLoading = () => {
  return (
    <>
      <Skeleton className="h-8 w-1/2 mb-6 rounded-xl" />
      <div className="grid grid-cols-3 gap-x-5">
        <Card
          isVertical
          title={''}
          headerRight={<Skeleton className="h-5 w-full rounded-xl" />}
          body={
            <div className="flex flex-col gap-4">
              <Skeleton className="h-9 w-full rounded-xl" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-36 rounded-xl" />
                <Skeleton className="h-36 rounded-xl" />
              </div>
            </div>
          }
        />
        <Card
          isVertical
          title={''}
          headerRight={<Skeleton className="h-5 w-full rounded-xl" />}
          body={
            <div className="flex flex-col gap-4">
              <Skeleton className="h-9 w-full rounded-xl" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-36 rounded-xl" />
                <Skeleton className="h-36 rounded-xl" />
              </div>
            </div>
          }
        />
        <Card
          isVertical
          title={''}
          headerRight={<Skeleton className="h-5 w-full rounded-xl" />}
          body={
            <div className="flex flex-col gap-4">
              <Skeleton className="h-9 w-full rounded-xl" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-36 rounded-xl" />
                <Skeleton className="h-36 rounded-xl" />
              </div>
            </div>
          }
        />
      </div>
    </>
  )
}
