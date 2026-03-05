"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Calendar, Clock, MapPin, Users, User, Building, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

// Tipos de datos para eventos
export type ParticipanteEvento = {
  id: string
  nombreCompleto: string
  dni: string
  correo: string
  telefono: string
}

export type HistorialEstado = {
  id: string
  estado: string
  fecha: string
  usuario: string
}

export type EventoDetalle = {
  id: string
  numero: string
  titulo: string
  descripcion: string
  ubicacion: string
  direccion: string
  fechaDesde: string
  fechaHasta: string
  horaDesde: string
  horaHasta: string
  estado: "Pendiente" | "En curso" | "Finalizado" | "Aprobado" | "Rechazado" | "Cancelado"
  imagen?: string
  participantes?: ParticipanteEvento[]
  creador: {
    nombre: string
    departamento: string
  }
  historialEstados: HistorialEstado[]
}

interface DetalleEventoComponentProps {
  evento: EventoDetalle
  backUrl: string
}

export function DetalleEventoComponent({
  evento,
  backUrl,
}: DetalleEventoComponentProps) {
  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
      case "Rechazado":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
      case "Cancelado":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelado</Badge>
      case "En curso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En curso</Badge>
      case "Finalizado":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Finalizado</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const mostrarParticipantes = (evento.estado === "Aprobado" || evento.estado === "En curso" || evento.estado === "Finalizado") && evento.participantes && evento.participantes.length > 0

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={backUrl}>
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle Evento</h1>
            <p className="text-gray-600">
              {evento.numero} - {evento.titulo}
            </p>
          </div>
        </div>
      </div>

      {/* Información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información básica */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detalle del evento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Detalle del evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Número evento:</span>
                  </div>
                  <p className="text-sm font-medium">{evento.numero}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                  </div>
                  <div>{renderEstadoBadge(evento.estado)}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Título del evento:</span>
                  </div>
                  <p className="text-sm font-medium">{evento.titulo}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Ubicación:</span>
                  </div>
                  <p className="text-sm font-medium">{evento.ubicacion}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Descripción:</span>
                  </div>
                  <p className="text-sm font-medium">{evento.descripcion}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fechas y horarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Fechas y horarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Fecha desde:</span>
                  <p className="text-sm font-medium">{evento.fechaDesde}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Fecha hasta:</span>
                  <p className="text-sm font-medium">{evento.fechaHasta}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Hora desde:</span>
                  <p className="text-sm font-medium">{evento.horaDesde}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Hora hasta:</span>
                  <p className="text-sm font-medium">{evento.horaHasta}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personas - Solo si está aprobada y tiene participantes */}
          {mostrarParticipantes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personas inscritas ({evento.participantes?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nombre completo</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">DNI</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Correo</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Teléfono</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evento.participantes?.map((participante, idx) => (
                        <tr key={participante.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="py-2 px-4 text-sm text-gray-800">{participante.nombreCompleto}</td>
                          <td className="py-2 px-4 text-sm text-gray-800">{participante.dni}</td>
                          <td className="py-2 px-4 text-sm text-gray-800">{participante.correo}</td>
                          <td className="py-2 px-4 text-sm text-gray-800">{participante.telefono}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Imagen y Creador */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Imagen y Creador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Imagen */}
              <div>
                <span className="text-sm font-medium text-gray-500 mb-2 block">Imagen del evento:</span>
                {evento.imagen ? (
                  <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={evento.imagen} 
                      alt={evento.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}
              </div>

              {/* Creador */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Creador del evento:</span>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium">{evento.creador.nombre}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{evento.creador.departamento}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado - Historial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Historial de estados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evento.historialEstados.map((historial, idx) => (
                  <div key={historial.id} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      idx === 0 ? 'bg-blue-500' : 
                      idx === evento.historialEstados.length - 1 ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{historial.estado}</span>
                        <span className="text-xs text-gray-500">{historial.fecha}</span>
                      </div>
                      <p className="text-xs text-gray-600">{historial.usuario}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
