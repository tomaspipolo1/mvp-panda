"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosEstaticos, type FiltrosEstaticos as FiltrosEstaticosType } from "@/components/estaticos/filtros-estaticos"
import { CampoEstaticoModal } from "@/components/estaticos/modal-campo-estatico"
import { TablaEstaticos, type CampoEstatico } from "@/components/estaticos/tabla-estaticos"
import { showDeleteConfirm, showSuccess } from "@/lib/sweetalert"

const camposIniciales: CampoEstatico[] = [
  {
    id: 1,
    nombre: "Tipo de documento",
    tipo: "select",
    uso: 8,
    estado: "Activo",
    formulario: "Alta de proveedor",
    ultimaModificacion: "10/01/2026",
    valores: [
      { valor: "DNI", activo: true, roles: ["Admin", "Compras"] },
      { valor: "Pasaporte", activo: true, roles: ["Admin"] },
      { valor: "CUIT", activo: true, roles: ["Admin", "Contable"] },
      { valor: "Libreta Cívica", activo: false, roles: [] },
    ],
    descripcion: "Listado de documentos válidos para formularios de alta.",
  },
  {
    id: 2,
    nombre: "Región operativa",
    tipo: "multiselect",
    uso: 5,
    estado: "Activo",
    formulario: "Registro de visitas",
    ultimaModificacion: "08/01/2026",
    valores: [
      { valor: "CABA", activo: true, roles: ["Seguridad"] },
      { valor: "Buenos Aires", activo: true, roles: ["Seguridad"] },
      { valor: "Santa Fe", activo: true, roles: ["Seguridad"] },
      { valor: "Río Negro", activo: false, roles: [] },
      { valor: "Chubut", activo: false, roles: [] },
    ],
    descripcion: "Regiones habilitadas para operar.",
  },
  {
    id: 3,
    nombre: "Género",
    tipo: "radiobutton",
    uso: 6,
    estado: "Activo",
    formulario: "Alta de empleado",
    ultimaModificacion: "04/01/2026",
    valores: [
      { valor: "Femenino", activo: true, roles: ["RRHH"] },
      { valor: "Masculino", activo: true, roles: ["RRHH"] },
      { valor: "Prefiero no decir", activo: true, roles: ["RRHH"] },
      { valor: "Otro", activo: true, roles: ["RRHH"] },
    ],
    descripcion: "Opción de género en formularios de recursos humanos.",
  },
  {
    id: 4,
    nombre: "Intereses",
    tipo: "checkbox",
    uso: 3,
    estado: "Inactivo",
    formulario: "Preferencias de comunicación",
    ultimaModificacion: "15/12/2025",
    valores: [
      { valor: "Logística", activo: true, roles: ["Logística"] },
      { valor: "Seguridad", activo: false, roles: ["Seguridad"] },
      { valor: "Compras", activo: true, roles: ["Compras"] },
      { valor: "Tecnología", activo: true, roles: ["Admin"] },
    ],
    descripcion: "Intereses para newsletters y comunicaciones.",
  },
  {
    id: 5,
    nombre: "Motivo de visita",
    tipo: "select",
    uso: 9,
    estado: "Activo",
    formulario: "Registro de visitas",
    ultimaModificacion: "02/01/2026",
    valores: [
      { valor: "Reunión", activo: true, roles: ["Seguridad"] },
      { valor: "Entrega", activo: true, roles: ["Seguridad"] },
      { valor: "Mantenimiento", activo: true, roles: ["Seguridad"] },
      { valor: "Seguridad", activo: true, roles: ["Seguridad"] },
      { valor: "Capacitación", activo: false, roles: [] },
    ],
    descripcion: "Motivos estándar utilizados en el módulo de visitas.",
  },
  {
    id: 6,
    nombre: "Idioma preferido",
    tipo: "radiobutton",
    uso: 2,
    estado: "Activo",
    formulario: "Preferencias de notificación",
    ultimaModificacion: "12/12/2025",
    valores: [
      { valor: "Español", activo: true, roles: ["Admin", "RRHH"] },
      { valor: "Inglés", activo: true, roles: ["Admin", "RRHH"] },
      { valor: "Portugués", activo: false, roles: [] },
    ],
    descripcion: "Idioma de preferencia para notificaciones.",
  },
]

type ModalMode = "view" | "edit"

const formatearFecha = () => new Intl.DateTimeFormat("es-AR").format(new Date())

const filtrarCampos = (campos: CampoEstatico[], filtros: FiltrosEstaticosType) => {
  let resultado = [...campos]

  if (filtros.busqueda) {
    resultado = resultado.filter((campo) => campo.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()))
  }

  if (filtros.tipo !== "Todos") {
    resultado = resultado.filter((campo) => campo.tipo === filtros.tipo)
  }

  if (filtros.estado !== "Todos") {
    resultado = resultado.filter((campo) => campo.estado === filtros.estado)
  }

  return resultado
}

export default function EstaticosPage() {
  const [campos, setCampos] = useState<CampoEstatico[]>(camposIniciales)
  const [camposFiltrados, setCamposFiltrados] = useState<CampoEstatico[]>(camposIniciales)
  const [filtros, setFiltros] = useState<FiltrosEstaticosType>({ busqueda: "", tipo: "Todos", estado: "Todos" })
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalMode, setModalMode] = useState<ModalMode>("view")
  const [campoSeleccionado, setCampoSeleccionado] = useState<CampoEstatico | null>(null)
  const [esNuevo, setEsNuevo] = useState(false)

  const totalActivos = useMemo(() => campos.filter((c) => c.estado === "Activo").length, [campos])

  const handleFiltrar = (nuevosFiltros: FiltrosEstaticosType) => {
    setFiltros(nuevosFiltros)
    setCamposFiltrados(filtrarCampos(campos, nuevosFiltros))
  }

  const handleVer = (campo: CampoEstatico) => {
    setCampoSeleccionado(campo)
    setModalMode("view")
    setEsNuevo(false)
    setModalAbierto(true)
  }

  const handleEditar = (campo: CampoEstatico) => {
    setCampoSeleccionado(campo)
    setModalMode("edit")
    setEsNuevo(false)
    setModalAbierto(true)
  }

  const handleCrear = () => {
    const siguienteId = (campos.length > 0 ? Math.max(...campos.map((c) => c.id)) : 0) + 1
    const nuevoCampo: CampoEstatico = {
      id: siguienteId,
      nombre: "",
      tipo: "select",
      uso: 0,
      estado: "Activo",
      formulario: "",
      ultimaModificacion: formatearFecha(),
      valores: [],
      descripcion: "",
    }
    setCampoSeleccionado(nuevoCampo)
    setModalMode("edit")
    setEsNuevo(true)
    setModalAbierto(true)
  }

  const handleGuardar = (campoActualizado: CampoEstatico) => {
    const campoConFecha = { ...campoActualizado, ultimaModificacion: formatearFecha() }
    const listadoActualizado = esNuevo
      ? [...campos, campoConFecha]
      : campos.map((c) => (c.id === campoConFecha.id ? campoConFecha : c))

    setCampos(listadoActualizado)
    setCamposFiltrados(filtrarCampos(listadoActualizado, filtros))
    setModalAbierto(false)
    setCampoSeleccionado(null)
    setEsNuevo(false)
    setModalMode("view")
    showSuccess("Campo guardado", "Los cambios fueron registrados correctamente.")
  }

  const handleEliminar = async (campo: CampoEstatico) => {
    const confirmacion = await showDeleteConfirm(campo.nombre)
    if (confirmacion.isConfirmed) {
      const lista = campos.filter((c) => c.id !== campo.id)
      setCampos(lista)
      setCamposFiltrados(filtrarCampos(lista, filtros))
      showSuccess("Campo eliminado", `${campo.nombre} fue eliminado.`)
    }
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setCampoSeleccionado(null)
    setEsNuevo(false)
    setModalMode("view")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Campos estáticos</h1>
          <p className="text-sm text-gray-500">
            Gestioná los campos seleccionables reutilizados en formularios. Activos: {totalActivos}
          </p>
        </div>
        <Button onClick={handleCrear} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo campo
        </Button>
      </div>

      <FiltrosEstaticos onFilter={handleFiltrar} />

      <TablaEstaticos campos={camposFiltrados} onVer={handleVer} onEditar={handleEditar} onEliminar={handleEliminar} />

      <CampoEstaticoModal
        isOpen={modalAbierto}
        mode={modalMode}
        campo={campoSeleccionado}
        onClose={cerrarModal}
        onGuardar={handleGuardar}
      />
    </div>
  )
}
