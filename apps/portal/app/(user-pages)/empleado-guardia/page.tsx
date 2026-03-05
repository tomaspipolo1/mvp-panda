"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, PlusCircle } from "lucide-react"

export default function EmpleadoGuardiaPage() {
  const router = useRouter()

  // Redirigir automáticamente a la página de visitas
  useEffect(() => {
    router.push("/empleado-guardia/visita")
  }, [router])

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-8 py-6">
      <h1 className="text-3xl font-bold mb-8">Portal de Guardia</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => router.push("/empleado-guardia/visita")}
        >
          <CardHeader className="bg-plp-primary text-white">
            <CardTitle className="text-2xl flex items-center">
              <Eye className="mr-2 h-6 w-6" />
              Visitas
            </CardTitle>
            <CardDescription className="text-plp-lightest">Gestionar visitas programadas</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg mb-4">Consultar y gestionar las visitas programadas para hoy.</p>
            <Button size="lg" className="w-full text-lg py-6">
              Ver Visitas
            </Button>
          </CardContent>
        </Card>

        <Card
          className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => router.push("/empleado-guardia/nueva-visita")}
        >
          <CardHeader className="bg-plp-secondary text-white">
            <CardTitle className="text-2xl flex items-center">
              <PlusCircle className="mr-2 h-6 w-6" />
              Nueva Visita
            </CardTitle>
            <CardDescription className="text-plp-lightest">Registrar una nueva visita</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg mb-4">Registrar una nueva visita no programada al puerto.</p>
            <Button size="lg" variant="secondary" className="w-full text-lg py-6">
              Registrar Visita
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
