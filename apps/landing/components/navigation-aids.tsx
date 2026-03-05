import { Droplets, Wind, Thermometer, Waves } from "lucide-react"

export function NavigationAids() {
  return (
    <section className="py-16" style={{ backgroundColor: '#CAE6FF' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#1B1E4A' }}>
          Ayudas a la navegación
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Marea */}
          <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#1B1E4A' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-white">Marea</h3>
              <Waves className="h-7 w-7" style={{ color: '#CAE6FF' }} />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Altura actual:</span>
                <span className="font-bold text-white text-sm">1.2 m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Próxima pleamar:</span>
                <span className="font-bold text-white text-sm">15:45 hs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Altura pleamar:</span>
                <span className="font-bold text-white text-sm">1.8 m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Próxima bajamar:</span>
                <span className="font-bold text-white text-sm">21:30 hs</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-white/20">
              <span className="text-xs text-white/60">Actualizado: Hoy 13:45 hs</span>
            </div>
          </div>

          {/* Viento */}
          <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#1B1E4A' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-white">Viento</h3>
              <Wind className="h-7 w-7" style={{ color: '#CAE6FF' }} />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Velocidad:</span>
                <span className="font-bold text-white text-sm">18 km/h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Dirección:</span>
                <span className="font-bold text-white text-sm">NE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Ráfagas:</span>
                <span className="font-bold text-white text-sm">25 km/h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Presión:</span>
                <span className="font-bold text-white text-sm">1013 hPa</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-white/20">
              <span className="text-xs text-white/60">Actualizado: Hoy 13:45 hs</span>
            </div>
          </div>

          {/* Temperatura */}
          <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#1B1E4A' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-white">Temperatura</h3>
              <Thermometer className="h-7 w-7" style={{ color: '#CAE6FF' }} />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Actual:</span>
                <span className="font-bold text-white text-sm">24°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Sensación térmica:</span>
                <span className="font-bold text-white text-sm">26°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Máxima hoy:</span>
                <span className="font-bold text-white text-sm">28°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Mínima hoy:</span>
                <span className="font-bold text-white text-sm">18°C</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-white/20">
              <span className="text-xs text-white/60">Actualizado: Hoy 13:45 hs</span>
            </div>
          </div>

          {/* Humedad */}
          <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#1B1E4A' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-white">Humedad</h3>
              <Droplets className="h-7 w-7" style={{ color: '#CAE6FF' }} />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Humedad relativa:</span>
                <span className="font-bold text-white text-sm">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Punto de rocío:</span>
                <span className="font-bold text-white text-sm">17°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Visibilidad:</span>
                <span className="font-bold text-white text-sm">10 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Índice UV:</span>
                <span className="font-bold text-white text-sm">6 (Alto)</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-white/20">
              <span className="text-xs text-white/60">Actualizado: Hoy 13:45 hs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
