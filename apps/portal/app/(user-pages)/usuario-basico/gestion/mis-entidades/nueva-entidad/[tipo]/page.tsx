"use client"

import { useRouter, useParams } from "next/navigation"
import AltaProveedorForm from "@/components/proveedores/alta-proveedor-form"
import AltaClienteForm from "@/components/clientes/alta-cliente-form"
import AltaEmpresaServiciosPortuarios from "@/components/empresa-servicios-portuarios/alta-empresa-servicios-portuarios"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock datos fijos por tipo para simular detalle en solo lectura
const MOCK_PROVEEDOR = {
  razonSocial: "Auletta SRL",
  cuitCuil: "30-700012533-3",
  naturalezaOrganizacion: "Persona Jurídica",
  tipoSocietario: "Sociedad de Responsabilidad Limitada",
  nombreFantasia: "Auletta",
  ultimaActividad: "Comercio al por mayor",
  convenioMultilateral: "Sí",
  exencionesImpositivas: "No",
  documentos: {
    constanciaARBA: { fechaEmision: "01/01/2024", fechaVencimiento: "01/01/2025" },
    convenioMultilateral: { fechaEmision: "", fechaVencimiento: "" },
    exencionesImpositivas: { fechaEmision: "", fechaVencimiento: "" },
  },
  direcciones: [
    {
      id: "1",
      tipo: "Fiscal",
      calle: "Calle 50",
      numero: "1988",
      sinNumero: false,
      piso: "",
      departamento: "",
      codigoPostal: "1900",
      pais: "Argentina",
      provincia: "Buenos Aires",
      ciudad: "La Plata",
      comentarios: "",
    },
  ],
  nombreContacto: "Ernesto Gomez",
  cargoContacto: "Gerente General",
  telefonoContacto: "+54 221 456-7890",
  emailContacto: "ejemplo@auletta.com.ar",
  cuentaBancaria: "Caja de Ahorro 123456789",
  banco: "Banco de la Nación Argentina",
  cbu: "0110599520000001234567890",
}

const MOCK_CLIENTE = {
  razonSocial: "Constructora Omega SA",
  cuit: "30-555666777-8",
  naturalezaOrganizacion: "Persona Jurídica",
  tipoSocietario: "Sociedad Anónima",
  nombreFantasia: "Omega",
  ultimaActividad: "Construcción",
  convenioMultilateral: "No",
  exencionesImpositivas: "No",
  documentos: {
    constanciaARBA: { fechaEmision: "15/03/2024", fechaVencimiento: "15/03/2025" },
    convenioMultilateral: { fechaEmision: "", fechaVencimiento: "" },
    exencionesImpositivas: { fechaEmision: "", fechaVencimiento: "" },
  },
  direcciones: [
    {
      id: "1",
      tipo: "Fiscal",
      calle: "Calle 7",
      numero: "entre 45 y 46",
      sinNumero: false,
      piso: "2",
      departamento: "A",
      codigoPostal: "1900",
      pais: "Argentina",
      provincia: "Buenos Aires",
      ciudad: "La Plata",
      comentarios: "",
    },
  ],
  nombreContacto: "Roberto Sánchez",
  cargoContacto: "Director Comercial",
  telefonoContacto: "+54 221 555-1234",
  emailContacto: "ventas@omega.com.ar",
}

const MOCK_EMPRESA_SERVICIOS_PORTUARIOS = {
  razonSocial: "Logística Portuaria La Plata SA",
  cuitCuil: "30-999888777-6",
  naturalezaOrganizacion: "Persona Jurídica",
  tipoSocietario: "Sociedad Anónima",
  nombreFantasia: "Logística LP",
  ultimaActividad: "Servicios de almacenamiento y depósito",
  convenioMultilateral: "Sí",
  exencionesImpositivas: "No",
  categoriasServiciosPortuarios: [
    { grupo: "Estiba y desestiba", tareas: ["Estiba de contenedores"] },
    { grupo: "Almacenaje", tareas: ["Depósito temporario"] },
  ],
  documentos: {
    constanciaARBA: { fechaEmision: "01/06/2024", fechaVencimiento: "01/06/2025" },
    convenioMultilateral: { fechaEmision: "", fechaVencimiento: "" },
    exencionesImpositivas: { fechaEmision: "", fechaVencimiento: "" },
  },
  direcciones: [
    {
      id: "1",
      tipo: "Comercial",
      calle: "Av. 1",
      numero: "500",
      sinNumero: false,
      piso: "",
      departamento: "",
      codigoPostal: "1900",
      pais: "Argentina",
      provincia: "Buenos Aires",
      ciudad: "La Plata",
      comentarios: "Zona portuaria",
    },
  ],
  nombreContacto: "Laura Martínez",
  cargoContacto: "Responsable de Operaciones",
  telefonoContacto: "+54 221 444-5566",
  emailContacto: "contacto@logisticalplata.com.ar",
}

type TipoSlug = "proveedor" | "cliente" | "empresa-servicios-portuarios"

export default function DetalleEntidadPage() {
  const params = useParams()
  const router = useRouter()
  const tipo = (params?.tipo as TipoSlug) || "proveedor"

  const backUrl = "/usuario-basico/gestion/mis-entidades"

  if (tipo === "proveedor") {
    return (
      <div className="p-6">
        
        <h1 className="text-2xl font-bold text-plp-darkest mb-2">Detalle - Proveedor</h1>
        <p className="text-gray-600 mb-6">Datos de la entidad en solo lectura.</p>
        <AltaProveedorForm readOnly defaultData={MOCK_PROVEEDOR} backUrl={backUrl} />
      </div>
    )
  }

  if (tipo === "cliente") {
    return (
      <div className="p-6">
        
        <h1 className="text-2xl font-bold text-plp-darkest mb-2">Detalle - Cliente</h1>
        <p className="text-gray-600 mb-6">Datos de la entidad en solo lectura.</p>
        <AltaClienteForm readOnly defaultData={MOCK_CLIENTE} backUrl={backUrl} />
      </div>
    )
  }

  if (tipo === "empresa-servicios-portuarios") {
    return (
      <div className="p-6">
        
        <h1 className="text-2xl font-bold text-plp-darkest mb-2">Detalle - Empresa Servicios Portuarios</h1>
        <p className="text-gray-600 mb-6">Datos de la entidad en solo lectura.</p>
        <AltaEmpresaServiciosPortuarios readOnly defaultData={MOCK_EMPRESA_SERVICIOS_PORTUARIOS} backUrl={backUrl} />
      </div>
    )
  }

  router.replace(backUrl)
  return null
}
