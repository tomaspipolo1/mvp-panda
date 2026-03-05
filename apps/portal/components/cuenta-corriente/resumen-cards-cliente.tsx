import { CalendarDays, TrendingUp } from "lucide-react"

interface ResumenCardsClienteProps {
  saldoActual: {
    monto: string
    fechaActualizacion: string
  }
  proximoVencimiento: {
    fecha: string
    factura: string
  }
  montoFacturado2025: {
    monto: string
  }
}

export function ResumenCardsCliente({
  saldoActual,
  proximoVencimiento,
  montoFacturado2025,
}: ResumenCardsClienteProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Saldo Actual */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">Saldo Actual</h3>
        <p className="text-green-600 text-3xl font-bold mb-2">{saldoActual.monto}</p>
        <p className="text-gray-500 text-sm">Actualizado: {saldoActual.fechaActualizacion}</p>
      </div>

      {/* Próximo Vencimiento */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">Próximo Vencimiento</h3>
        <div className="flex items-center">
          <CalendarDays className="text-plp-dark mr-2" />
          <p className="text-plp-darkest text-3xl font-bold">{proximoVencimiento.fecha}</p>
        </div>
        <p className="text-gray-500 text-sm mt-2">Factura: {proximoVencimiento.factura}</p>
      </div>

      {/* Monto Facturado 2025 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">Monto Facturado 2025</h3>
        <div className="flex items-center">
          <TrendingUp className="text-plp-dark mr-2" />
          <p className="text-plp-darkest text-3xl font-bold">{montoFacturado2025.monto}</p>
        </div>
        <p className="text-gray-500 text-sm mt-2">Total con IVA incluido</p>
      </div>
    </div>
  )
}
