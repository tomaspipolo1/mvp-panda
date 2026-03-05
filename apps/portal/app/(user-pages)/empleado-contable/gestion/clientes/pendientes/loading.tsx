import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Skeleton className="h-20 w-full mb-6" />

      <div className="space-y-2 mb-6">
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/3" />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="p-1">
          <Skeleton className="h-10 w-full mb-2" />
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-16 w-full mb-2" />
            ))}
        </div>
      </div>
    </div>
  )
}
