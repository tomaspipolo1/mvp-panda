"use client"

import { useState } from "react"
import { DatosGenerales } from "@/components/entidad/datos-generales"
import { Direcciones } from "@/components/entidad/direcciones"
import { Documentos } from "@/components/entidad/documentos"
import { EditarDatosModal } from "@/components/entidad/editar-datos-modal"
import { AgregarDireccionModal } from "@/components/entidad/agregar-direccion-modal"
import { SubirDocumentoModal } from "@/components/entidad/subir-documento-modal"
import { VerDocumentoModal } from "@/components/entidad/ver-documento-modal"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo completos para cliente
const datosEjemplo = {
  naturalezaOrganizacion: "Empresa Privada",
  tipoSocietario: "Sociedad Anónima",
  razonSocial: "Transportes del Puerto S.A.",
  cuitCuil: "30-12345678-9",
  nombreFantasia: "Transportes del Puerto",
  estado: "Activo" as const,
  contacto: {
    nombre: "María García",
    cargo: "Gerente de Operaciones",
    email: "maria.garcia@transportes.com",
    telefono: "+54 11 3456 7890",
  },
  banco: {
    numeroCuenta: "0098765432",
    banco: "Banco de la Nación",
    cbu: "0110098700098765432109",
    alias: "TRANSPORTES.PUERTO.SA",
  },
  fiscal: {
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    condicionIVA: "Responsable Inscripto",
  },
}

const direccionesEjemplo = [
  {
    tipo: "Principal",
    nombre: "Oficina Central",
    calle: "Av. Costanera 567, Piso 3",
    ciudad: "Ciudad Autónoma de Buenos Aires",
    codigoPostal: "C1107AAB",
    pais: "Argentina",
  },
  {
    tipo: "Secundaria",
    nombre: "Base Operativa",
    calle: "Dock Sud, Muelle 12",
    adicional: "Zona Portuaria",
    ciudad: "Avellaneda",
    codigoPostal: "B1871",
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
    tamano: "3.1 MB",
    fechaActualizacion: "01/04/2023",
    // No tiene fecha de vencimiento
  },
]

export default function EntidadClientePage() {
  const { toast } = useToast()
  const [datos, setDatos] = useState(datosEjemplo)
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
