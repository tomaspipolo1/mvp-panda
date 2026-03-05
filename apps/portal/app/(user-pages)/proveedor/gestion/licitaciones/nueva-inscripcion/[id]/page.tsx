"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, Download, FileText, Calendar, DollarSign, MapPin, User, Mail, Printer } from "lucide-react"
import Link from "next/link"
import { ComentarioLicitacionModal } from "@/components/licitaciones/comentario-licitacion-modal"

// Tipo para las licitaciones
type Licitacion = {
  id: string
  numero: string
  expediente: string
  objeto: string
  tipo: "Pública" | "Privada" | "Concurso de precios"
  cierre: string
  apertura: string
  montoEstimado: number
  inscripto: boolean
  estado: "Abierta" | "Cerrada" | "En evaluación" | "Adjudicada" | "Finalizada" | "Cancelada"
  fechaCreacion: string
  descripcion: string
  visitaTecnica: boolean
  fechaVisitaDesde?: string
  fechaVisitaHasta?: string
  lugarVisita?: string
  moneda: string
  responsableContacto: string
  emailContacto: string
  responsableTecnico: string
  emailTecnico: string
  pliego: string
  circulares: { nombre: string; archivo: string }[]
  historial: { estado: string; fecha: string }[]
}

export default function DetalleLicitacionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [isComentarioModalOpen, setIsComentarioModalOpen] = useState(false)
  const [modalTipo, setModalTipo] = useState<"inscripcion" | "rechazo">("inscripcion")

  // Datos de ejemplo para licitaciones
  const licitacionesData: Licitacion[] = [
    {
      id: "1",
      numero: "LIC-2023-0130",
      expediente: "EXP-2023-1045",
      objeto: "Adquisición de mobiliario escolar",
      tipo: "Pública",
      cierre: "10/05/2023",
      apertura: "11/05/2023",
      montoEstimado: 2500000.0,
      inscripto: false,
      estado: "Abierta",
      fechaCreacion: "20/04/2023",
      descripcion: "Se solicita la provisión e instalación de mobiliario escolar para 15 aulas, incluyendo pupitres, sillas, pizarrones y armarios. El mobiliario deberá cumplir con las especificaciones técnicas detalladas en el pliego de condiciones.",
      visitaTecnica: true,
      fechaVisitaDesde: "25/04/2023",
      fechaVisitaHasta: "28/04/2023",
      lugarVisita: "Edificio Central - Puerto La Plata, Av. Principal 1234",
      moneda: "ARS",
      responsableContacto: "Laura Pérez",
      emailContacto: "lperez@puertolaplata.com",
      responsableTecnico: "Ing. Carlos Méndez",
      emailTecnico: "cmendez@puertolaplata.com",
      pliego: "pliego-mobiliario-escolar.pdf",
      circulares: [
        { nombre: "Circular N° 1 - Aclaración sobre especificaciones", archivo: "circular-01.pdf" },
        { nombre: "Circular N° 2 - Prórroga de fecha", archivo: "circular-02.pdf" },
      ],
      historial: [
        { estado: "Creación", fecha: "20/04/2023" },
        { estado: "Abierta", fecha: "20/04/2023" },
      ],
    },
    {
      id: "2",
      numero: "LIC-2023-0129",
      expediente: "EXP-2023-1042",
      objeto: "Servicio de seguridad para edificios públicos",
      tipo: "Privada",
      cierre: "05/05/2023",
      apertura: "06/05/2023",
      montoEstimado: 4800000.0,
      inscripto: true,
      estado: "En evaluación",
      fechaCreacion: "18/04/2023",
      descripcion: "Contratación de servicio de seguridad integral para edificios públicos, incluyendo vigilancia, monitoreo CCTV y control de accesos. Servicio las 24 horas durante 12 meses.",
      visitaTecnica: false,
      moneda: "ARS",
      responsableContacto: "Ana Martínez",
      emailContacto: "amartinez@puertolaplata.com",
      responsableTecnico: "Lic. Roberto Silva",
      emailTecnico: "rsilva@puertolaplata.com",
      pliego: "pliego-seguridad.pdf",
      circulares: [],
      historial: [
        { estado: "Creación", fecha: "18/04/2023" },
        { estado: "Abierta", fecha: "18/04/2023" },
        { estado: "Cerrada", fecha: "05/05/2023" },
        { estado: "En evaluación", fecha: "06/05/2023" },
      ],
    },
  ]

  // Buscar la licitación según el ID
  const licitacion = licitacionesData.find((l) => l.id === resolvedParams.id) || licitacionesData[0]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Abierta":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Abierta</Badge>
      case "Cerrada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cerrada</Badge>
      case "En evaluación":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En evaluación</Badge>
      case "Adjudicada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Adjudicada</Badge>
      case "Finalizada":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">Finalizada</Badge>
      case "Cancelada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const handleInscribirse = () => {
    setTimeout(() => {
      setModalTipo("inscripcion")
      setIsComentarioModalOpen(true)
    }, 100)
  }

  const handleRechazar = () => {
    setTimeout(() => {
      setModalTipo("rechazo")
      setIsComentarioModalOpen(true)
    }, 100)
  }

  const handleSubmitComentario = (comentario: string) => {
    console.log(`${modalTipo} de licitación ${licitacion.numero}`)
    console.log(`Comentario: ${comentario}`)
    const accion = modalTipo === "inscripcion" ? "inscrito" : "rechazado"
    alert(
      `Se ha ${accion} en la licitación ${licitacion.numero} exitosamente.\nSe enviará una notificación a compras@puertolaplata.com`
    )
  }

  const handleDescargar = (archivo: string, nombre: string) => {
    console.log(`Descargando: ${nombre} (${archivo})`)
    alert(`Descargando: ${nombre}`)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/proveedor/gestion/licitaciones/nueva-inscripcion">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Licitación</h1>
            <p className="text-gray-600">
              {licitacion.numero} - {licitacion.objeto}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información básica */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos de la licitación */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Datos de la Licitación</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">N° Expediente:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.expediente}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Tipo Licitación:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.tipo}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Fecha Creación:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.fechaCreacion}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                </div>
                <div>{getEstadoBadge(licitacion.estado)}</div>
              </div>
            </div>
          </div>

          {/* Información general */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Información General</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Objeto:</span>
                <p className="text-sm font-medium">{licitacion.objeto}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Descripción:</span>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{licitacion.descripcion}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Fecha Cierre:</span>
                  </div>
                  <p className="text-sm font-medium">{licitacion.cierre}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Fecha Apertura Sobres:</span>
                  </div>
                  <p className="text-sm font-medium">{licitacion.apertura}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Moneda:</span>
                  </div>
                  <p className="text-sm font-medium">{licitacion.moneda}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Monto Presupuestado (Sin IVA):</span>
                  </div>
                  <p className="text-sm font-medium">{formatCurrency(licitacion.montoEstimado)}</p>
                </div>
              </div>
              
            </div>
          </div>
          {/* visita tecnica */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Visita Técnica</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {/* Fila 1 */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Visita Técnica:</span>
                <p className="text-sm font-medium">{licitacion.visitaTecnica ? "Sí" : "No"}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Fecha Visita Desde:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.visitaTecnica ? licitacion.fechaVisitaDesde : "-"}</p>
              </div>
              
              {/* Fila 2 */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Lugar de Visita Técnica:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.visitaTecnica ? licitacion.lugarVisita : "-"}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Fecha Visita Hasta:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.visitaTecnica ? licitacion.fechaVisitaHasta : "-"}</p>
              </div>
            </div>
          </div>
          {/* Documentación */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Documentación</h2>
            <div className="space-y-3">
              {/* Pliego */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                <div className="flex items-center flex-1">
                  <FileText className="h-4 w-4 text-blue-600 mr-3" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">Pliego de Condiciones</div>
                    <div className="text-xs text-gray-500 mt-1">{licitacion.pliego}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDescargar(licitacion.pliego, "Pliego de Condiciones")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </div>

              {/* Circulares */}
              {licitacion.circulares.length > 0 && (
                <>
                  <div className="pt-2">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Circulares</h3>
                  </div>
                  {licitacion.circulares.map((circular, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                    >
                      <div className="flex items-center flex-1">
                        <FileText className="h-4 w-4 text-green-600 mr-3" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700">{circular.nombre}</div>
                          <div className="text-xs text-gray-500 mt-1">{circular.archivo}</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDescargar(circular.archivo, circular.nombre)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </>
              )}

              {licitacion.circulares.length === 0 && (
                <div className="text-sm text-gray-500 italic">No hay circulares disponibles</div>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha - Acciones */}
        <div className="space-y-6">
          {/* Acciones */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Acciones</h2>
            <div className="space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleInscribirse}
                disabled={licitacion.inscripto}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {licitacion.inscripto ? "Ya inscripto" : "Inscribirme"}
              </Button>
              {(licitacion.tipo === "Privada" || licitacion.tipo === "Concurso de precios") && (
                <Button
                  variant="outline"
                  className="w-full bg-red-600 text-white hover:bg-red-700"
                  onClick={handleRechazar}
                  disabled={licitacion.inscripto}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Rechazar
                </Button>
              )}
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Contacto</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Responsable Contacto:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.responsableContacto}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Email Responsable:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.emailContacto}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Responsable Técnico Visita:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.responsableTecnico}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Email Técnico:</span>
                </div>
                <p className="text-sm font-medium">{licitacion.emailTecnico}</p>
              </div>
            </div>
          </div>

          {/* Historial de Estado */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Historial de Estados</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {licitacion.historial.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      idx === 0 ? "bg-green-500" : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.estado}</div>
                    <div className="text-xs text-gray-500">{item.fecha}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de comentario */}
      <ComentarioLicitacionModal
        isOpen={isComentarioModalOpen}
        onClose={() => setIsComentarioModalOpen(false)}
        onSubmit={handleSubmitComentario}
        licitacionNumero={licitacion.numero}
        tipo={modalTipo}
      />
    </div>
  )
}

