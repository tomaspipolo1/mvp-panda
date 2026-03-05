import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, FileText, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function FacturacionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Facturación</h1>
        <p className="text-gray-600">Gestiona la facturación y cuenta corriente de tu empresa</p>
      </div>

      {/* Resumen de Facturación */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturas Emitidas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monto Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.450.000</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobrado</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$1.850.000</div>
            <p className="text-xs text-muted-foreground">
              75% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$600.000</div>
            <p className="text-xs text-muted-foreground">
              25% del total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Opciones de Facturación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/empresa-servicios-portuarios/gestion/facturacion/mi-cuenta-corriente">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Mi Cuenta Corriente
              </CardTitle>
              <CardDescription>
                Consulta el estado de tu cuenta y movimientos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Revisa saldos, movimientos y extractos de tu cuenta corriente.
              </p>
              <Button variant="outline" className="w-full">
                Ver Cuenta Corriente
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empresa-servicios-portuarios/gestion/facturacion/mis-facturas">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Mis Facturas
              </CardTitle>
              <CardDescription>
                Gestiona y consulta todas tus facturas emitidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Visualiza, descarga y gestiona el historial completo de facturas.
              </p>
              <Button variant="outline" className="w-full">
                Ver Facturas
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
