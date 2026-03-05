"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { DetalleVisitaComponent, type Visita, type ArchivoAdjunto } from "@/components/visitas/detalle-visita-component"

// Datos de ejemplo para visitas del admin
const visitasAdmin: Visita[] = [
  {
    id: "1",
    numero: "VIS-2024-001",
    visitante: "Juan Pérez",
    empresa: "PLP",
    fechaVisita: "06/01/2024",
    horaVisita: "09:00",
    estado: "Pendiente",
    motivo: "Visita de inspección laboral",
    tipo: "Laboral",
    sitio: "Tecno Port S.A.",
    personas: 2,
    vehiculos: 1,
    fechaInicio: "06/01/2024",
    fechaFin: "06/01/2024",
    horaInicio: "09:00",
    horaFin: "11:00",
    observaciones: "Visita programada para inspección de condiciones laborales.",
    solicitante: "Departamento de Compras",
    personasDetalle: [
      {
        id: "1",
        nombre: "Juan Pérez",
        documento: "25.123.456",
        empresa: "PLP",
        mail: "juan.perez@plp.com",
        telefono: "+54 11 1234-5678",
      },
      {
        id: "2",
        nombre: "María González",
        documento: "28.789.012",
        empresa: "PLP",
        mail: "maria.gonzalez@plp.com",
        telefono: "+54 11 2345-6789",
      },
    ],
    vehiculosDetalle: [
      {
        id: "1",
        tipo: "Auto",
        patente: "ABC123",
        marca: "Toyota",
        modelo: "Corolla",
      },
    ],
  },
  {
    id: "2",
    numero: "VIS-2023-156",
    visitante: "Juan Pérez",
    empresa: "Logística Portuaria",
    fechaVisita: "15/12/2023",
    horaVisita: "14:30",
    estado: "Aceptada",
    motivo: "Descarga de materiales importados",
    tipo: "Transporte cargas",
    sitio: "Muelle 3",
    personas: 4,
    vehiculos: 1,
    fechaInicio: "15/12/2023",
    fechaFin: "15/12/2023",
    horaInicio: "14:30",
    horaFin: "17:00",
    observaciones: "Transporte de materiales para proyecto de expansión.",
    solicitante: "Juan Pérez (Compras)",
    // Campos específicos para Transporte cargas
    operacion: "Descarga",
    tipoCarga: "Contenedores",
    recurrente: false,
    conductor: {
      nombre: "Carlos López",
      dni: "30.456.789",
      telefono: "+54 11 3456-7890",
      numeroLicencia: "LC-45678901",
    },
    razonSocial: "Logística Portuaria S.A.",
    cuit: "30-71234567-8",
    email: "contacto@logisticaportuaria.com",
    telefono: "+54 11 4000-5000",
    personasDetalle: [],
    vehiculosDetalle: [
      {
        id: "2",
        tipo: "Camión",
        patente: "DEF456",
        marca: "Scania",
        modelo: "R450",
      },
    ],
  },
  {
    id: "3",
    numero: "VIS-2023-142",
    visitante: "María González",
    empresa: "Construcciones S.A.",
    fechaVisita: "10/11/2023",
    horaVisita: "08:00",
    estado: "Finalizada",
    motivo: "Mantenimiento de sistemas de ventilación",
    tipo: "Obras/mantenimiento",
    sitio: "Galpón B",
    personas: 3,
    vehiculos: 1,
    fechaInicio: "10/11/2023",
    fechaFin: "10/11/2023",
    horaInicio: "08:00",
    horaFin: "16:00",
    observaciones: "Trabajos de mantenimiento completados satisfactoriamente.",
    solicitante: "María González (Logística)",
    // Campos específicos para Obras/mantenimiento
    tipoActividad: "Mantenimiento",
    actividad: "Mantenimiento preventivo de sistemas de ventilación y climatización",
    tipoContratacion: "Contrato",
    numeroExpediente: "EXP-2023-5678",
    conductor: {
      nombre: "Pedro Ramírez",
      dni: "27.890.123",
      telefono: "+54 11 6789-0123",
      numeroLicencia: "LC-98765432",
    },
    razonSocial: "Construcciones y Mantenimiento S.A.",
    cuit: "30-78901234-5",
    email: "info@construcciones.com.ar",
    telefono: "+54 11 4500-6700",
    personasDetalle: [
      {
        id: "7",
        nombre: "Pedro Ramírez",
        documento: "27.890.123",
        empresa: "Construcciones S.A.",
        mail: "pedro.ramirez@construcciones.com",
        telefono: "+54 11 6789-0123",
      },
      {
        id: "8",
        nombre: "Lucía Fernández",
        documento: "33.901.234",
        empresa: "Construcciones S.A.",
        mail: "lucia.fernandez@construcciones.com",
        telefono: "+54 11 7890-1235",
      },
      {
        id: "9",
        nombre: "Diego Castro",
        documento: "26.012.345",
        empresa: "Construcciones S.A.",
        mail: "diego.castro@construcciones.com",
        telefono: "+54 11 7890-1234",
      },
    ],
    vehiculosDetalle: [
      {
        id: "8",
        tipo: "Camioneta",
        patente: "XYZ789",
        marca: "Volkswagen",
        modelo: "Amarok",
      },
    ],
  },
  {
    id: "4",
    numero: "VIS-2023-128",
    visitante: "Carlos Rodríguez",
    empresa: "Servicios Marítimos",
    fechaVisita: "05/10/2023",
    horaVisita: "10:00",
    estado: "Cancelada",
    motivo: "Inspección de buque",
    tipo: "Acceso a muelle",
    sitio: "Muelle 1",
    personas: 2,
    vehiculos: 1,
    fechaInicio: "05/10/2023",
    fechaFin: "05/10/2023",
    horaInicio: "10:00",
    horaFin: "12:00",
    observaciones: "Visita cancelada por condiciones climáticas adversas.",
    solicitante: "Carlos Rodríguez (Calidad)",
    personasDetalle: [
      {
        id: "10",
        nombre: "Martín Suárez",
        documento: "34.123.456",
        empresa: "Servicios Marítimos",
        mail: "martin.suarez@maritimos.com",
        telefono: "+54 11 8901-2345",
      },
      {
        id: "11",
        nombre: "Sofía Morales",
        documento: "35.234.567",
        empresa: "Servicios Marítimos",
        telefono: "+54 11 9012-3456",
      },
    ],
    vehiculosDetalle: [
      {
        id: "4",
        tipo: "Camioneta",
        patente: "JKL012",
        marca: "Volkswagen",
        modelo: "Amarok",
      },
    ],
  },
  {
    id: "5",
    numero: "VIS-2024-020",
    visitante: "Ana Martínez",
    empresa: "Logística Express",
    fechaVisita: "20/01/2024",
    horaVisita: "13:00",
    estado: "En curso",
    motivo: "Carga de contenedores para exportación",
    tipo: "Transporte cargas",
    sitio: "Zona de Carga Norte",
    personas: 3,
    vehiculos: 1,
    fechaInicio: "16/01/2024",
    fechaFin: "30/01/2024",
    horaInicio: "13:00",
    horaFin: "18:00",
    observaciones: "Operación en curso.",
    solicitante: "Ana Martínez (Compras)",
    // Campos específicos para Transporte cargas
    operacion: "Carga",
    tipoCarga: "Granel",
    recurrente: true,
    diasRecurrentes: ["Lunes", "Miércoles", "Viernes"],
    conductor: {
      nombre: "Javier Romero",
      dni: "28.345.678",
      telefono: "+54 11 1111-2222",
      numeroLicencia: "LC-12345678",
    },
    razonSocial: "Logística Express S.R.L.",
    cuit: "30-65432109-7",
    email: "info@logisticaexpress.com.ar",
    telefono: "+54 11 5000-6000",
    personasDetalle: [],
    vehiculosDetalle: [
      {
        id: "5",
        tipo: "Camión",
        patente: "MNO345",
        marca: "Mercedes-Benz",
        modelo: "Actros",
      },
    ],
  },
  {
    id: "6",
    numero: "VIS-2024-025",
    visitante: "Roberto Sánchez",
    empresa: "Consultoría Empresarial",
    fechaVisita: "25/01/2024",
    horaVisita: "11:00",
    estado: "Rechazada",
    motivo: "Reunión de coordinación con proveedores",
    tipo: "Laboral",
    sitio: "Oficina de Compras",
    personas: 5,
    vehiculos: 2,
    fechaInicio: "25/01/2024",
    fechaFin: "25/01/2024",
    horaInicio: "11:00",
    horaFin: "14:00",
    observaciones: "Rechazada por falta de documentación requerida.",
    solicitante: "Roberto Sánchez (Finanzas)",
    personasDetalle: [
      {
        id: "15",
        nombre: "Patricia Gómez",
        documento: "31.678.901",
        empresa: "Consultoría Empresarial",
        mail: "patricia.gomez@consultoria.com",
        telefono: "+54 11 3333-4444",
      },
      {
        id: "16",
        nombre: "Gabriel Ruiz",
        documento: "32.789.012",
        empresa: "Consultoría Empresarial",
      },
      {
        id: "17",
        nombre: "Valeria Paz",
        documento: "33.890.123",
        empresa: "Consultoría Empresarial",
        mail: "valeria.paz@consultoria.com",
      },
      {
        id: "18",
        nombre: "Hernán Vega",
        documento: "34.901.234",
        empresa: "Consultoría Empresarial",
        telefono: "+54 11 4444-5555",
      },
      {
        id: "19",
        nombre: "Mónica Blanco",
        documento: "35.012.345",
        empresa: "Consultoría Empresarial",
        mail: "monica.blanco@consultoria.com",
      },
    ],
    vehiculosDetalle: [
      {
        id: "6",
        tipo: "Auto",
        patente: "PQR678",
        marca: "Chevrolet",
        modelo: "Cruze",
      },
      {
        id: "7",
        tipo: "Auto",
        patente: "STU901",
        marca: "Peugeot",
        modelo: "408",
      },
    ],
  },
  {
    id: "7",
    numero: "VIS-2024-030",
    visitante: "Ing. Carlos Martín",
    empresa: "Constructora del Puerto S.A.",
    fechaVisita: "05/02/2024",
    horaVisita: "07:00",
    estado: "Pendiente",
    motivo: "Obras de ampliación del muelle norte",
    tipo: "Obras/mantenimiento",
    sitio: "Muelle Norte - Zona de Expansión",
    personas: 8,
    vehiculos: 1,
    fechaInicio: "05/02/2024",
    fechaFin: "30/03/2024",
    horaInicio: "07:00",
    horaFin: "17:00",
    observaciones: "Obra correspondiente a la ampliación del sector norte del puerto.",
    solicitante: "Ing. Carlos Martín (Infraestructura)",
    // Campos específicos para Obras/mantenimiento
    tipoActividad: "Obras",
    actividad: "Construcción de nueva plataforma de carga, movimiento de suelos y cimentación",
    tipoContratacion: "Licitación",
    numeroLicitacion: "LIC-2023-045",
    conductor: {
      nombre: "Ricardo Gómez",
      dni: "29.456.789",
      telefono: "+54 11 5555-6666",
      numeroLicencia: "LC-11223344",
    },
    razonSocial: "Constructora del Puerto S.A.",
    cuit: "30-88888888-9",
    email: "obras@constructoraportuaria.com.ar",
    telefono: "+54 11 6000-7000",
    personasDetalle: [
      {
        id: "20",
        nombre: "Ricardo Gómez",
        documento: "29.456.789",
        empresa: "Constructora del Puerto S.A.",
        mail: "ricardo.gomez@constructora.com",
        telefono: "+54 11 5555-6666",
      },
      {
        id: "21",
        nombre: "Martín Silva",
        documento: "31.567.890",
        empresa: "Constructora del Puerto S.A.",
        mail: "martin.silva@constructora.com",
        telefono: "+54 11 5555-6667",
      },
      {
        id: "22",
        nombre: "Laura Pérez",
        documento: "28.678.901",
        empresa: "Constructora del Puerto S.A.",
        mail: "laura.perez@constructora.com",
        telefono: "+54 11 5555-6668",
      },
      {
        id: "23",
        nombre: "Juan Torres",
        documento: "32.789.012",
        empresa: "Constructora del Puerto S.A.",
        mail: "juan.torres@constructora.com",
        telefono: "+54 11 5555-6669",
      },
      {
        id: "24",
        nombre: "Ana Rodríguez",
        documento: "27.890.123",
        empresa: "Constructora del Puerto S.A.",
        mail: "ana.rodriguez@constructora.com",
        telefono: "+54 11 5555-6670",
      },
      {
        id: "25",
        nombre: "Diego Fernández",
        documento: "30.901.234",
        empresa: "Constructora del Puerto S.A.",
        mail: "diego.fernandez@constructora.com",
        telefono: "+54 11 5555-6671",
      },
      {
        id: "26",
        nombre: "Carolina Blanco",
        documento: "33.012.345",
        empresa: "Constructora del Puerto S.A.",
        mail: "carolina.blanco@constructora.com",
        telefono: "+54 11 5555-6672",
      },
      {
        id: "27",
        nombre: "Fernando López",
        documento: "26.123.456",
        empresa: "Constructora del Puerto S.A.",
        mail: "fernando.lopez@constructora.com",
        telefono: "+54 11 5555-6673",
      },
    ],
    vehiculosDetalle: [
      {
        id: "9",
        tipo: "Camioneta",
        patente: "ABC999",
        marca: "Toyota",
        modelo: "Hilux",
      },
    ],
  },
]

// Documentos de ejemplo
const documentosEjemplo: ArchivoAdjunto[] = [
  { nombre: "ART.pdf", archivo: "art.pdf", tipo: "ART" },
  { nombre: "Seguro_Vehiculo.pdf", archivo: "seguro-vehiculo.pdf", tipo: "Seguro del vehículo" },
  { nombre: "Permiso_Acceso.pdf", archivo: "permiso-acceso.pdf", tipo: "Permiso" },
  { nombre: "Certificado_Capacitacion.pdf", archivo: "certificado-capacitacion.pdf", tipo: "Certificado" },
  { nombre: "Cedula_Verde.pdf", archivo: "cedula-verde.pdf", tipo: "Cédula verde vehículo" },
  { nombre: "DNI_Conductor.pdf", archivo: "dni-conductor.pdf", tipo: "DNI conductor" },
  { nombre: "Licencia_Conducir.pdf", archivo: "licencia-conducir.pdf", tipo: "Licencia de conducir" },
]

export default function DetalleVisitaAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  // Buscar la visita según el ID
  const visita = visitasAdmin.find((v) => v.id === resolvedParams.id) || visitasAdmin[0]

  const handleAceptar = () => {
    alert(`Visita ${visita.numero} aceptada`)
    router.push("/admin/admin/visitas/mis-visitas")
  }

  const handleRechazar = () => {
    alert(`Visita ${visita.numero} rechazada`)
    router.push("/admin/admin/visitas/mis-visitas")
  }

  return (
    <DetalleVisitaComponent
      visita={visita}
      documentos={documentosEjemplo}
      acciones={{
        canApprove: visita.estado === "Pendiente",
        canReject: visita.estado === "Pendiente",
        onApprove: handleAceptar,
        onReject: handleRechazar,
      }}
      backUrl="/admin/admin/visitas/mis-visitas"
      userType="admin"
    />
  )
}

