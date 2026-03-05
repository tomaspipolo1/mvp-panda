import { notFound } from "next/navigation"
import DetallesSolicitudInscripcion, { SolicitudInscripcion } from "@/components/solicitudes/detalle-solicitud-inscripcion"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Datos de ejemplo para solicitudes de inscripción/reinscripción
const solicitudesInscripcion: SolicitudInscripcion[] = [
  {
    id: 1,
    numero: "SOL-LEG-3001",
    tipo: "Inscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de inscripción - Transportes Marítimos del Sur S.A.",
    descripcion: "Solicitamos la inscripción como empresa de servicios portuarios para operar en el puerto. Adjuntamos toda la documentación requerida incluyendo certificados de seguridad, licencias comerciales y documentación personal del personal operativo.",
    fecha: "18/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "18/02/2024",
    solicitante: "Transportes Marítimos del Sur S.A.",
    departamento: "Legales",
    correo: "legales@transportesmaritimos.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "18/02/2024 - Sistema: Solicitud creada",
      "18/02/2024 - Empresa: Documentación completa enviada",
    ],
    adjuntos: [
      "Certificado de Seguridad Marítima.pdf",
      "Licencia Comercial.pdf",
      "DNI Personal Operativo 1.jpg",
      "DNI Personal Operativo 2.jpg",
      "DNI Personal Operativo 3.jpg",
      "Certificado de Buena Conducta.pdf",
      "Constancia de CUIT.pdf",
      "Documentación de Vehículos.pdf",
      "Seguro de Responsabilidad Civil.pdf",
      "Certificado de Capacitación.pdf",
      "Documentación de Seguros.pdf",
      "Constancia Bancaria.pdf",
      "Documentación de Facturación.pdf"
    ],
    // Campos específicos para inscripción
    naturalezaOrganizacion: "Sociedades legalmente Constituidas",
    tipoSocietario: "SRL",
    nombre: "Juan Carlos",
    apellido: "González",
    apoderado: "si",
    apoderadoNombre: "María Elena",
    apoderadoApellido: "Rodríguez",
    apoderadoDni: "87654321",
    razonSocial: "Transportes Marítimos del Sur S.A.",
    cuit: "30-12345678-9",
    nombreFantasia: "TransMarSur",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    domicilioFiscal: "Calle 59 412, La Plata, Buenos Aires",
    domicilioComercial: "Av. San Martín 1234, La Plata, Buenos Aires",
    nombreCompleto: "María Elena Rodríguez",
    cargo: "Gerente Comercial",
    telefono: "+54 221 456-7890",
    email: "maria.rodriguez@transmarsur.com",
    banco: "Banco de la Nación Argentina",
    tipoCuenta: "Cuenta Corriente",
    numeroCuenta: "1234567890",
    cbu: "0110123456789012345678",
    // Personal y vehículos
    personalSeleccionado: [
      { nombre: "Juan Pérez", dni: "12345678", telefono: "+54 11 1234-5678" },
      { nombre: "María González", dni: "87654321", telefono: "+54 11 8765-4321" },
      { nombre: "Carlos Rodríguez", dni: "11223344", telefono: "+54 11 1122-3344" },
      { nombre: "Ana Martínez", dni: "55667788", telefono: "+54 11 5566-7788" },
      { nombre: "Luis Fernández", dni: "99887766", telefono: "+54 11 9988-7766" },
      { nombre: "Sofía Ramírez", dni: "44332211", telefono: "+54 11 4433-2211" },
      { nombre: "Diego Torres", dni: "77889900", telefono: "+54 11 7788-9900" },
      { nombre: "Laura Silva", dni: "11223344", telefono: "+54 11 1122-3344" }
    ],
    vehiculosSeleccionados: [
      { tipo: "Camión", patente: "ABC123", marca: "Mercedes-Benz" },
      { tipo: "Furgón", patente: "XYZ789", marca: "Ford" },
      { tipo: "Camioneta", patente: "DEF456", marca: "Toyota" },
      { tipo: "Camión", patente: "GHI789", marca: "Volvo" },
      { tipo: "Furgón", patente: "JKL012", marca: "Renault" }
    ],
    // Documentación detallada
    documentacionPersonal: [
      { id: "certificado-apoderado", nombre: "Certificado apoderado", estado: "completado", fechaCarga: "18/02/2024", archivo: "certificado-apoderado.pdf" },
      { id: "declaracion-jurada", nombre: "Declaración jurada copia fiel (del apoderado)", estado: "completado", fechaCarga: "18/02/2024", archivo: "declaracion-jurada.pdf" }
    ],
    documentacionGeneral: [
      { id: "arca", nombre: "Régimen tributario ARCA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "arca.pdf" },
      { id: "arba", nombre: "Régimen tributario ARBA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "arba.pdf" },
      { id: "convenio-multilateral", nombre: "Convenio multilateral", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "convenio-multilateral.pdf" },
      { id: "exenciones-impositivas", nombre: "Exenciones impositivas", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "exenciones-impositivas.pdf" },
      { id: "sistema-cuenta-tributaria", nombre: "Sistema cuenta tributaria (Estado de cumplimiento)", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "18/02/2024", archivo: "sistema-cuenta-tributaria.pdf" },
      { id: "constancia-inscripcion", nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "constancia-inscripcion.pdf" },
      { id: "certificado-anotaciones", nombre: "Certificado de Anotaciones Personales", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "certificado-anotaciones.pdf" },
      { id: "informe-juicio-universales", nombre: "Informe Juicio Universales", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "18/02/2024", archivo: "informe-juicio-universales.pdf" },
      { id: "contrato-social", nombre: "Contrato Social y modificaciones", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "contrato-social.pdf" },
      { id: "nota-modificacion-contrato", nombre: "Nota en caso de modificación de contrato", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "nota-modificacion-contrato.pdf" },
      { id: "acta-conformacion-organo-directivo", nombre: "Acta conformación Organo Directivo, Designación de autoridades y distribución de cargos", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "acta-conformacion-organo-directivo.pdf" },
      { id: "ultimos-2-balances", nombre: "Ultimos 2 balances", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "ultimos-2-balances.pdf" }
    ],
    documentacionSeguros: [
      { id: "art-personal", nombre: "ART Personal", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "18/02/2024", archivo: "art-personal.pdf" },
      { id: "responsable-seguridad", nombre: "Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo", estado: "completado", fechaCarga: "18/02/2024", archivo: "responsable-seguridad.pdf" }
    ],
    documentacionFacturacion: [
      { id: "factura-inscripcion", nombre: "Factura Inscripción", estado: "completado", fechaCarga: "18/02/2024", archivo: "factura-inscripcion.pdf" },
      { id: "comprobante-pago-factura", nombre: "Comprobante de Pago factura", estado: "completado", fechaCarga: "18/02/2024", archivo: "comprobante-pago-factura.pdf" }
    ],
    // Flujo de aprobación
    aprobadores: {
      legales: {
        aprobado: false
      },
      contable: {
        aprobado: false
      },
      habilitacion: {
        habilitado: false
      }
    }
  },
  {
    id: 2,
    numero: "SOL-LEG-3002",
    tipo: "Inscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de inscripción - Servicios Portuarios del Norte",
    descripcion: "Nueva empresa solicitando inscripción para operar servicios portuarios. Especializados en carga general y contenedores. Adjuntamos toda la documentación legal y técnica requerida.",
    fecha: "22/02/2024",
    estado: "Aprobada por Legales",
    ultimaActualizacion: "23/02/2024",
    solicitante: "Servicios Portuarios del Norte",
    departamento: "Legales",
    correo: "contacto@serviciosportuariosnorte.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "22/02/2024 - Sistema: Solicitud creada",
      "22/02/2024 - Empresa: Documentación inicial enviada",
      "23/02/2024 - Laura Pérez: Aprobada por Legales",
    ],
    adjuntos: [
      "Certificado de Seguridad.pdf",
      "Licencia Comercial.pdf",
      "DNI Personal Operativo 1.jpg",
      "DNI Personal Operativo 2.jpg",
      "DNI Personal Operativo 3.jpg",
      "DNI Personal Operativo 4.jpg",
      "DNI Personal Operativo 5.jpg",
      "DNI Personal Operativo 6.jpg",
      "DNI Personal Operativo 7.jpg",
      "DNI Personal Operativo 8.jpg",
      "Certificado de Buena Conducta.pdf",
      "Constancia de CUIT.pdf",
      "Documentación de Vehículos.pdf",
      "Seguro de Responsabilidad Civil.pdf",
      "Certificado de Capacitación.pdf",
      "Documentación de Seguros.pdf",
      "Constancia Bancaria.pdf",
      "Documentación de Facturación.pdf",
      "Plan de Operaciones.pdf",
      "Certificado de Capacidad Técnica.pdf"
    ],
    // Campos específicos para inscripción
    naturalezaOrganizacion: "Sociedades legalmente Constituidas",
    tipoSocietario: "SA",
    nombre: "Roberto",
    apellido: "Martínez",
    apoderado: "no",
    razonSocial: "Servicios Portuarios del Norte S.A.",
    cuit: "30-98765432-1",
    nombreFantasia: "Portuarios Norte",
    ultimaActividad: "Nueva empresa",
    convenioMultilateral: "No",
    exencionesImpositivas: "No",
    domicilioFiscal: "Av. Costanera 456, La Plata, Buenos Aires",
    domicilioComercial: "Av. Costanera 456, La Plata, Buenos Aires",
    nombreCompleto: "Roberto Martínez",
    cargo: "Director Ejecutivo",
    telefono: "+54 221 789-0123",
    email: "roberto.martinez@portuariosnorte.com",
    banco: "Banco Santander",
    tipoCuenta: "Cuenta Corriente",
    numeroCuenta: "9876543210",
    cbu: "0070123456789012345678",
    // Personal y vehículos
    personalSeleccionado: [
      { nombre: "Roberto Martínez", dni: "11223344", telefono: "+54 11 1122-3344" },
      { nombre: "María López", dni: "55667788", telefono: "+54 11 5566-7788" },
      { nombre: "Carlos Fernández", dni: "99887766", telefono: "+54 11 9988-7766" },
      { nombre: "Ana García", dni: "44332211", telefono: "+54 11 4433-2211" },
      { nombre: "Luis Rodríguez", dni: "77889900", telefono: "+54 11 7788-9900" },
      { nombre: "Sofía Torres", dni: "12345678", telefono: "+54 11 1234-5678" }
    ],
    vehiculosSeleccionados: [
      { tipo: "Camión", patente: "MNO345", marca: "Scania" },
      { tipo: "Furgón", patente: "PQR678", marca: "Iveco" },
      { tipo: "Camioneta", patente: "STU901", marca: "Nissan" },
      { tipo: "Camión", patente: "VWX234", marca: "MAN" }
    ],
    // Documentación detallada
    documentacionPersonal: [
      { id: "copia-dni", nombre: "Copia DNI", estado: "completado", fechaCarga: "22/02/2024", archivo: "copia-dni.pdf" }
    ],
    documentacionGeneral: [
      { id: "arca", nombre: "Régimen tributario ARCA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "arca.pdf" },
      { id: "arba", nombre: "Régimen tributario ARBA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "arba.pdf" },
      { id: "convenio-multilateral", nombre: "Convenio multilateral", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "convenio-multilateral.pdf" },
      { id: "exenciones-impositivas", nombre: "Exenciones impositivas", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "exenciones-impositivas.pdf" },
      { id: "sistema-cuenta-tributaria", nombre: "Sistema cuenta tributaria (Estado de cumplimiento)", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "22/02/2024", archivo: "sistema-cuenta-tributaria.pdf" },
      { id: "constancia-inscripcion", nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "constancia-inscripcion.pdf" },
      { id: "certificado-anotaciones", nombre: "Certificado de Anotaciones Personales", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "certificado-anotaciones.pdf" },
      { id: "informe-juicio-universales", nombre: "Informe Juicio Universales", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "22/02/2024", archivo: "informe-juicio-universales.pdf" },
      { id: "contrato-social", nombre: "Contrato Social y modificaciones", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "contrato-social.pdf" },
      { id: "nota-modificacion-contrato", nombre: "Nota en caso de modificación de contrato", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "nota-modificacion-contrato.pdf" },
      { id: "acta-conformacion-organo-directivo", nombre: "Acta conformación Organo Directivo, Designación de autoridades y distribución de cargos", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "acta-conformacion-organo-directivo.pdf" },
      { id: "ultimos-2-balances", nombre: "Ultimos 2 balances", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "ultimos-2-balances.pdf" }
    ],
    documentacionSeguros: [
      { id: "art-personal", nombre: "ART Personal", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "22/02/2024", archivo: "art-personal.pdf" },
      { id: "responsable-seguridad", nombre: "Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo", estado: "completado", fechaCarga: "22/02/2024", archivo: "responsable-seguridad.pdf" }
    ],
    documentacionFacturacion: [
      { id: "factura-inscripcion", nombre: "Factura Inscripción", estado: "completado", fechaCarga: "22/02/2024", archivo: "factura-inscripcion.pdf" },
      { id: "comprobante-pago-factura", nombre: "Comprobante de Pago factura", estado: "completado", fechaCarga: "22/02/2024", archivo: "comprobante-pago-factura.pdf" }
    ],
    // Flujo de aprobación
    aprobadores: {
      legales: {
        aprobado: true,
        aprobadoPor: "Laura Pérez",
        fechaAprobacion: "23/02/2024"
      },
      contable: {
        aprobado: false
      },
      habilitacion: {
        habilitado: false
      }
    }
  },
  {
    id: 3,
    numero: "SOL-LEG-3003",
    tipo: "Reinscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de reinscripción - Logística Portuaria Integral SRL",
    descripcion: "Solicitamos la reinscripción como empresa de servicios portuarios. Nuestra inscripción anterior expiró y necesitamos renovar la autorización para continuar operando. Adjuntamos documentación actualizada y renovada.",
    fecha: "19/02/2024",
    estado: "Habilitada",
    ultimaActualizacion: "25/02/2024",
    solicitante: "Logística Portuaria Integral SRL",
    departamento: "Legales",
    correo: "administracion@logisticaportuaria.com",
    asignacion: "Carlos López",
    comentarios: [
      "19/02/2024 - Sistema: Solicitud creada",
      "19/02/2024 - Empresa: Documentación de reinscripción enviada",
      "20/02/2024 - Carlos López: Aprobada por Legales",
      "22/02/2024 - Ana García: Aprobada por Contable",
      "25/02/2024 - Laura Pérez: Habilitada",
    ],
    adjuntos: [
      "Certificado de Seguridad Renovado.pdf",
      "Licencia Comercial Actualizada.pdf",
      "DNI Personal Operativo 1.jpg",
      "DNI Personal Operativo 2.jpg",
      "DNI Personal Operativo 3.jpg",
      "DNI Personal Operativo 4.jpg",
      "DNI Personal Operativo 5.jpg",
      "Certificado de Buena Conducta.pdf",
      "Constancia de CUIT.pdf",
      "Documentación de Vehículos Actualizada.pdf",
      "Seguro de Responsabilidad Civil Renovado.pdf",
      "Certificado de Capacitación Actualizado.pdf",
      "Documentación de Seguros Renovada.pdf",
      "Constancia Bancaria Actualizada.pdf",
      "Documentación de Facturación Actualizada.pdf",
      "Historial de Operaciones.pdf",
      "Certificado de Cumplimiento Fiscal.pdf"
    ],
    // Campos específicos para reinscripción
    naturalezaOrganizacion: "Sociedades legalmente Constituidas",
    tipoSocietario: "SRL",
    nombre: "Carlos",
    apellido: "López",
    apoderado: "si",
    apoderadoNombre: "María",
    apoderadoApellido: "Fernández",
    apoderadoDni: "11223344",
    razonSocial: "Logística Portuaria Integral SRL",
    cuit: "30-55556666-7",
    nombreFantasia: "LogPort Integral",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    domicilioFiscal: "Calle 12 789, La Plata, Buenos Aires",
    domicilioComercial: "Calle 12 789, La Plata, Buenos Aires",
    nombreCompleto: "María Fernández",
    cargo: "Gerente Administrativa",
    telefono: "+54 221 345-6789",
    email: "maria.fernandez@logportintegral.com",
    banco: "Banco Galicia",
    tipoCuenta: "Cuenta Corriente",
    numeroCuenta: "5555666677",
    cbu: "0070123456789012345678",
    // Personal y vehículos
    personalSeleccionado: [
      { nombre: "Carlos López", dni: "99887766", telefono: "+54 11 9988-7766" },
      { nombre: "María Fernández", dni: "11223344", telefono: "+54 11 1122-3344" },
      { nombre: "Ana García", dni: "55667788", telefono: "+54 11 5566-7788" },
      { nombre: "Luis Rodríguez", dni: "44332211", telefono: "+54 11 4433-2211" },
      { nombre: "Sofía Torres", dni: "77889900", telefono: "+54 11 7788-9900" },
      { nombre: "Diego Martínez", dni: "12345678", telefono: "+54 11 1234-5678" },
      { nombre: "Laura Silva", dni: "87654321", telefono: "+54 11 8765-4321" }
    ],
    vehiculosSeleccionados: [
      { tipo: "Camión", patente: "ABC123", marca: "Mercedes-Benz" },
      { tipo: "Furgón", patente: "XYZ789", marca: "Ford" },
      { tipo: "Camioneta", patente: "DEF456", marca: "Toyota" },
      { tipo: "Camión", patente: "GHI789", marca: "Volvo" },
      { tipo: "Furgón", patente: "JKL012", marca: "Renault" }
    ],
    // Documentación detallada
    documentacionPersonal: [
      { id: "certificado-apoderado", nombre: "Certificado apoderado", estado: "completado", fechaCarga: "19/02/2024", archivo: "certificado-apoderado.pdf" },
      { id: "declaracion-jurada", nombre: "Declaración jurada copia fiel (del apoderado)", estado: "completado", fechaCarga: "19/02/2024", archivo: "declaracion-jurada.pdf" }
    ],
    documentacionGeneral: [
      { id: "arca", nombre: "Régimen tributario ARCA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "arca.pdf" },
      { id: "arba", nombre: "Régimen tributario ARBA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "arba.pdf" },
      { id: "convenio-multilateral", nombre: "Convenio multilateral", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "convenio-multilateral.pdf" },
      { id: "exenciones-impositivas", nombre: "Exenciones impositivas", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "exenciones-impositivas.pdf" },
      { id: "sistema-cuenta-tributaria", nombre: "Sistema cuenta tributaria (Estado de cumplimiento)", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "19/02/2024", archivo: "sistema-cuenta-tributaria.pdf" },
      { id: "constancia-inscripcion", nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "constancia-inscripcion.pdf" },
      { id: "certificado-anotaciones", nombre: "Certificado de Anotaciones Personales", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "certificado-anotaciones.pdf" },
      { id: "informe-juicio-universales", nombre: "Informe Juicio Universales", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "19/02/2024", archivo: "informe-juicio-universales.pdf" },
      { id: "contrato-social", nombre: "Contrato Social y modificaciones", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "contrato-social.pdf" },
      { id: "nota-modificacion-contrato", nombre: "Nota en caso de modificación de contrato", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "nota-modificacion-contrato.pdf" },
      { id: "acta-conformacion-organo-directivo", nombre: "Acta conformación Organo Directivo, Designación de autoridades y distribución de cargos", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "acta-conformacion-organo-directivo.pdf" },
      { id: "ultimos-2-balances", nombre: "Ultimos 2 balances", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "ultimos-2-balances.pdf" }
    ],
    documentacionSeguros: [
      { id: "art-personal", nombre: "ART Personal", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "19/02/2024", archivo: "art-personal.pdf" },
      { id: "responsable-seguridad", nombre: "Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo", estado: "completado", fechaCarga: "19/02/2024", archivo: "responsable-seguridad.pdf" }
    ],
    documentacionFacturacion: [
      { id: "factura-inscripcion", nombre: "Factura Inscripción", estado: "completado", fechaCarga: "19/02/2024", archivo: "factura-inscripcion.pdf" },
      { id: "comprobante-pago-factura", nombre: "Comprobante de Pago factura", estado: "completado", fechaCarga: "19/02/2024", archivo: "comprobante-pago-factura.pdf" }
    ],
    // Flujo de aprobación
    aprobadores: {
      legales: {
        aprobado: true,
        aprobadoPor: "Carlos López",
        fechaAprobacion: "20/02/2024"
      },
      contable: {
        aprobado: true,
        aprobadoPor: "Ana García",
        fechaAprobacion: "22/02/2024"
      },
      habilitacion: {
        habilitado: true,
        habilitadoPor: "Laura Pérez",
        fechaHabilitacion: "25/02/2024"
      }
    }
  },
  {
    id: 4,
    numero: "SOL-LEG-3004",
    tipo: "Reinscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de reinscripción - Insumos Portuarios SRL",
    descripcion: "Solicitamos la reinscripción como empresa de servicios portuarios. Nuestra inscripción anterior expiró y necesitamos renovar la autorización para continuar operando. Adjuntamos documentación actualizada y renovada.",
    fecha: "21/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "24/02/2024",
    solicitante: "Insumos Portuarios SRL",
    departamento: "Legales",
    correo: "ventas@insumosportuarios.com",
    asignacion: "Roberto Silva",
    comentarios: [
      "21/02/2024 - Sistema: Solicitud creada",
      "21/02/2024 - Empresa: Documentación de reinscripción enviada",
      "24/02/2024 - Roberto Silva: Rechazada - documentación incompleta",
    ],
    adjuntos: [
      "Certificado de Seguridad.pdf",
      "Licencia Comercial.pdf",
      "DNI Personal Operativo 1.jpg",
      "DNI Personal Operativo 2.jpg",
      "Certificado de Buena Conducta.pdf",
      "Constancia de CUIT.pdf"
    ],
    // Campos específicos para reinscripción
    naturalezaOrganizacion: "Sociedades legalmente Constituidas",
    tipoSocietario: "SRL",
    nombre: "Roberto",
    apellido: "Silva",
    apoderado: "no",
    razonSocial: "Insumos Portuarios SRL",
    cuit: "30-77778888-9",
    nombreFantasia: "Insumos Port",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    domicilioFiscal: "Av. 7 123, La Plata, Buenos Aires",
    domicilioComercial: "Av. 7 123, La Plata, Buenos Aires",
    nombreCompleto: "Roberto Silva",
    cargo: "Gerente General",
    telefono: "+54 221 234-5678",
    email: "roberto.silva@insumosport.com",
    banco: "Banco Macro",
    tipoCuenta: "Cuenta Corriente",
    numeroCuenta: "7777888899",
    cbu: "0070123456789012345678",
    // Personal y vehículos
    personalSeleccionado: [
      { nombre: "Roberto Silva", dni: "11223344", telefono: "+54 11 1122-3344" },
      { nombre: "María López", dni: "55667788", telefono: "+54 11 5566-7788" },
      { nombre: "Carlos Fernández", dni: "99887766", telefono: "+54 11 9988-7766" }
    ],
    vehiculosSeleccionados: [
      { tipo: "Camión", patente: "ABC123", marca: "Mercedes-Benz" },
      { tipo: "Furgón", patente: "XYZ789", marca: "Ford" }
    ],
    // Documentación detallada
    documentacionPersonal: [
      { id: "copia-dni", nombre: "Copia DNI", estado: "completado", fechaCarga: "21/02/2024", archivo: "copia-dni.pdf" }
    ],
    documentacionGeneral: [
      { id: "arca", nombre: "Régimen tributario ARCA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "arca.pdf" },
      { id: "arba", nombre: "Régimen tributario ARBA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "arba.pdf" },
      { id: "convenio-multilateral", nombre: "Convenio multilateral", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "convenio-multilateral.pdf" },
      { id: "exenciones-impositivas", nombre: "Exenciones impositivas", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "exenciones-impositivas.pdf" },
      { id: "sistema-cuenta-tributaria", nombre: "Sistema cuenta tributaria (Estado de cumplimiento)", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "21/02/2024", archivo: "sistema-cuenta-tributaria.pdf" },
      { id: "constancia-inscripcion", nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "constancia-inscripcion.pdf" },
      { id: "certificado-anotaciones", nombre: "Certificado de Anotaciones Personales", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "certificado-anotaciones.pdf" },
      { id: "informe-juicio-universales", nombre: "Informe Juicio Universales", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "21/02/2024", archivo: "informe-juicio-universales.pdf" },
      { id: "contrato-social", nombre: "Contrato Social y modificaciones", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "contrato-social.pdf" },
      { id: "nota-modificacion-contrato", nombre: "Nota en caso de modificación de contrato", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "nota-modificacion-contrato.pdf" },
      { id: "acta-conformacion-organo-directivo", nombre: "Acta conformación Organo Directivo, Designación de autoridades y distribución de cargos", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "acta-conformacion-organo-directivo.pdf" },
      { id: "ultimos-2-balances", nombre: "Ultimos 2 balances", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "ultimos-2-balances.pdf" }
    ],
    documentacionSeguros: [
      { id: "art-personal", nombre: "ART Personal", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "21/02/2024", archivo: "art-personal.pdf" },
      { id: "responsable-seguridad", nombre: "Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo", estado: "completado", fechaCarga: "21/02/2024", archivo: "responsable-seguridad.pdf" }
    ],
    documentacionFacturacion: [
      { id: "factura-inscripcion", nombre: "Factura Inscripción", estado: "completado", fechaCarga: "21/02/2024", archivo: "factura-inscripcion.pdf" },
      { id: "comprobante-pago-factura", nombre: "Comprobante de Pago factura", estado: "completado", fechaCarga: "21/02/2024", archivo: "comprobante-pago-factura.pdf" }
    ],
    // Flujo de aprobación
    aprobadores: {
      legales: {
        aprobado: false
      },
      contable: {
        aprobado: false
      },
      habilitacion: {
        habilitado: false
      }
    }
  },
  {
    id: 3,
    numero: "SOL-LEG-3003",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Consulta sobre procedimientos de inscripción",
    descripcion: "Consulto sobre los procedimientos y requisitos para la inscripción de nuevas empresas de servicios portuarios. Necesito información detallada sobre documentación requerida.",
    fecha: "20/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Servicios Portuarios del Norte",
    departamento: "Legales",
    correo: "contacto@serviciosportuariosnorte.com",
    asignacion: "Ana Martínez",
    comentarios: [
      "20/02/2024 - Sistema: Solicitud creada",
      "20/02/2024 - Empresa: Consulta sobre procedimientos",
    ],
  },
  {
    id: 4,
    numero: "SOL-LEG-3004",
    tipo: "Reclamo",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por demora en procesamiento de inscripción",
    descripcion: "Reclamamos la demora excesiva en el procesamiento de nuestra solicitud de inscripción SOL-LEG-2998. La documentación fue entregada hace 45 días y aún no hemos recibido respuesta.",
    fecha: "21/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "21/02/2024",
    solicitante: "Insumos Portuarios SRL",
    departamento: "Legales",
    correo: "ventas@insumosportuarios.com",
    asignacion: "Roberto Silva",
    comentarios: [
      "21/02/2024 - Sistema: Solicitud creada",
      "21/02/2024 - Roberto Silva: Reclamo rechazado - documentación incompleta",
    ],
  },
  {
    id: 5,
    numero: "SOL-LEG-3005",
    tipo: "Inscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de inscripción - Servicios Portuarios del Norte",
    descripcion: "Nueva empresa solicitando inscripción para operar servicios portuarios. Especializados en carga general y contenedores. Adjuntamos toda la documentación legal y técnica requerida.",
    fecha: "22/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "22/02/2024",
    solicitante: "Servicios Portuarios del Norte",
    departamento: "Legales",
    correo: "contacto@serviciosportuariosnorte.com",
    asignacion: "Sin asignar",
    comentarios: [
      "22/02/2024 - Sistema: Solicitud creada",
      "22/02/2024 - Empresa: Documentación inicial enviada",
    ],
    adjuntos: [
      "Certificado de Seguridad.pdf",
      "Licencia Comercial.pdf",
      "DNI Personal Operativo 1.jpg",
      "DNI Personal Operativo 2.jpg",
      "DNI Personal Operativo 3.jpg",
      "DNI Personal Operativo 4.jpg",
      "DNI Personal Operativo 5.jpg",
      "DNI Personal Operativo 6.jpg",
      "DNI Personal Operativo 7.jpg",
      "DNI Personal Operativo 8.jpg",
      "Certificado de Buena Conducta.pdf",
      "Constancia de CUIT.pdf",
      "Documentación de Vehículos.pdf",
      "Seguro de Responsabilidad Civil.pdf",
      "Certificado de Capacitación.pdf",
      "Documentación de Seguros.pdf",
      "Constancia Bancaria.pdf",
      "Documentación de Facturación.pdf",
      "Plan de Operaciones.pdf",
      "Certificado de Capacidad Técnica.pdf"
    ],
  },
  {
    id: 8,
    numero: "SOL-LEG-3008",
    tipo: "Inscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de inscripción - Servicios Portuarios del Este S.A.",
    descripcion: "Nueva empresa solicitando inscripción para operar servicios portuarios en la zona este del puerto. Especializados en carga de granos y contenedores refrigerados. Documentación completa enviada y aprobada por ambos departamentos.",
    fecha: "25/02/2024",
    estado: "Aprobada por Contable",
    ultimaActualizacion: "26/02/2024",
    solicitante: "Servicios Portuarios del Este S.A.",
    departamento: "Legales",
    correo: "contacto@serviciosportuarioseste.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "25/02/2024 - Sistema: Solicitud creada",
      "25/02/2024 - Empresa: Documentación completa enviada",
      "25/02/2024 - Laura Pérez: Aprobada por Legales",
      "26/02/2024 - Ana García: Aprobada por Contable - Pendiente habilitación",
    ],
    adjuntos: [
      "Certificado de Seguridad Marítima.pdf",
      "Licencia Comercial.pdf",
      "DNI Personal Operativo 1.jpg",
      "DNI Personal Operativo 2.jpg",
      "DNI Personal Operativo 3.jpg",
      "DNI Personal Operativo 4.jpg",
      "DNI Personal Operativo 5.jpg",
      "DNI Personal Operativo 6.jpg",
      "DNI Personal Operativo 7.jpg",
      "DNI Personal Operativo 8.jpg",
      "DNI Personal Operativo 9.jpg",
      "DNI Personal Operativo 10.jpg",
      "Certificado de Buena Conducta.pdf",
      "Constancia de CUIT.pdf",
      "Documentación de Vehículos.pdf",
      "Seguro de Responsabilidad Civil.pdf",
      "Certificado de Capacitación.pdf",
      "Documentación de Seguros.pdf",
      "Constancia Bancaria.pdf",
      "Documentación de Facturación.pdf",
      "Plan de Operaciones.pdf",
      "Certificado de Capacidad Técnica.pdf",
      "Certificado de Cumplimiento Ambiental.pdf",
      "Permiso de Operaciones Especiales.pdf"
    ],
    // Campos específicos para inscripción
    naturalezaOrganizacion: "Sociedades legalmente Constituidas",
    tipoSocietario: "SA",
    nombre: "Miguel",
    apellido: "Torres",
    apoderado: "si",
    apoderadoNombre: "Elena",
    apoderadoApellido: "Vargas",
    apoderadoDni: "33445566",
    razonSocial: "Servicios Portuarios del Este S.A.",
    cuit: "30-11112222-3",
    nombreFantasia: "Portuarios Este",
    ultimaActividad: "Nueva empresa",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    domicilioFiscal: "Av. del Puerto 789, La Plata, Buenos Aires",
    domicilioComercial: "Av. del Puerto 789, La Plata, Buenos Aires",
    nombreCompleto: "Elena Vargas",
    cargo: "Gerente General",
    telefono: "+54 221 999-8888",
    email: "elena.vargas@portuarioseste.com",
    banco: "Banco Nación",
    tipoCuenta: "Cuenta Corriente",
    numeroCuenta: "1111222233",
    cbu: "0110111122223333444455",
    // Personal y vehículos
    personalSeleccionado: [
      { nombre: "Miguel Torres", dni: "33445566", telefono: "+54 11 3344-5566" },
      { nombre: "Elena Vargas", dni: "77889900", telefono: "+54 11 7788-9900" },
      { nombre: "Roberto García", dni: "11223344", telefono: "+54 11 1122-3344" },
      { nombre: "María López", dni: "55667788", telefono: "+54 11 5566-7788" },
      { nombre: "Carlos Fernández", dni: "99887766", telefono: "+54 11 9988-7766" },
      { nombre: "Ana Martínez", dni: "44332211", telefono: "+54 11 4433-2211" },
      { nombre: "Luis Rodríguez", dni: "66778899", telefono: "+54 11 6677-8899" },
      { nombre: "Sofía Torres", dni: "12345678", telefono: "+54 11 1234-5678" },
      { nombre: "Diego Silva", dni: "87654321", telefono: "+54 11 8765-4321" },
      { nombre: "Laura González", dni: "22334455", telefono: "+54 11 2233-4455" }
    ],
    vehiculosSeleccionados: [
      { tipo: "Camión", patente: "EST001", marca: "Scania" },
      { tipo: "Furgón", patente: "EST002", marca: "Iveco" },
      { tipo: "Camioneta", patente: "EST003", marca: "Nissan" },
      { tipo: "Camión", patente: "EST004", marca: "MAN" },
      { tipo: "Furgón", patente: "EST005", marca: "Mercedes-Benz" },
      { tipo: "Camión", patente: "EST006", marca: "Volvo" }
    ],
    // Documentación detallada
    documentacionPersonal: [
      { id: "certificado-apoderado", nombre: "Certificado apoderado", estado: "completado", fechaCarga: "25/02/2024", archivo: "certificado-apoderado.pdf" },
      { id: "declaracion-jurada", nombre: "Declaración jurada copia fiel (del apoderado)", estado: "completado", fechaCarga: "25/02/2024", archivo: "declaracion-jurada.pdf" }
    ],
    documentacionGeneral: [
      { id: "arca", nombre: "Régimen tributario ARCA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "arca.pdf" },
      { id: "arba", nombre: "Régimen tributario ARBA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "arba.pdf" },
      { id: "convenio-multilateral", nombre: "Convenio multilateral", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "convenio-multilateral.pdf" },
      { id: "exenciones-impositivas", nombre: "Exenciones impositivas", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "exenciones-impositivas.pdf" },
      { id: "sistema-cuenta-tributaria", nombre: "Sistema cuenta tributaria (Estado de cumplimiento)", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "25/02/2024", archivo: "sistema-cuenta-tributaria.pdf" },
      { id: "constancia-inscripcion", nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "constancia-inscripcion.pdf" },
      { id: "certificado-anotaciones", nombre: "Certificado de Anotaciones Personales", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "certificado-anotaciones.pdf" },
      { id: "informe-juicio-universales", nombre: "Informe Juicio Universales", estado: "completado", fechaEmision: "01/01/2024", fechaCarga: "25/02/2024", archivo: "informe-juicio-universales.pdf" },
      { id: "contrato-social", nombre: "Contrato Social y modificaciones", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "contrato-social.pdf" },
      { id: "nota-modificacion-contrato", nombre: "Nota en caso de modificación de contrato", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "nota-modificacion-contrato.pdf" },
      { id: "acta-conformacion-organo-directivo", nombre: "Acta conformación Organo Directivo, Designación de autoridades y distribución de cargos", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "acta-conformacion-organo-directivo.pdf" },
      { id: "ultimos-2-balances", nombre: "Ultimos 2 balances", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "ultimos-2-balances.pdf" }
    ],
    documentacionSeguros: [
      { id: "art-personal", nombre: "ART Personal", estado: "completado", fechaEmision: "01/01/2024", fechaVencimiento: "31/12/2024", fechaCarga: "25/02/2024", archivo: "art-personal.pdf" },
      { id: "responsable-seguridad", nombre: "Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo", estado: "completado", fechaCarga: "25/02/2024", archivo: "responsable-seguridad.pdf" }
    ],
    documentacionFacturacion: [
      { id: "factura-inscripcion", nombre: "Factura Inscripción", estado: "completado", fechaCarga: "25/02/2024", archivo: "factura-inscripcion.pdf" },
      { id: "comprobante-pago-factura", nombre: "Comprobante de Pago factura", estado: "completado", fechaCarga: "25/02/2024", archivo: "comprobante-pago-factura.pdf" }
    ],
    // Flujo de aprobación - Aprobada por Legales y Contable, pendiente de Habilitar
    aprobadores: {
      legales: {
        aprobado: true,
        aprobadoPor: "Laura Pérez",
        fechaAprobacion: "25/02/2024"
      },
      contable: {
        aprobado: true,
        aprobadoPor: "Ana García",
        fechaAprobacion: "26/02/2024"
      },
      habilitacion: {
        habilitado: false
      }
    }
  },
]

// Datos de ejemplo para solicitudes simples (consulta, reclamo, tramite)
const solicitudesSimples: SolicitudEmpleado[] = [
  {
    id: 5,
    numero: "SOL-LEG-3005",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Consulta sobre procedimientos de inscripción",
    descripcion: "Consulto sobre los procedimientos y requisitos para la inscripción de nuevas empresas de servicios portuarios. Necesito información detallada sobre documentación requerida.",
    fecha: "20/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Servicios Portuarios del Norte",
    departamento: "Legales",
    correo: "contacto@serviciosportuariosnorte.com",
    asignacion: "Ana Martínez",
    comentarios: [
      "20/02/2024 - Sistema: Solicitud creada",
      "20/02/2024 - Empresa: Consulta sobre procedimientos",
    ],
  },
  {
    id: 6,
    numero: "SOL-LEG-3006",
    tipo: "Reclamo",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por demora en procesamiento de inscripción",
    descripcion: "Reclamamos la demora excesiva en el procesamiento de nuestra solicitud de inscripción SOL-LEG-2998. La documentación fue entregada hace 45 días y aún no hemos recibido respuesta.",
    fecha: "21/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "21/02/2024",
    solicitante: "Insumos Portuarios SRL",
    departamento: "Legales",
    correo: "ventas@insumosportuarios.com",
    asignacion: "Roberto Silva",
    comentarios: [
      "21/02/2024 - Sistema: Solicitud creada",
      "21/02/2024 - Roberto Silva: Reclamo rechazado - documentación incompleta",
    ],
  },
  {
    id: 7,
    numero: "SOL-LEG-3007",
    tipo: "Tramite",
    tipoSolicitante: "Cliente",
    asunto: "Solicitud de trámite administrativo",
    descripcion: "Solicito información sobre el trámite administrativo para la renovación de permisos portuarios. Necesito conocer los pasos y documentación requerida.",
    fecha: "23/02/2024",
    estado: "Resuelta",
    ultimaActualizacion: "24/02/2024",
    solicitante: "Empresa Portuaria del Sur",
    departamento: "Legales",
    correo: "administracion@empresaportuariasur.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "23/02/2024 - Sistema: Solicitud creada",
      "23/02/2024 - Empresa: Solicitud de trámite administrativo",
      "24/02/2024 - Laura Pérez: Trámite resuelto",
    ],
  }
]

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function DetalleExternaPage({ params }: Props) {
  const { id } = await params
  const solicitudId = parseInt(id)
  
  // Buscar en ambos arrays
  const solicitudInscripcion = solicitudesInscripcion.find((s) => s.id === solicitudId)
  const solicitudSimple = solicitudesSimples.find((s) => s.id === solicitudId)
  
  const solicitud = solicitudInscripcion || solicitudSimple

  if (!solicitud) {
    notFound()
  }

  // Renderizar componente según el tipo de solicitud
  if (solicitudInscripcion) {
    return (
      <DetallesSolicitudInscripcion
        solicitud={solicitudInscripcion}
        urlRetorno="/empleado-legales/gestion/mi-buzon/solicitudes"
        usuarioActual="Laura Pérez - Legales"
        tituloModulo="Detalle de Solicitud Externa - Legales"
      />
    )
  } else {
    return (
      <DetallesSolicitudMiBuzon
        solicitud={solicitudSimple!}
        urlRetorno="/empleado-legales/gestion/mi-buzon/solicitudes"
        usuarioActual="Laura Pérez - Legales"
        tituloModulo="Detalle de Solicitud Externa - Legales"
      />
    )
  }
}
