"use client"

import { useEffect, useState } from "react"
import { FormularioEdicionLicitacion } from "@/components/licitaciones/formulario-edicion-licitacion"
import { useParams } from "next/navigation"

// Datos de ejemplo para una licitación
const licitacionEjemplo = {
  id: "1",
  numero: "LIC-2023-0125",
  expediente: "EXP-2023-00125",
  titulo: "Suministro de equipos informáticos",
  montoEstimado: 1250000.0,
  fechaApertura: "15/04/2023",
  montoOfertado: "$1,180,000.00",
  fechaPresentacion: "10/04/2023",
  observaciones: "Oferta presentada con descuento por volumen.",
  entidad: "Consorcio de Gestión del Puerto La Plata",
  documentos: [
    {
      id: "doc1",
      nombre: "Pliego de condiciones.pdf",
      tipo: "PDF",
      tamano: "2.5 MB",
    },
    {
      id: "doc2",
      nombre: "Especificaciones técnicas.docx",
      tipo: "DOCX",
      tamano: "1.8 MB",
    },
    {
      id: "doc3",
      nombre: "Formulario de oferta.xlsx",
      tipo: "XLSX",
      tamano: "750 KB",
    },
  ],
  documentosRequeridos: [
    {
      id: "req1",
      tipo: "Certificado fiscal",
      estado: "Cargado",
      fechaCarga: "10/04/2023",
    },
    {
      id: "req2",
      tipo: "Garantía de mantenimiento de oferta",
      estado: "Cargado",
      fechaCarga: "10/04/2023",
    },
    {
      id: "req3",
      tipo: "Certificado de capacidad técnica",
      estado: "Pendiente",
      fechaCarga: null,
    },
    {
      id: "req4",
      tipo: "Declaración jurada de no conflicto de interés",
      estado: "Pendiente",
      fechaCarga: null,
    },
  ],
}

export default function EditarLicitacionPage() {
  const params = useParams()
  const [licitacion, setLicitacion] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulamos la carga de datos
    const fetchLicitacion = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setLicitacion(licitacionEjemplo)
      setLoading(false)
    }

    fetchLicitacion()
  }, [params.id])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <FormularioEdicionLicitacion licitacion={licitacion} />
    </div>
  )
}
