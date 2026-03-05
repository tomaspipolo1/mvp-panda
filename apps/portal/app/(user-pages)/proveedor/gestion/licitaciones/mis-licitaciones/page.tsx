"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EstadisticasCards } from "@/components/licitaciones/estadisticas-cards"
import { FiltrosLicitaciones } from "@/components/licitaciones/filtros-licitaciones"
import { TablaLicitaciones } from "@/components/licitaciones/tabla-licitaciones"
import { DetalleLicitacionModal } from "@/components/licitaciones/detalle-licitacion-modal"

// Datos de ejemplo para estadísticas
const estadisticasData = {
  totalLicitaciones: 16,
  pendientes: 4,
  aprobadas: 5,
  rechazadas: 2,
}

// Datos de ejemplo para licitaciones con los estados correctos
const licitacionesData = [
  {
    id: "1",
    numero: "LIC-2023-0125",
    titulo: "Suministro de equipos informáticos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "15/04/2023",
    cierre: "30/04/2023",
    montoEstimado: 1250000.0,
    estado: "En Evaluación",
    resultado: null,
  },
  {
    id: "2",
    numero: "LIC-2023-0118",
    titulo: "Servicio de mantenimiento de edificios",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "01/03/2023",
    cierre: "15/03/2023",
    montoEstimado: 3500000.0,
    estado: "Finalizada",
    resultado: "Adjudicada",
  },
  {
    id: "3",
    numero: "LIC-2023-0110",
    titulo: "Provisión de insumos médicos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "15/02/2023",
    cierre: "28/02/2023",
    montoEstimado: 2750000.0,
    estado: "Finalizada",
    resultado: "Perdida",
  },
  {
    id: "4",
    numero: "LIC-2023-0105",
    titulo: "Construcción de escuela primaria",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "10/01/2023",
    cierre: "25/01/2023",
    montoEstimado: 15000000.0,
    estado: "Finalizada",
    resultado: "Adjudicada",
  },
  {
    id: "5",
    numero: "LIC-2022-0098",
    titulo: "Servicio de limpieza de oficinas",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "05/12/2022",
    cierre: "20/12/2022",
    montoEstimado: 1800000.0,
    estado: "Cancelada",
    resultado: null,
  },
  {
    id: "6",
    numero: "LIC-2023-0130",
    titulo: "Provisión de mobiliario de oficina",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "20/05/2023",
    cierre: "10/06/2023",
    montoEstimado: 950000.0,
    estado: "Abierta",
    resultado: null,
  },
  {
    id: "7",
    numero: "LIC-2023-0132",
    titulo: "Servicio de seguridad y vigilancia",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "25/05/2023",
    cierre: "15/06/2023",
    montoEstimado: 4200000.0,
    estado: "Abierta",
    resultado: null,
  },
  {
    id: "8",
    numero: "LIC-2023-0095",
    titulo: "Mantenimiento de áreas verdes",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "01/12/2022",
    cierre: "20/12/2022",
    montoEstimado: 1200000.0,
    estado: "En Evaluación",
    resultado: null,
  },
  {
    id: "9",
    numero: "LIC-2023-0140",
    titulo: "Servicio de transporte de personal",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    apertura: "10/06/2023",
    cierre: "25/06/2023",
    montoEstimado: 2800000.0,
    estado: "Borrador",
    resultado: null,
  },
]

export default function MisLicitacionesPage() {
  const [filteredLicitaciones, setFilteredLicitaciones] = useState(licitacionesData)
  const [selectedLicitacion, setSelectedLicitacion] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredLicitaciones(licitacionesData)
  }

  const handleVerDetalle = (licitacion: any) => {
    // Añadir datos de ejemplo para el detalle
    const licitacionConDetalle = {
      ...licitacion,
      detalles: {
        descripcion:
          "Esta licitación tiene como objetivo la adquisición de equipamiento informático para las escuelas públicas del país. Se requiere la provisión, instalación y puesta en marcha de computadoras, impresoras y equipos de red.",
        requisitos: [
          "Experiencia mínima de 5 años en el rubro",
          "Capacidad de entrega en todo el territorio nacional",
          "Servicio técnico post-venta",
          "Garantía mínima de 2 años para todos los equipos",
        ],
        documentos: [
          {
            nombre: "Pliego de condiciones.pdf",
            tipo: "PDF",
            fechaSubida: "15/04/2023",
            tamano: "2.5 MB",
          },
          {
            nombre: "Especificaciones técnicas.docx",
            tipo: "DOCX",
            fechaSubida: "15/04/2023",
            tamano: "1.8 MB",
          },
          {
            nombre: "Formulario de oferta.xlsx",
            tipo: "XLSX",
            fechaSubida: "15/04/2023",
            tamano: "750 KB",
          },
        ],
        consultas: [
          {
            fecha: "18/04/2023",
            pregunta: "¿Es posible presentar ofertas parciales por algunos ítems específicos?",
            respuesta:
              "No, las ofertas deben ser por la totalidad de los ítems solicitados en el pliego de condiciones.",
          },
          {
            fecha: "20/04/2023",
            pregunta: "¿Cuál es el plazo máximo de entrega de los equipos una vez adjudicada la licitación?",
            respuesta: "El plazo máximo de entrega es de 45 días corridos desde la notificación de la adjudicación.",
          },
        ],
        historial: [
          {
            fecha: "15/04/2023",
            accion: "Publicación",
            usuario: "Sistema",
            comentario: "Licitación publicada en el portal",
          },
          {
            fecha: "16/04/2023",
            accion: "Inscripción",
            usuario: "Suministros Industriales S.A.",
            comentario: "Inscripción a la licitación",
          },
          {
            fecha: "25/04/2023",
            accion: "Presentación de oferta",
            usuario: "Suministros Industriales S.A.",
            comentario: "Oferta presentada por $1,180,000.00",
          },
        ],
      },
    }

    // Si es un borrador, agregar información específica
    if (licitacion.estado === "Borrador") {
      licitacionConDetalle.detalles.historial = [
        {
          fecha: "05/06/2023",
          accion: "Inicio de inscripción",
          usuario: "Suministros Industriales S.A.",
          comentario: "Inscripción iniciada pero no completada",
        },
      ]

      licitacionConDetalle.detalles.documentosPendientes = [
        "Constancia de inscripción en AFIP",
        "Certificado fiscal para contratar",
        "Declaración jurada de no inhabilitación",
        "Garantía de mantenimiento de oferta",
      ]
    }

    setSelectedLicitacion(licitacionConDetalle)
    setIsDetalleModalOpen(true)
  }

  const handleVerDocumentos = (licitacion: any) => {
    console.log(`Ver documentos de licitación ${licitacion.numero}`)
    // Aquí iría la lógica real para ver documentos
    alert(`Ver documentos de licitación ${licitacion.numero}`)
  }

  const handleVerConsultas = (licitacion: any) => {
    console.log(`Ver consultas de licitación ${licitacion.numero}`)
    // Aquí iría la lógica real para ver consultas
    alert(`Ver consultas de licitación ${licitacion.numero}`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Licitaciones</h1>
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

      <EstadisticasCards
        totalLicitaciones={estadisticasData.totalLicitaciones}
        pendientes={estadisticasData.pendientes}
        aprobadas={estadisticasData.aprobadas}
        rechazadas={estadisticasData.rechazadas}
      />

      <FiltrosLicitaciones onFilter={handleFilter} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaLicitaciones
          licitaciones={filteredLicitaciones}
          onVerDetalle={handleVerDetalle}
          onVerDocumentos={handleVerDocumentos}
          onVerConsultas={handleVerConsultas}
        />
      </div>

      <DetalleLicitacionModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        licitacion={selectedLicitacion}
      />
    </div>
  )
}
