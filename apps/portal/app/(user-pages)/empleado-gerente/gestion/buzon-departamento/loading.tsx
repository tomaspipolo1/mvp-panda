import { Skeleton } from "@/components/ui/skeleton"

export default function BuzonDepartamentoLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Skeleton className="h-8 w-64 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    </div>
  )
}
