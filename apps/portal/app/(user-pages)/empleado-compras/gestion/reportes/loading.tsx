import { Skeleton } from "@/components/ui/skeleton"

export default function ReportesLoading() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Skeleton className="h-10 w-64 mb-6" />

      <Skeleton className="h-[150px] w-full mb-6" />
      <Skeleton className="h-[200px] w-full mb-6" />
      <Skeleton className="h-[400px] w-full" />
    </div>
  )
}
