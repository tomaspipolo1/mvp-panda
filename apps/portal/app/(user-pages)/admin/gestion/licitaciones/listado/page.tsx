"use client"

import { useState } from "react"
import { Printer, FileDown, Plus, Download, Eye, Mail, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FiltrosLicitaciones } from "@/components/licitaciones/filtros-licitaciones"
import { TablaLicitacionesCompras, type Licitacion } from "@/components/licitaciones/tabla-licitaciones-compras"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VerOfertasModal } from "@/components/licitaciones/ver-ofertas-modal"
import { AnunciarAdjudicacionModal } from "@/components/licitaciones/anunciar-adjudicacion-modal"
import { toast } from "@/components/ui/use-toast"
import { CancelarLicitacionModal } from "@/components/licitaciones/cancelar-licitacion-modal"
import { ProveedoresRegistradosModal } from "@/components/licitaciones/proveedores-registrados-modal"
import { ProveedoresInvitados, type Proveedor } from "@/components/licitaciones/proveedores-invitados"

// Datos de ejemplo para licitaciones con todos los estados
const licitacionesData: Licitacion[] = [
  {
    id: "1",
    numero: "LIC-2023-0125",
    tipoLicitacion: "Publica",
    titulo: "Suministro de equipos informáticos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "15/04/2023",
    fechaCierre: "30/04/2023",
    montoEstimado: 1250000,
    estado: "en evaluacion",
  },
  {
    id: "2",
    numero: "LIC-2023-0118",
    tipoLicitacion: "Publica",
    titulo: "Servicio de mantenimiento de edificios",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "01/03/2023",
    fechaCierre: "15/03/2023",
    montoEstimado: 3500000,
    estado: "finalizada",
  },
  {
    id: "3",
    numero: "LIC-2023-0110",
    tipoLicitacion: "Privada",
    titulo: "Provisión de insumos médicos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "15/02/2023",
    fechaCierre: "28/02/2023",
    montoEstimado: 2750000,
    estado: "adjudicada",
    proveedorAdjudicado: {
      nombre: "MediSupplies S.A.",
      monto: 2680000,
    },
  },
  {
    id: "4",
    numero: "LIC-2023-0105",
    tipoLicitacion: "Publica",
    titulo: "Construcción de escuela primaria",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "10/01/2023",
    fechaCierre: "25/01/2023",
    montoEstimado: 15000000,
    estado: "finalizada",
  },
  {
    id: "5",
    numero: "LIC-2022-0098",
    tipoLicitacion: "Concurso de precios",
    titulo: "Servicio de limpieza de oficinas",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "05/12/2022",
    fechaCierre: "20/12/2022",
    montoEstimado: 1800000,
    estado: "cancelada",
  },
  {
    id: "6",
    numero: "LIC-2023-0130",
    tipoLicitacion: "Publica",
    titulo: "Adquisición de vehículos oficiales",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "01/12/2025",
    fechaCierre: "15/12/2025",
    montoEstimado: 8500000,
    estado: "abierta",
  },
  {
    id: "7",
    numero: "LIC-2023-0135",
    tipoLicitacion: "Publica",
    titulo: "Renovación de mobiliario de oficinas",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "10/05/2023",
    fechaCierre: "25/05/2023",
    montoEstimado: 4200000,
    estado: "cerrada",
  },
  {
    id: "8",
    numero: "LIC-2023-0140",
    tipoLicitacion: "Privada",
    titulo: "Servicios de seguridad y vigilancia",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "20/03/2023",
    fechaCierre: "05/04/2023",
    montoEstimado: 5800000,
    estado: "adjudicada",
    proveedorAdjudicado: {
      nombre: "Seguridad Integral S.R.L.",
      monto: 5650000,
    },
  },
]

export default function ListadoLicitacionesPage() {
  const router = useRouter()
  const [selectedLicitacion, setSelectedLicitacion] = useState<Licitacion | null>(null)
  const [filteredLicitaciones, setFilteredLicitaciones] = useState<Licitacion[]>(licitacionesData)

  // Estado para el modal de ofertas
  const [openOfertasDialog, setOpenOfertasDialog] = useState(false)
  const [licitacionOfertas, setLicitacionOfertas] = useState<Licitacion | null>(null)

  // Agregar estados para el modal de adjudicación
  const [openAdjudicacionDialog, setOpenAdjudicacionDialog] = useState(false)
  const [licitacionAdjudicacion, setLicitacionAdjudicacion] = useState<Licitacion | null>(null)

  // Agregar estados para el modal de cancelación
  const [openCancelacionDialog, setOpenCancelacionDialog] = useState(false)
  const [licitacionCancelacion, setLicitacionCancelacion] = useState<Licitacion | null>(null)

  // Agregar estados para el modal de proveedores registrados
  const [openProveedoresDialog, setOpenProveedoresDialog] = useState(false)
  const [licitacionProveedores, setLicitacionProveedores] = useState<Licitacion | null>(null)

  // Agregar estados para el modal de invitar proveedor
  const [openInvitarProveedorDialog, setOpenInvitarProveedorDialog] = useState(false)
  const [licitacionInvitarProveedor, setLicitacionInvitarProveedor] = useState<Licitacion | null>(null)
  const [proveedoresInvitados, setProveedoresInvitados] = useState<Proveedor[]>([])

  const handleEditar = (licitacion: Licitacion) => {
    if (licitacion.estado !== "abierta") {
      // Mostrar un mensaje o alerta indicando que solo se pueden editar licitaciones abiertas
      alert("Solo se pueden editar licitaciones en estado ABIERTA")
      return
    }

    // Redirigir a la página de edición
    router.push(`/admin/gestion/licitaciones/editar/${licitacion.id}`)
  }

  const handleVisualizar = (licitacion: Licitacion) => {
    // Redirigir a la página de detalle
    router.push(`/admin/gestion/licitaciones/detalle/${licitacion.id}`)
  }

  const handleVerOfertas = (licitacion: Licitacion) => {
    setTimeout(() => {
      setLicitacionOfertas(licitacion)
      setOpenOfertasDialog(true)
    }, 0)
  }

  const handleVerProveedores = (licitacion: Licitacion) => {
    setTimeout(() => {
      setLicitacionProveedores(licitacion)
      setOpenProveedoresDialog(true)
    }, 0)
  }

  // Agregar la función para manejar la acción de anunciar adjudicación
  const handleAnunciarAdjudicacion = (licitacion: Licitacion) => {
    setTimeout(() => {
      setLicitacionAdjudicacion(licitacion)
      setOpenAdjudicacionDialog(true)
    }, 0)
  }

  // Agregar la función para manejar la acción de cancelar licitación
  const handleCancelarLicitacion = (licitacion: Licitacion) => {
    setTimeout(() => {
      setLicitacionCancelacion(licitacion)
      setOpenCancelacionDialog(true)
    }, 0)
  }

  // Agregar la función para manejar la adjudicación
  const handleAdjudicar = (ofertaId: string, proveedorNombre: string, montoOferta: number) => {
    // Actualizar el estado de la licitación a "adjudicada"
    if (licitacionAdjudicacion) {
      const updatedLicitaciones = filteredLicitaciones.map((l) => {
        if (l.id === licitacionAdjudicacion.id) {
          return {
            ...l,
            estado: "adjudicada" as const,
            proveedorAdjudicado: {
              nombre: proveedorNombre,
              monto: montoOferta,
            },
          }
        }
        return l
      })

      setFilteredLicitaciones(updatedLicitaciones)

      // Mostrar notificación de éxito
      toast({
        title: "Licitación adjudicada",
        description: `Se ha adjudicado la licitación ${licitacionAdjudicacion.numero} a ${proveedorNombre} por un monto de $${montoOferta.toLocaleString()}.`,
      })

      // Simular envío de notificaciones
      console.log(`Enviando notificación de adjudicación a ${proveedorNombre}`)
      console.log("Enviando notificaciones de no selección a los demás proveedores")

      // Cerrar el modal y limpiar el estado
      setOpenAdjudicacionDialog(false)
      setLicitacionAdjudicacion(null)
    }
  }

  // Agregar la función para manejar la cancelación
  const handleCancelar = (motivo: string) => {
    // Actualizar el estado de la licitación a "cancelada"
    if (licitacionCancelacion) {
      const updatedLicitaciones = filteredLicitaciones.map((l) => {
        if (l.id === licitacionCancelacion.id) {
          return {
            ...l,
            estado: "cancelada" as const,
          }
        }
        return l
      })

      setFilteredLicitaciones(updatedLicitaciones)

      // Mostrar notificación de éxito
      toast({
        title: "Licitación cancelada",
        description: `Se ha cancelado la licitación ${licitacionCancelacion.numero}. Motivo: ${motivo}`,
      })

      // Simular envío de notificaciones
      console.log(`Enviando notificación de cancelación a todos los proveedores inscritos`)
      console.log(`Motivo de cancelación: ${motivo}`)

      // Cerrar el modal y limpiar el estado
      setOpenCancelacionDialog(false)
      setTimeout(() => {
        setLicitacionCancelacion(null)
      }, 100)
    }
  }

  const handleCloseAdjudicacionModal = () => {
    // Asegurarse de limpiar completamente el estado
    setOpenAdjudicacionDialog(false)
    setTimeout(() => {
      setLicitacionAdjudicacion(null)
    }, 100)
  }

  const handleCloseCancelacionModal = () => {
    // Asegurarse de limpiar completamente el estado
    setOpenCancelacionDialog(false)
    setTimeout(() => {
      setLicitacionCancelacion(null)
    }, 100)
  }

  const handleNuevaLicitacion = () => {
    router.push("/admin/gestion/licitaciones/nueva")
  }

  const handleVerEstados = () => {
    router.push("/admin/gestion/licitaciones/estados")
  }

  const handleFilter = (filters: any) => {
    let result = [...licitacionesData]

    // Filtrar por número de licitación
    if (filters.numeroLicitacion) {
      result = result.filter((l) => l.numero.toLowerCase().includes(filters.numeroLicitacion.toLowerCase()))
    }

    // Filtrar por estado
    if (filters.estado && filters.estado !== "todos") {
      result = result.filter((l) => l.estado === filters.estado)
    }

    // Filtrar por fecha desde
    if (filters.fechaDesde) {
      const fechaDesde = new Date(filters.fechaDesde)
      result = result.filter((l) => {
        const partes = l.fechaApertura.split("/")
        const fechaApertura = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
        return fechaApertura >= fechaDesde
      })
    }

    // Filtrar por fecha hasta
    if (filters.fechaHasta) {
      const fechaHasta = new Date(filters.fechaHasta)
      result = result.filter((l) => {
        const partes = l.fechaCierre.split("/")
        const fechaCierre = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
        return fechaCierre <= fechaHasta
      })
    }

    setFilteredLicitaciones(result)
  }

  // Función para enviar correo a un proveedor
  const handleEnviarCorreo = (correo: string) => {
    console.log("Enviar correo a:", correo)
    // Aquí iría la lógica para abrir un modal de envío de correo o similar
  }

  // Función para manejar la acción de invitar proveedor
  const handleInvitarProveedor = (licitacion: Licitacion) => {
    setLicitacionInvitarProveedor(licitacion)
    setOpenInvitarProveedorDialog(true)
    // Reiniciar la lista de proveedores invitados al abrir el modal
    setProveedoresInvitados([])
  }

  const handleAddProveedor = (nuevoProveedor: Omit<Proveedor, "id">) => {
    const proveedorConId: Proveedor = {
      id: Date.now().toString(),
      ...nuevoProveedor,
    }
    setProveedoresInvitados([...proveedoresInvitados, proveedorConId])
  }

  const handleRemoveProveedor = (id: string) => {
    setProveedoresInvitados(proveedoresInvitados.filter((proveedor) => proveedor.id !== id))
  }

  const handleCloseInvitarProveedorModal = () => {
    setOpenInvitarProveedorDialog(false)
    setTimeout(() => {
      setLicitacionInvitarProveedor(null)
      setProveedoresInvitados([])
    }, 100)
  }

  const handleConfirmarInvitaciones = () => {
    if (proveedoresInvitados.length === 0) {
      toast({
        title: "Sin proveedores seleccionados",
        description: "Debe agregar al menos un proveedor para enviar las invitaciones.",
        variant: "destructive",
      })
      return
    }

    // Aquí iría la lógica para enviar las invitaciones
    toast({
      title: "Invitaciones enviadas",
      description: `Se han enviado ${proveedoresInvitados.length} invitación(es) para la licitación ${licitacionInvitarProveedor?.numero}.`,
    })

    handleCloseInvitarProveedorModal()
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Listado de Licitaciones</h1>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center" onClick={handleVerEstados}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Estados
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ver información sobre los estados de licitación</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" className="flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="flex items-center" onClick={handleNuevaLicitacion}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Licitación
          </Button>
        </div>
      </div>
      {/* Filtros */}
      <FiltrosLicitaciones onFilter={handleFilter} />

      {/* Tabla de Licitaciones */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <TablaLicitacionesCompras
          licitaciones={filteredLicitaciones}
          onEditar={handleEditar}
          onVisualizar={handleVisualizar}
          onVerOfertas={handleVerOfertas}
          onVerProveedores={handleVerProveedores}
          onAnunciarAdjudicacion={handleAnunciarAdjudicacion}
          onCancelarLicitacion={handleCancelarLicitacion}
          onInvitarProveedor={handleInvitarProveedor}
        />
      </div>

      {/* Detalle de Licitación Dialog */}
      {/* Modal de Ver Ofertas */}
      {licitacionOfertas && (
        <VerOfertasModal
          isOpen={openOfertasDialog}
          onClose={() => {
            setOpenOfertasDialog(false)
            setTimeout(() => setLicitacionOfertas(null), 100)
          }}
          licitacionId={licitacionOfertas.id}
          licitacionTitulo={licitacionOfertas.titulo}
          estado={licitacionOfertas.estado}
        />
      )}

      {/* Modal de Anunciar Adjudicación */}
      {licitacionAdjudicacion && (
        <AnunciarAdjudicacionModal
          isOpen={openAdjudicacionDialog}
          onClose={handleCloseAdjudicacionModal}
          licitacionId={licitacionAdjudicacion.id}
          licitacionTitulo={licitacionAdjudicacion.titulo}
          licitacionNumero={licitacionAdjudicacion.numero}
          onAdjudicar={handleAdjudicar}
        />
      )}

      {/* Modal de Cancelar Licitación */}
      {licitacionCancelacion && (
        <CancelarLicitacionModal
          isOpen={openCancelacionDialog}
          onClose={handleCloseCancelacionModal}
          licitacionId={licitacionCancelacion.id}
          licitacionTitulo={licitacionCancelacion.titulo}
          licitacionNumero={licitacionCancelacion.numero}
          onCancelar={handleCancelar}
        />
      )}

      {/* Modal de Proveedores Registrados */}
      {licitacionProveedores && (
        <ProveedoresRegistradosModal
          isOpen={openProveedoresDialog}
          onClose={() => {
            setOpenProveedoresDialog(false)
            setTimeout(() => setLicitacionProveedores(null), 100)
          }}
          licitacionId={licitacionProveedores.id}
          licitacionTitulo={licitacionProveedores.titulo}
          licitacionNumero={licitacionProveedores.numero}
        />
      )}

      {/* Modal de Invitar Proveedor */}
      <Dialog open={openInvitarProveedorDialog} onOpenChange={(open) => {
        if (!open) {
          handleCloseInvitarProveedorModal()
        }
      }}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Invitar Proveedor{proveedoresInvitados.length > 1 ? "es" : ""} - {licitacionInvitarProveedor?.numero}
            </DialogTitle>
            <DialogDescription>
              {licitacionInvitarProveedor?.titulo}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <ProveedoresInvitados
              proveedores={proveedoresInvitados}
              onAddProveedor={handleAddProveedor}
              onRemoveProveedor={handleRemoveProveedor}
              titulo="Proveedores a Invitar"
              descripcion="Seleccione o agregue los proveedores que desea invitar a esta licitación"
              mostrarCard={true}
              resetOnMount={openInvitarProveedorDialog}
            />
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={handleCloseInvitarProveedorModal}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmarInvitaciones}>
              Enviar Invitaciones ({proveedoresInvitados.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
