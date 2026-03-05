"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, ChevronLeft } from "lucide-react"
import type { LicenciaOrdinaria, DiaTramite } from "./types"

interface LicenciasSectionProps {
  licenciaOrdinaria: LicenciaOrdinaria[]
  diaTramite?: DiaTramite
  vacacionesAbierto: boolean
  setVacacionesAbierto: (open: boolean) => void
}

export function LicenciasSection({
  licenciaOrdinaria,
  diaTramite,
  vacacionesAbierto,
  setVacacionesAbierto,
}: LicenciasSectionProps) {
  return (
    <div className="mb-6">
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b flex flex-row items-center justify-between">
          <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
            <div className="p-2 bg-green-100 rounded-lg">
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
            Licencias y días disponibles
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={vacacionesAbierto ? "Ocultar" : "Mostrar"}
            onClick={() => setVacacionesAbierto(!vacacionesAbierto)}
          >
            {vacacionesAbierto ? (
              <ChevronLeft className="h-5 w-5 transform rotate-90 transition-transform" />
            ) : (
              <ChevronLeft className="h-5 w-5 transform -rotate-90 transition-transform" />
            )}
          </Button>
        </CardHeader>
        {vacacionesAbierto && (
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              <span className="text-base font-semibold text-gray-700 text-center col-span-3 md:col-span-3">
                Licencia ordinaria Anual
              </span>
              <span className="text-base font-semibold text-gray-700 text-center">Día de trámite</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {licenciaOrdinaria.map(({ periodo, dias }) => (
                <div
                  key={"anual-" + periodo}
                  className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-green-100 py-8 px-4"
                >
                  <span className="text-lg text-gray-500 mb-2">Periodo</span>
                  <span className="text-2xl font-semibold text-gray-800 mb-2">{periodo}</span>
                  <span className="text-4xl font-bold text-green-700 mb-1">{dias}</span>
                  <span className="text-base text-gray-600">Días hábiles</span>
                </div>
              ))}
              {/* Día de Trámite */}
              {diaTramite && (
                <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-blue-100 py-8 px-4">
                  <span className="text-lg text-gray-500 mb-2">Período</span>
                  <span className="text-2xl font-semibold text-gray-800 mb-2">
                    {new Date().getFullYear()}
                  </span>
                  <span className="text-4xl font-bold text-blue-700 mb-1">{diaTramite.dias}</span>
                  <span className="text-base text-gray-600">Días disponibles</span>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
