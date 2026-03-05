"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { format, isAfter, parseISO, startOfToday } from "date-fns"
import { Eye, Pencil, XCircle, FileText, Filter, MoreHorizontal } from "lucide-react"

// Tipos
interface Licencia {
  id: number
  empleadoNombre: string
  empleadoApellido: string
  empleadoDni: string
  empleadoGerencia: string
  empleadoDepartamento: string
  tipoLicencia: string
  fechaInicio: string
  fechaFin: string
  diasTotales: number
  motivo: string
  observaciones: string
  estado: string
}

// Datos de ejemplo
const licencias: Licencia[] = [
  {
    id: 1,
    empleadoNombre: "Ana Sofía",
    empleadoApellido: "López",
    empleadoDni: "45678901",
    empleadoGerencia: "Administración",
    empleadoDepartamento: "Contabilidad",
    tipoLicencia: "Licencia Médica",
    fechaInicio: "2025-01-10",
    fechaFin: "2025-01-20",
    diasTotales: 10,
    motivo: "Cirugía programada",
    observaciones: "Reposo postoperatorio",
    estado: "Activa",
  },
  {
    id: 2,
    empleadoNombre: "Laura Patricia",
    empleadoApellido: "Silva",
    empleadoDni: "67890123",
    empleadoGerencia: "Administración",
    empleadoDepartamento: "Auditoría",
    tipoLicencia: "Vacaciones",
    fechaInicio: "2025-01-15",
    fechaFin: "2025-01-29",
    diasTotales: 14,
    motivo: "Vacaciones anuales",
    observaciones: "Primera parte de vacaciones correspondientes",
    estado: "Activa",
  },
  {
    id: 3,
    empleadoNombre: "Isabella",
    empleadoApellido: "Mendoza",
    empleadoDni: "14234567",
    empleadoGerencia: "RRHH",
    empleadoDepartamento: "Nómina",
    tipoLicencia: "Licencia por Maternidad",
    fechaInicio: "2024-12-15",
    fechaFin: "2025-03-15",
    diasTotales: 90,
    motivo: "Licencia por maternidad",
    observaciones: "Primer hijo",
    estado: "Activa",
  },
  {
    id: 4,
    empleadoNombre: "Sebastián",
    empleadoApellido: "Peña",
    empleadoDni: "17234567",
    empleadoGerencia: "RRHH",
    empleadoDepartamento: "Relaciones Laborales",
    tipoLicencia: "Vacaciones",
    fechaInicio: "2025-01-10",
    fechaFin: "2025-01-24",
    diasTotales: 14,
    motivo: "Vacaciones anuales",
    observaciones: "",
    estado: "Activa",
  },
  {
    id: 5,
    empleadoNombre: "Nicolás",
    empleadoApellido: "Delgado",
    empleadoDni: "23234567",
    empleadoGerencia: "Ingeniería",
    empleadoDepartamento: "Calidad",
    tipoLicencia: "Licencia Especial",
    fechaInicio: "2025-01-15",
    fechaFin: "2025-01-29",
    diasTotales: 14,
    motivo: "Exámenes universitarios",
    observaciones: "Finalización de maestría",
    estado: "Activa",
  },
  {
    id: 6,
    empleadoNombre: "Benjamín",
    empleadoApellido: "Medina",
    empleadoDni: "33234567",
    empleadoGerencia: "Operaciones",
    empleadoDepartamento: "Transporte",
    tipoLicencia: "Licencia Médica",
    fechaInicio: "2025-01-08",
    fechaFin: "2025-01-22",
    diasTotales: 14,
    motivo: "Recuperación fractura",
    observaciones: "Accidente laboral registrado",
    estado: "Activa",
  },
  {
    id: 7,
    empleadoNombre: "Esteban",
    empleadoApellido: "Muñoz",
    empleadoDni: "43234567",
    empleadoGerencia: "Legales",
    empleadoDepartamento: "Litigios",
    tipoLicencia: "Licencia Especial",
    fechaInicio: "2025-01-20",
    fechaFin: "2025-02-03",
    diasTotales: 14,
    motivo: "Viaje familiar",
    observaciones: "Licencia sin goce de sueldo",
    estado: "Activa",
  },
  {
    id: 8,
    empleadoNombre: "Bárbara",
    empleadoApellido: "Tapia",
    empleadoDni: "52234567",
    empleadoGerencia: "Presidencia",
    empleadoDepartamento: "Relaciones Públicas",
    tipoLicencia: "Licencia Médica",
    fechaInicio: "2025-01-05",
    fechaFin: "2025-01-19",
    diasTotales: 14,
    motivo: "Tratamiento médico",
    observaciones: "Terapia programada",
    estado: "Activa",
  },
  {
    id: 9,
    empleadoNombre: "Emilia",
    empleadoApellido: "Salinas",
    empleadoDni: "58234567",
    empleadoGerencia: "Ingeniería",
    empleadoDepartamento: "Arquitectura",
    tipoLicencia: "Licencia por Maternidad",
    fechaInicio: "2024-11-15",
    fechaFin: "2025-02-15",
    diasTotales: 92,
    motivo: "Licencia por maternidad",
    observaciones: "Segundo hijo",
    estado: "Activa",
  },
  {
    id: 10,
    empleadoNombre: "Facundo",
    empleadoApellido: "Cornejo",
    empleadoDni: "59234567",
    empleadoGerencia: "Operaciones",
    empleadoDepartamento: "Planificación",
    tipoLicencia: "Licencia Especial",
    fechaInicio: "2025-02-01",
    fechaFin: "2025-02-15",
    diasTotales: 14,
    motivo: "Capacitación externa",
    observaciones: "Curso de especialización",
    estado: "Activa",
  },
]

// Tipos de licencia para filtros y formulario
const tiposLicencia = [
  "Vacaciones",
  "Licencia Médica",
  "Licencia por Maternidad",
  "Licencia por Paternidad",
  "Licencia Especial",
  "Licencia sin Goce de Sueldo",
]

// Áreas (gerencias) para filtros
const areas = ["Administración", "RRHH", "Ingeniería", "Operaciones", "Legales", "Presidencia"]

export default function LicenciasActivas() {
  const [filtroTipo, setFiltroTipo] = useState<string>("")
  const [filtroArea, setFiltroArea] = useState<string>("")
  const [filtroFechas, setFiltroFechas] = useState<{
    desde: string
    hasta: string
  }>({
    desde: "",
    hasta: "",
  })

  // Estado para modal de detalle de licencia
  const [licenciaSeleccionada, setLicenciaSeleccionada] = useState<Licencia | null>(null)
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false)
  const [modalCancelarAbierto, setModalCancelarAbierto] = useState(false)

  // Filtrar licencias según criterios
  const licenciasFiltradas = licencias.filter((licencia) => {
    const coincideTipo = !filtroTipo || filtroTipo === "all" || licencia.tipoLicencia === filtroTipo
    const coincideArea = !filtroArea || filtroArea === "all" || licencia.empleadoGerencia === filtroArea

    let coincideFecha = true
    if (filtroFechas.desde && filtroFechas.hasta) {
      const inicio = parseISO(licencia.fechaInicio)
      const fin = parseISO(licencia.fechaFin)
      const fechaDesde = parseISO(filtroFechas.desde)
      const fechaHasta = parseISO(filtroFechas.hasta)

      const dentroDeRango =
        (isAfter(inicio, fechaDesde) || inicio.getTime() === fechaDesde.getTime()) &&
        (isAfter(fechaHasta, inicio) || fin.getTime() === fechaHasta.getTime())

      coincideFecha = dentroDeRango
    }

    return coincideTipo && coincideArea && coincideFecha
  })

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltroTipo("")
    setFiltroArea("")
    setFiltroFechas({
      desde: "",
      hasta: "",
    })
  }

  // Función para abrir el modal de detalles
  const verDetalle = (licencia: Licencia) => {
    setLicenciaSeleccionada(licencia)
    setModalDetalleAbierto(true)
  }

  // Función para abrir el modal de edición
  const editarLicencia = (licencia: Licencia) => {
    setLicenciaSeleccionada(licencia)
    setModalEdicionAbierto(true)
  }

  // Función para abrir el modal de cancelación
  const cancelarLicencia = (licencia: Licencia) => {
    setLicenciaSeleccionada(licencia)
    setModalCancelarAbierto(true)
  }

  // Verificar si la licencia ya inició (para edición)
  const licenciaYaInicio = (fechaInicio: string): boolean => {
    const hoy = startOfToday()
    const inicio = parseISO(fechaInicio)
    return isAfter(hoy, inicio) || hoy.getTime() === inicio.getTime()
  }

  // Función para confirmar cancelación de licencia
  const confirmarCancelacion = () => {
    // Aquí iría la lógica para cancelar la licencia
    console.log("Cancelando licencia:", licenciaSeleccionada)
    setModalCancelarAbierto(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-plp-dark">Licencias Activas</h1>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="filtroTipo">Tipo de Licencia</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger id="filtroTipo">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {tiposLicencia.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filtroArea">Área / Gerencia</Label>
              <Select value={filtroArea} onValueChange={setFiltroArea}>
                <SelectTrigger id="filtroArea">
                  <SelectValue placeholder="Seleccionar área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="fechaDesde">Fecha Desde</Label>
                <Input
                  id="fechaDesde"
                  type="date"
                  value={filtroFechas.desde}
                  onChange={(e) => setFiltroFechas((prev) => ({ ...prev, desde: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaHasta">Fecha Hasta</Label>
                <Input
                  id="fechaHasta"
                  type="date"
                  value={filtroFechas.hasta}
                  onChange={(e) => setFiltroFechas((prev) => ({ ...prev, hasta: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={limpiarFiltros}>
              Limpiar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de licencias */}
      <Card>
        <CardHeader>
          <CardTitle>Licencias Activas ({licenciasFiltradas.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Empleado</TableHead>
                  <TableHead className="font-semibold">Tipo de Licencia</TableHead>
                  <TableHead className="font-semibold">Desde</TableHead>
                  <TableHead className="font-semibold">Hasta</TableHead>
                  <TableHead className="font-semibold">Días Totales</TableHead>
                  <TableHead className="font-semibold">Motivo</TableHead>
                  <TableHead className="font-semibold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenciasFiltradas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No hay licencias activas que coincidan con los filtros seleccionados.
                    </TableCell>
                  </TableRow>
                ) : (
                  licenciasFiltradas.map((licencia) => (
                    <TableRow key={licencia.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="font-medium">{`${licencia.empleadoNombre} ${licencia.empleadoApellido}`}</div>
                        <div className="text-xs text-muted-foreground">{licencia.empleadoDepartamento}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            licencia.tipoLicencia === "Licencia Médica"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : licencia.tipoLicencia.includes("Maternidad") ||
                                  licencia.tipoLicencia.includes("Paternidad")
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                : licencia.tipoLicencia === "Vacaciones"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {licencia.tipoLicencia}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(parseISO(licencia.fechaInicio), "dd/MM/yyyy")}</TableCell>
                      <TableCell>{format(parseISO(licencia.fechaFin), "dd/MM/yyyy")}</TableCell>
                      <TableCell>{licencia.diasTotales}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={licencia.motivo}>
                          {licencia.motivo}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => verDetalle(licencia)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Ver detalle</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => editarLicencia(licencia)}
                              disabled={licenciaYaInicio(licencia.fechaInicio)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => cancelarLicencia(licencia)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Cancelar licencia</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de detalle de licencia */}
      <Dialog open={modalDetalleAbierto} onOpenChange={setModalDetalleAbierto}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Detalle de Licencia
            </DialogTitle>
          </DialogHeader>

          {licenciaSeleccionada && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Empleado</p>
                    <p>{`${licenciaSeleccionada.empleadoNombre} ${licenciaSeleccionada.empleadoApellido}`}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">DNI</p>
                    <p>{licenciaSeleccionada.empleadoDni}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gerencia</p>
                    <p>{licenciaSeleccionada.empleadoGerencia}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Departamento</p>
                    <p>{licenciaSeleccionada.empleadoDepartamento}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tipo de Licencia</p>
                    <Badge
                      variant={
                        licenciaSeleccionada.tipoLicencia === "Licencia Médica"
                          ? "destructive"
                          : licenciaSeleccionada.tipoLicencia.includes("Maternidad") ||
                              licenciaSeleccionada.tipoLicencia.includes("Paternidad")
                            ? "purple"
                            : licenciaSeleccionada.tipoLicencia === "Vacaciones"
                              ? "green"
                              : "secondary"
                      }
                      className={
                        licenciaSeleccionada.tipoLicencia === "Licencia Médica"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : licenciaSeleccionada.tipoLicencia.includes("Maternidad") ||
                              licenciaSeleccionada.tipoLicencia.includes("Paternidad")
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                            : licenciaSeleccionada.tipoLicencia === "Vacaciones"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : ""
                      }
                    >
                      {licenciaSeleccionada.tipoLicencia}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Estado</p>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      {licenciaSeleccionada.estado}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fecha Inicio</p>
                    <p>{format(parseISO(licenciaSeleccionada.fechaInicio), "dd/MM/yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fecha Fin</p>
                    <p>{format(parseISO(licenciaSeleccionada.fechaFin), "dd/MM/yyyy")}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Días Totales</p>
                  <p>{licenciaSeleccionada.diasTotales}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Motivo</p>
                  <p>{licenciaSeleccionada.motivo}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Observaciones</p>
                  <p>{licenciaSeleccionada.observaciones || "Sin observaciones."}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setModalDetalleAbierto(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para edición de licencia */}
      <Dialog open={modalEdicionAbierto} onOpenChange={setModalEdicionAbierto}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Pencil className="h-5 w-5 mr-2" />
              Editar Licencia
            </DialogTitle>
          </DialogHeader>

          {licenciaSeleccionada && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md mb-4">
                <p className="font-medium">{`${licenciaSeleccionada.empleadoNombre} ${licenciaSeleccionada.empleadoApellido}`}</p>
                <p className="text-sm text-muted-foreground">{`${licenciaSeleccionada.empleadoGerencia} - ${licenciaSeleccionada.empleadoDepartamento}`}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoLicencia">Tipo de Licencia</Label>
                  <Select defaultValue={licenciaSeleccionada.tipoLicencia}>
                    <SelectTrigger id="tipoLicencia">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposLicencia.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fechaInicio">Fecha Inicio</Label>
                    <Input id="fechaInicio" type="date" defaultValue={licenciaSeleccionada.fechaInicio} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaFin">Fecha Fin</Label>
                    <Input id="fechaFin" type="date" defaultValue={licenciaSeleccionada.fechaFin} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivo">Motivo</Label>
                  <Input id="motivo" defaultValue={licenciaSeleccionada.motivo} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <Textarea id="observaciones" rows={3} defaultValue={licenciaSeleccionada.observaciones} />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setModalEdicionAbierto(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setModalEdicionAbierto(false)}>Guardar Cambios</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para cancelación de licencia */}
      <Dialog open={modalCancelarAbierto} onOpenChange={setModalCancelarAbierto}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <XCircle className="h-5 w-5 mr-2" />
              Cancelar Licencia
            </DialogTitle>
          </DialogHeader>

          {licenciaSeleccionada && (
            <div className="space-y-4">
              <p>
                ¿Está seguro que desea cancelar la licencia de{" "}
                <span className="font-medium">{`${licenciaSeleccionada.empleadoNombre} ${licenciaSeleccionada.empleadoApellido}`}</span>
                ?
              </p>

              <div className="bg-muted/50 p-4 rounded-md">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Tipo:</p>
                    <p>{licenciaSeleccionada.tipoLicencia}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Período:</p>
                    <p>{`${format(parseISO(licenciaSeleccionada.fechaInicio), "dd/MM/yyyy")} - ${format(parseISO(licenciaSeleccionada.fechaFin), "dd/MM/yyyy")}`}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Días totales:</p>
                    <p>{licenciaSeleccionada.diasTotales}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivoCancelacion">Motivo de la cancelación</Label>
                <Textarea id="motivoCancelacion" rows={3} placeholder="Ingrese el motivo de la cancelación..." />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setModalCancelarAbierto(false)}>
                  Volver
                </Button>
                <Button variant="destructive" onClick={confirmarCancelacion}>
                  Confirmar Cancelación
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

