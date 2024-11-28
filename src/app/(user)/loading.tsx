import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-3 p-4 md:m-5">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h=[125px] w-[220px] rounded-xl"></Skeleton>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h=[125px] w-[220px] rounded-xl"></Skeleton>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h=[125px] w-[220px] rounded-xl"></Skeleton>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h=[125px] w-[220px] rounded-xl"></Skeleton>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h=[125px] w-[220px] rounded-xl"></Skeleton>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h=[125px] w-[220px] rounded-xl"></Skeleton>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      </div>
    </div>
  )
}