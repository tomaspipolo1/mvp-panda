"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DocumentPreviewModal } from "@/components/ui/document-preview-modal"
import { useIsMobile } from "@/hooks/use-mobile"
import { VisitaCard } from "@/components/empleado-guardia/visita-card"
import { visitasData } from "./data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VisitaPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEstado, setSelectedEstado] = useState("Todos")
  const [selectedVisita, setSelectedVisita] = useState<any>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [filtroTemporal, setFiltroTemporal] = useState("Hoy")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showDocumentPreview, setShowDocumentPreview] = useState(false)
  const isMobile = useIsMobile()

  // Función para filtrar visitas por período
  const filtrarVisitasPorPeriodo = (visitas: any[], filtro: string) => {
    const hoy = new Date()
    const fechaHoy = `${hoy.getDate().toString().padStart(2, "0")}/${(hoy.getMonth() + 1).toString().padStart(2, "0")}/${hoy.getFullYear()}`

    switch (filtro) {
      case "Hoy":
        return visitas.filter((v) => v.fecha === fechaHoy)
      case "Semana":
        // Simulación de filtro por semana (para demo)
        return visitas.filter((v) => ["30/04/2023", "01/05/2023", "02/05/2023"].includes(v.fecha))
      case "Mes":
        // Simulación de filtro por mes (para demo)
        return visitas
      default:
        return visitas
    }
  }

  // Prepara las visitas para búsqueda por personas
  const visitasConPersonasList = filtrarVisitasPorPeriodo(visitasData, filtroTemporal).map((visita) => ({
    ...visita,
    personasList: visita.personasList || visita.personas || []
  }))
  const filteredVisitas = visitasConPersonasList
    .filter((visita) => {
      if (selectedEstado !== "Todos" && visita.estado !== selectedEstado) return false;
      const term = searchTerm.toLowerCase();
      const personasArr = Array.isArray(visita.personasList) ? visita.personasList : [];
      const personas = personasArr
        .map((p: any) => p.nombre?.toLowerCase?.() || "")
        .join(" ");
      return (
        visita.id.toLowerCase().includes(term) ||
        visita.solicitante.toLowerCase().includes(term) ||
        visita.empresa.toLowerCase().includes(term) ||
        visita.sitio.toLowerCase().includes(term) ||
        personas.includes(term)
      );
    });

  // Estado local para actualizar el estado de la visita seleccionada
  const [visitas, setVisitas] = useState(visitasData)

  const handleVerDetalle = (visita: any) => {
    router.push(`/empleado-guardia/visita/detalle?id=${visita.id}`)
  }

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowDocumentPreview(true)
  }

  const handleFinalizarVisita = () => {
    if (!selectedVisita) return
    setVisitas((prev) =>
      prev.map((v) =>
        v.id === selectedVisita.id ? { ...v, estado: "Finalizada" } : v
      )
    )
    setShowDialog(false)
  }
//
  return (
    <div className={`flex flex-col py-4 md:py-6 px-4 md:px-8 ${isMobile ? 'ml-16' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Visitas de {filtroTemporal}</h1>

        <div className="flex items-center gap-2">
          {isMobile ? (
            <Select value={filtroTemporal} onValueChange={setFiltroTemporal}>
              <SelectTrigger className="w-32 bg-gray-100 rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hoy">Hoy</SelectItem>
                <SelectItem value="Semana">Semana</SelectItem>
                <SelectItem value="Mes">Mes</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="flex bg-gray-100 rounded-md p-1">
              <Button
                variant={filtroTemporal === "Hoy" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFiltroTemporal("Hoy")}
                className="rounded-md"
              >
                Hoy
              </Button>
              <Button
                variant={filtroTemporal === "Semana" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFiltroTemporal("Semana")}
                className="rounded-md"
              >
                Semana
              </Button>
              <Button
                variant={filtroTemporal === "Mes" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFiltroTemporal("Mes")}
                className="rounded-md"
              >
                Mes
              </Button>
            </div>
          )}

          <Button
            onClick={() => router.push("/empleado-guardia/nueva-visita")}
            className="bg-blue-900 hover:bg-blue-800 flex items-center justify-center"
            size={isMobile ? "icon" : undefined}
          >
            <PlusCircle className={isMobile ? "h-5 w-5" : "mr-2 h-4 w-4"} />
            {!isMobile && <span>Nueva Visita</span>}
          </Button>
        </div>
      </div>

      <div className="relative mb-6 flex flex-col gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            className="pl-10 py-2"
            placeholder="Buscar por ID, solicitante, empresa, sitio o persona..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { value: "Todos", label: "Todos", activeBg: "bg-[#1f1e38] text-white", border: "border-transparent text-[#1f1e38]" },
            { value: "Pendiente", label: "Pendientes", border: "border-amber-500 text-amber-600", activeBg: "bg-amber-500 text-white" },
            { value: "Aceptada", label: "Aprobadas", border: "border-green-500 text-green-600", activeBg: "bg-green-500 text-white" },
            { value: "En curso", label: "En curso", border: "border-blue-500 text-blue-600", activeBg: "bg-blue-500 text-white" },
            { value: "Finalizada", label: "Finalizadas", border: "border-purple-500 text-purple-600", activeBg: "bg-purple-500 text-white" },
            { value: "Rechazada", label: "Rechazadas", border: "border-red-500 text-red-600", activeBg: "bg-red-500 text-white" },
            { value: "Cancelada", label: "Canceladas", border: "border-red-500 text-red-600", activeBg: "bg-red-500 text-white" },
          ].map((estado) => {
            const isActive = selectedEstado === estado.value
            return (
              <Button
                key={estado.value}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEstado(estado.value)}
                className={`rounded-md border px-3 py-1 text-sm font-semibold ${
                  isActive ? estado.activeBg : `bg-white ${estado.border}`
                }`}
              >
                {estado.label}
              </Button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredVisitas.map((visita) => (
          <VisitaCard key={visita.id} visita={visita} onVerDetalle={handleVerDetalle} />
        ))}
      </div>

      {filteredVisitas.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay visitas para mostrar</p>
        </div>
      )}

      {/* Modal de vista previa de documentos */}
      <DocumentPreviewModal
        isOpen={showDocumentPreview}
        onClose={() => setShowDocumentPreview(false)}
        document={selectedDocument}
      />
    </div>
  )
}
