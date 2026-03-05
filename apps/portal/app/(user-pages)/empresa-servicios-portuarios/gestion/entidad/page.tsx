"use client"

import { useState } from "react"
import { DatosGenerales } from "@/components/entidad/datos-generales"
import { CategoriaServiciosDisplay } from "@/components/entidad/categoria-servicios-display"
import { Direcciones } from "@/components/entidad/direcciones"
import { Documentos } from "@/components/entidad/documentos"
import { EditarDatosModal } from "@/components/entidad/editar-datos-modal"
import { AgregarDireccionModal } from "@/components/entidad/agregar-direccion-modal"
import { SubirDocumentoModal } from "@/components/entidad/subir-documento-modal"
import { VerDocumentoModal } from "@/components/entidad/ver-documento-modal"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo completos para empresa de servicios portuarios
const datosEjemplo = {
  naturalezaOrganizacion: "Sociedad legalmente constituída",
  tipoSocietario: "SRL",
  razonSocial: "Servicios Portuarios del Río S.R.L.",
  cuitCuil: "30-98765432-1",
  nombreFantasia: "Porto Rio Services",
  estado: "Activo" as const,
  contacto: {
    nombre: "Carlos Mendoza",
    cargo: "Director de Operaciones",
    email: "carlos.mendoza@portorio.com",
    telefono: "+54 11 4567 8901",
  },
  banco: {
    numeroCuenta: "0087654321",
    banco: "Banco Industrial",
    cbu: "0110087600087654321098",
    alias: "PORTO.RIO.SERVICES",
  },
  fiscal: {
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    condicionIVA: "Responsable Inscripto",
  },
}

// Categorías de servicios portuarios de ejemplo
const categoriasEjemplo = [
  {
    grupo: "Grupo 2",
    tareas: [
      "Tareas de Estiba (movimiento de mercaderías de cualquier tipo) a buques u otros medios de transporte y/o plazoleta",
      "Empresas proveedoras de servicios y de grúas móviles y otros elementos mecánicos",
      "Transporte de contenedores, bobinas y/u otras cargas",
      "Agencias Marítimas",
      "Talleres de reparaciones y/o servicios navales",
    ]
  },
  {
    grupo: "Grupo 3",
    tareas: [
      "Provisiones marítimas generales a buques (rancho)",
      "Provisión de agua a buques",
      "Tarea de amarre y desamarre de embarcaciones",
    ]
  }
]

const direccionesEjemplo = [
  {
    tipo: "Principal",
    nombre: "Oficina Central",
    calle: "Av. Libertador 1234, Piso 5, Oficina 501",
    ciudad: "Ciudad Autónoma de Buenos Aires",
    codigoPostal: "C1123AAB",
    pais: "Argentina",
  },
  {
    tipo: "Secundaria",
    nombre: "Centro de Distribución",
    calle: "Ruta Provincial 6, Km 5.5",
    adicional: "Parque Industrial Norte",
    ciudad: "Córdoba",
    codigoPostal: "X5000",
    pais: "Argentina",
  },
  {
    tipo: "Sucursal",
    nombre: "Sucursal Rosario",
    calle: "Av. Corrientes 2345",
    ciudad: "Rosario",
    codigoPostal: "S2000",
    pais: "Argentina",
  },
]

const documentosEjemplo = [
  {
    nombre: "Regimen tributario ARCA",
    tipo: "PDF",
    tamano: "245 KB",
    fechaActualizacion: "15/03/2023",
    fechaVencimiento: "15/03/2024",
  },
  {
    nombre: "Regimen tributario ARBA",
    tipo: "PDF",
    tamano: "198 KB",
    fechaActualizacion: "10/02/2023",
    fechaVencimiento: "10/02/2024",
  },
  {
    nombre: "Convenio Multilateral",
    tipo: "PDF",
    tamano: "1.2 MB",
    fechaActualizacion: "05/01/2023",
    fechaVencimiento: "05/01/2024",
  },
  {
    nombre: "Exenciones impositivas",
    tipo: "PDF",
    tamano: "876 KB",
    fechaActualizacion: "20/12/2022",
    fechaVencimiento: "20/12/2023",
  },
  {
    nombre: "Brochure comercial",
    tipo: "PDF",
    tamano: "2.8 MB",
    fechaActualizacion: "01/04/2023",
    // No tiene fecha de vencimiento
  },
]

export default function EntidadPage() {
  const { toast } = useToast()
  const [datos, setDatos] = useState(datosEjemplo)
  const [categorias, setCategorias] = useState(categoriasEjemplo)
  const [direcciones, setDirecciones] = useState(direccionesEjemplo)
  const [documentos, setDocumentos] = useState(documentosEjemplo)

  // Estados para los modales
  const [editarDatosModalOpen, setEditarDatosModalOpen] = useState(false)
  const [agregarDireccionModalOpen, setAgregarDireccionModalOpen] = useState(false)
  const [editarDireccionModalOpen, setEditarDireccionModalOpen] = useState(false)
  const [direccionSeleccionada, setDireccionSeleccionada] = useState<any>(null)
  const [subirDocumentoModalOpen, setSubirDocumentoModalOpen] = useState(false)
  const [editarDocumentoModalOpen, setEditarDocumentoModalOpen] = useState(false)
  const [verDocumentoModalOpen, setVerDocumentoModalOpen] = useState(false)
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<any>(null)

  const handleEditDatos = () => {
    setEditarDatosModalOpen(true)
  }

  const handleSaveDatos = (nuevosDatos: any) => {
    setDatos(nuevosDatos)
    toast({
      title: "Datos actualizados",
      description: "Los datos generales han sido actualizados correctamente.",
    })
  }

  const handleAddDireccion = () => {
    setAgregarDireccionModalOpen(true)
  }

  const handleEditDireccion = (direccion: any) => {
    setDireccionSeleccionada(direccion)
    setEditarDireccionModalOpen(true)
  }

  const handleSaveDireccion = (nuevaDireccion: any) => {
    if (direccionSeleccionada) {
      // Editar dirección existente
      setDirecciones(direcciones.map((dir) => (dir === direccionSeleccionada ? nuevaDireccion : dir)))
    } else {
      // Agregar nueva dirección
      setDirecciones([...direcciones, nuevaDireccion])
    }
    setDireccionSeleccionada(null)
  }

  const handleUploadDocumento = () => {
    setSubirDocumentoModalOpen(true)
  }

  const handleViewDocumento = (documento: any) => {
    setDocumentoSeleccionado(documento)
    setVerDocumentoModalOpen(true)
  }

  const handleEditDocumento = (documento: any) => {
    setDocumentoSeleccionado(documento)
    setEditarDocumentoModalOpen(true)
  }

  const handleSaveDocumento = (nuevoDocumento: any) => {
    if (documentoSeleccionado) {
      // Editar documento existente
      setDocumentos(documentos.map((doc) => (doc === documentoSeleccionado ? nuevoDocumento : doc)))
    } else {
      // Agregar nuevo documento
      setDocumentos([...documentos, nuevoDocumento])
    }
    setDocumentoSeleccionado(null)
  }

  const handleEditCategorias = () => {
    toast({
      title: "Funcionalidad disponible próximamente",
      description: "La edición de categorías de servicios estará disponible en una próxima actualización.",
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-plp-darkest">Entidad</h1>

      <DatosGenerales
        naturalezaOrganizacion={datos.naturalezaOrganizacion}
        tipoSocietario={datos.tipoSocietario}
        razonSocial={datos.razonSocial}
        cuitCuil={datos.cuitCuil}
        nombreFantasia={datos.nombreFantasia}
        estado={datos.estado}
        contacto={datos.contacto}
        banco={datos.banco}
        fiscal={datos.fiscal}
        onEdit={handleEditDatos}
      />

      <CategoriaServiciosDisplay
        categorias={categorias}
        onEdit={handleEditCategorias}
      />

      <Direcciones direcciones={direcciones} onAdd={handleAddDireccion} onEdit={handleEditDireccion} />

      <Documentos
        documentos={documentos}
        onUpload={handleUploadDocumento}
        onView={handleViewDocumento}
        onEdit={handleEditDocumento}
      />

      {/* Modales */}
      <EditarDatosModal
        open={editarDatosModalOpen}
        onOpenChange={setEditarDatosModalOpen}
        datos={datos}
        onSave={handleSaveDatos}
      />

      <AgregarDireccionModal
        open={agregarDireccionModalOpen}
        onOpenChange={setAgregarDireccionModalOpen}
        onSave={handleSaveDireccion}
      />

      <AgregarDireccionModal
        open={editarDireccionModalOpen}
        onOpenChange={setEditarDireccionModalOpen}
        direccion={direccionSeleccionada}
        onSave={handleSaveDireccion}
        isEditing={true}
      />

      <SubirDocumentoModal
        open={subirDocumentoModalOpen}
        onOpenChange={setSubirDocumentoModalOpen}
        onSave={handleSaveDocumento}
      />

      <SubirDocumentoModal
        open={editarDocumentoModalOpen}
        onOpenChange={setEditarDocumentoModalOpen}
        documento={documentoSeleccionado}
        onSave={handleSaveDocumento}
        isEditing={true}
      />

      {documentoSeleccionado && (
        <VerDocumentoModal
          open={verDocumentoModalOpen}
          onOpenChange={setVerDocumentoModalOpen}
          documento={documentoSeleccionado}
        />
      )}
    </div>
  )
}
