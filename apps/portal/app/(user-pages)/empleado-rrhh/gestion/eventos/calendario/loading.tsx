import { Skeleton } from "@/components/ui/skeleton"

export default function CalendarioEventosRRHHLoading() {
  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Calendario Skeleton */}
      <div className="border rounded-lg">
        {/* Navegación del calendario */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        </div>

        {/* Vista de mes */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="p-3 text-center border-r last:border-r-0">
                <Skeleton className="h-5 w-10 mx-auto" />
              </div>
            ))}
        </div>

        {/* Celdas del calendario */}
        {Array(5)
          .fill(0)
          .map((_, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7">
              {Array(7)
                .fill(0)
                .map((_, dayIndex) => (
                  <div key={dayIndex} className="min-h-[120px] p-2 border-r border-b last:border-r-0">
                    <Skeleton className="h-6 w-6 mb-2 rounded-full" />
                    <div className="space-y-1">
                      {Array(Math.floor(Math.random() * 3))
                        .fill(0)
                        .map((_, eventIndex) => (
                          <Skeleton key={eventIndex} className="h-5 w-full rounded-sm" />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}
