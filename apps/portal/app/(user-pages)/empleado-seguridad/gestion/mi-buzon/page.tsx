import Link from "next/link"
import { Mail, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MiBuzonPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mi Buzón</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/empleado-seguridad/gestion/mi-buzon/solicitudes">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Solicitudes
              </CardTitle>
              <CardDescription>Gestione las solicitudes asignadas a usted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Pendientes: 3</div>
                <div className="text-sm text-gray-500">Total: 6</div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empleado-seguridad/gestion/mi-buzon/visitas">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Visitas
              </CardTitle>
              <CardDescription>Gestione las visitas asignadas a usted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Pendientes: 2</div>
                <div className="text-sm text-gray-500">Total: 5</div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
