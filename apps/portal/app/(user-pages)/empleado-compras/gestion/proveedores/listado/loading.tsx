import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <Skeleton className="h-20 w-full mb-6" />

      <div className="mb-6">
        <Skeleton className="h-10 w-full" />
      </div>

      <Skeleton className="h-[500px] w-full" />
    </div>
  )
}
