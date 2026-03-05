import { Skeleton } from "@/components/ui/skeleton"

export default function MisConductoresLoading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-40" />
      </div>

      <Skeleton className="h-40 w-full mb-6" />

      <Skeleton className="h-[500px] w-full" />
    </div>
  )
}
