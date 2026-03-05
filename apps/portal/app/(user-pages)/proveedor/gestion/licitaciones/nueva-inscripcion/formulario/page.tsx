"use client"

import { useSearchParams } from "next/navigation"
import { FormularioInscripcion } from "@/components/licitaciones/formulario-inscripcion"

// Datos de ejemplo para licitaciones
const licitacionesData = [
  {
    id: "1",
    numero: "LIC-2023-0130",
    expediente: "EXP-2023-0126",
    titulo: "Adquisición de mobiliario escolar",
    montoEstimado: 2500000.0,
    fechaApertura: "10/05/2023",
    documentos: [
      {
        id: "doc1",
        nombre: "Pliego de Condiciones",
        tipo: "PDF",
        tamano: "2.5 MB",
      },
      {
        id: "doc2",
        nombre: "Circular Aclaratoria 1",
        tipo: "PDF",
        tamano: "1.2 MB",
      },
      {
        id: "doc3",
        nombre: "Circular Aclaratoria 2",
        tipo: "PDF",
        tamano: "850 KB",
      },
    ],
    documentosRequeridos: [
      {
        id: "req1",
        tipo: "Pliego",
        estado: "Pendiente",
        fechaCarga: null,
        obligatorio: true,
      },
      {
        id: "req2",
        tipo: "Garantía de Oferta",
        estado: "Pendiente",
        fechaCarga: null,
        obligatorio: true,
      },
      {
        id: "req3",
        tipo: "Certificado de visita",
        estado: "Pendiente",
        fechaCarga: null,
        obligatorio: true,
      },
    ],
  },
  {
    id: "2",
    numero: "LIC-2023-0129",
    expediente: "EXP-2023-0125",
    titulo: "Servicio de seguridad para edificios públicos",
    montoEstimado: 4800000.0,
    fechaApertura: "05/05/2023",
    documentos: [
      {
        id: "doc1",
        nombre: "Pliego de Condiciones",
        tipo: "PDF",
        tamano: "3.1 MB",
      },
      {
        id: "doc2",
        nombre: "Circular Aclaratoria 1",
        tipo: "PDF",
        tamano: "980 KB",
      },
    ],
    documentosRequeridos: [
      {
        id: "req1",
        tipo: "Pliego",
        estado: "Pendiente",
        fechaCarga: null,
        obligatorio: true,
      },
      {
        id: "req2",
        tipo: "Garantía de Oferta",
        estado: "Pendiente",
        fechaCarga: null,
        obligatorio: true,
      },
      {
        id: "req3",
        tipo: "Certificado de visita",
        estado: "Pendiente",
        fechaCarga: null,
        obligatorio: true,
      },
    ],
  },
]

export default function FormularioInscripcionPage() {
  const searchParams = useSearchParams()
  const licitacionId = searchParams.get("id")

  // Buscar la licitación correspondiente
  const licitacion = licitacionesData.find((lic) => lic.id === licitacionId) || licitacionesData[0]

  return (
    <div className="p-6">
      <FormularioInscripcion licitacion={licitacion} />
    </div>
  )
}
