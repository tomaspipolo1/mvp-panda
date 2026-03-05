import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96 mt-2" />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6">
            {/* Tipo de Solicitud */}
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Asunto */}
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Descripción */}
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-32 w-full" />
            </div>

            {/* Archivos adjuntos */}
            <div>
              <Skeleton className="h-4 w-36 mb-1" />
              <Skeleton className="h-40 w-full" />
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-2 mt-4">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-36" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
