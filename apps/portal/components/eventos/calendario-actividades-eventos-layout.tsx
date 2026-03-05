"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Calendario from "@/components/calendario/calendario"
import ModalEvento from "@/components/eventos/modal-evento"
import ModalConfirmacionEvento from "@/components/eventos/modal-confirmacion-evento"
import CrearEventoModal from "@/components/eventos/crear-evento-modal"
import { CardActividadEvento } from "@/components/eventos/card-actividad-evento"
import type { ActividadEvento, TipoItemCalendario } from "@/components/eventos/types-calendario"

export interface CalendarioActividadesEventosLayoutProps {
  /** Listado de actividades y eventos (pueden tener tipoItem para filtrar por tab) */
  items: ActividadEvento[]
  onItemsChange: (items: ActividadEvento[]) => void
  /** Si true, muestra el tab "Eventos" además de "Actividades" (solo rol Prensa). Por defecto false. */
  mostrarTabEventos?: boolean
}

export function CalendarioActividadesEventosLayout({
  items,
  onItemsChange,
  mostrarTabEventos = false,
}: CalendarioActividadesEventosLayoutProps) {
  const [tab, setTab] = useState<TipoItemCalendario>("actividad")
  const [selectedItem, setSelectedItem] = useState<ActividadEvento | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmacionTitulo, setConfirmacionTitulo] = useState("")
  const [accionConfirmacion, setAccionConfirmacion] = useState<"crear" | "actualizar">("crear")
  const [itemParaEditar, setItemParaEditar] = useState<ActividadEvento | null>(null)

  const filteredItems = mostrarTabEventos
    ? tab === "actividad"
      ? items.filter((i) => !i.tipoItem || i.tipoItem === "actividad")
      : items.filter((i) => !i.tipoItem || i.tipoItem === "evento")
    : items.filter((i) => !i.tipoItem || i.tipoItem === "actividad")

  const handleEventClick = (evento: { id: number }) => {
    const item = items.find((i) => i.id === evento.id)
    if (item) {
      setSelectedItem(item)
      setShowDetailModal(true)
    }
  }

  const handleCardClick = (item: ActividadEvento) => {
    setSelectedItem(item)
    setShowDetailModal(true)
  }

  const handleEdit = (id: number) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      setItemParaEditar(item)
      setShowDetailModal(false)
      setShowCreateModal(true)
    }
  }

  const handleDelete = (id: number) => {
    onItemsChange(items.filter((i) => i.id !== id))
    setShowDetailModal(false)
  }

  const handleGuardarEvento = (data: {
    titulo: string
    descripcion: string
    fechaInicio: Date
    horaInicio: string
    fechaFin: Date
    horaFin: string
    ubicacion: string
    estado: "pendiente" | "en_curso" | "finalizado"
  }) => {
    if (itemParaEditar) {
      const updated = items.map((e) =>
        e.id === itemParaEditar.id
          ? {
              ...e,
              ...data,
              fecha: data.fechaInicio,
              fechaInicio: data.fechaInicio,
              fechaFin: data.fechaFin,
            }
          : e
      )
      onItemsChange(updated)
      setAccionConfirmacion("actualizar")
    } else {
      const numericIds = items.map((e) => Number(e.id)).filter((n) => Number.isFinite(n))
      const nextId = numericIds.length > 0 ? Math.max(0, ...numericIds) + 1 : 1
      const nuevo: ActividadEvento = {
        id: nextId,
        titulo: data.titulo,
        descripcion: data.descripcion,
        fecha: data.fechaInicio,
        fechaInicio: data.fechaInicio,
        horaInicio: data.horaInicio,
        fechaFin: data.fechaFin,
        horaFin: data.horaFin,
        ubicacion: data.ubicacion,
        tipo: "general",
        estado: data.estado,
        tipoItem: mostrarTabEventos ? tab : "actividad",
      }
      onItemsChange([...items, nuevo])
      setAccionConfirmacion("crear")
    }
    setConfirmacionTitulo(data.titulo)
    setShowCreateModal(false)
    setItemParaEditar(null)
    setShowConfirmModal(true)
  }

  const openNueva = () => {
    setItemParaEditar(null)
    setShowCreateModal(true)
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Título, subtítulo, tabs y botón */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestiona actividades y eventos públicos</p>
        </div>
        <div className="flex items-center gap-3">
          {mostrarTabEventos && (
            <Tabs value={tab} onValueChange={(v) => setTab(v as TipoItemCalendario)}>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="actividad" className="data-[state=active]:bg-blue-100 data-[state=active]:text-gray-900">
                  Actividades
                </TabsTrigger>
                <TabsTrigger value="evento" className="data-[state=active]:bg-blue-100 data-[state=active]:text-gray-900">
                  Eventos
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          <Button
            onClick={openNueva}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {mostrarTabEventos && tab === "evento" ? "Nuevo Evento" : "Nueva Actividad"}
          </Button>
        </div>
      </div>

      {/* Grid: calendario a la izquierda, listado a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Calendario
          eventos={items.map((i) => ({
            ...i,
            fecha: i.fecha instanceof Date ? i.fecha : new Date(i.fecha),
          }))}
          onEventClick={handleEventClick}
        />
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {mostrarTabEventos && tab === "evento" ? "Listado de Eventos" : "Listado de Actividades"}
              </h2>
              <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <p className="text-sm text-gray-500 py-4">
                    No hay {mostrarTabEventos && tab === "evento" ? "eventos" : "actividades"}.
                  </p>
                ) : (
                  filteredItems.map((item, index) => (
                    <CardActividadEvento
                      key={Number.isFinite(Number(item.id)) ? item.id : `item-${index}`}
                      item={item}
                      onClick={() => handleCardClick(item)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal detalle */}
      <ModalEvento
        evento={selectedItem}
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal crear/editar */}
      <CrearEventoModal
        open={showCreateModal}
        onOpenChange={(open) => {
          if (!open) setItemParaEditar(null)
          setShowCreateModal(open)
        }}
        onConfirm={handleGuardarEvento}
        eventoEditar={itemParaEditar}
      />

      {/* Modal confirmación */}
      <ModalConfirmacionEvento
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        onConfirm={() => setShowConfirmModal(false)}
        tituloEvento={confirmacionTitulo}
        accion={accionConfirmacion}
      />
    </div>
  )
}
