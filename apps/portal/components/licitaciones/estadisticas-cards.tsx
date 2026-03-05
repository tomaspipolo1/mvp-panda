interface EstadisticasCardsProps {
  totalLicitaciones: number
  pendientes: number
  aprobadas: number
  rechazadas: number
}

export function EstadisticasCards({ totalLicitaciones, pendientes, aprobadas, rechazadas }: EstadisticasCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Total Licitaciones */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">Licitaciones inscriptas</h3>
        <p className="text-plp-darkest text-3xl font-bold mb-2">{totalLicitaciones}</p>
        <p className="text-gray-500 text-sm">En el último año</p>
      </div>

      {/* Pendientes */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">En Proceso</h3>
        <p className="text-amber-500 text-3xl font-bold mb-2">{pendientes}</p>
        <p className="text-gray-500 text-sm">Esperando revisión</p>
      </div>

      {/* Aprobadas */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">Ganadas</h3>
        <p className="text-green-600 text-3xl font-bold mb-2">{aprobadas}</p>
        <p className="text-gray-500 text-sm">Licitaciones ganadas</p>
      </div>

      {/* Rechazadas */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">No Adjudicadas</h3>
        <p className="text-red-600 text-3xl font-bold mb-2">{rechazadas}</p>
        <p className="text-gray-500 text-sm">No autorizadas</p>
      </div>
    </div>
  )
}
