import { Building, Calendar, FileText, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function UsuarioBasicoPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2 text-plp-darkest">Bienvenido, Usuario Básico</h1>
      <p className="text-plp-dark mb-6">Accede rápidamente a las funciones principales del portal.</p>

      {/* 3 cards principales - ancho completo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Tarjeta de Entidades */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-plp-darkest">Mis Entidades</h2>
            <Building className="h-8 w-8 text-plp-primary" />
          </div>
          <p className="text-sm text-gray-600 mb-4">Gestiona tus entidades registradas en el sistema.</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-plp-darkest">3</span>
            <Link
              href="/usuario-basico/gestion/mis-entidades"
              className="text-sm text-plp-primary hover:text-plp-dark transition-colors"
            >
              Ver detalles →
            </Link>
          </div>
        </div>

        {/* Tarjeta de Visitas */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-plp-darkest">Mis Visitas</h2>
            <Calendar className="h-8 w-8 text-plp-primary" />
          </div>
          <p className="text-sm text-gray-600 mb-4">Administra tus visitas programadas.</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-plp-darkest">5</span>
            <Link
              href="/usuario-basico/visitas/mis-visitas"
              className="text-sm text-plp-primary hover:text-plp-dark transition-colors"
            >
              Ver detalles →
            </Link>
          </div>
        </div>

        {/* Tarjeta de Perfil */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-plp-darkest">Mi Perfil</h2>
            <Users className="h-8 w-8 text-plp-primary" />
          </div>
          <p className="text-sm text-gray-600 mb-4">Actualiza tu información personal.</p>
          <div className="flex justify-between items-center">
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              Actualización pendiente
            </span>
            <Link
              href="/usuario-basico/perfil/datos-personales"
              className="text-sm text-plp-primary hover:text-plp-dark transition-colors"
            >
              Actualizar →
            </Link>
          </div>
        </div>
      </div>

      {/* 2 cards abajo: Actividad Reciente + Próximas visitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Actividad Reciente */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-plp-darkest">Actividad Reciente</h2>
          <div className="space-y-4">
            {actividadReciente.map((actividad, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className={`p-2 rounded-full mr-4 shrink-0 ${getColorByTipo(actividad.tipo)}`}>
                  {getIconByTipo(actividad.tipo)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-plp-darkest">{actividad.titulo}</h3>
                  <p className="text-sm text-gray-600">{actividad.descripcion}</p>
                  <span className="text-xs text-gray-500">{actividad.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Próximas visitas al Puerto La Plata */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-plp-darkest">Próximas visitas al Puerto La Plata</h2>
          </div>
          <div className="space-y-4">
            {proximasVisitas.map((visita, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="p-2 rounded-full mr-4 shrink-0 bg-blue-100 text-blue-600">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-plp-darkest">{visita.titulo}</h3>
                  <p className="text-sm text-gray-600">{visita.descripcion}</p>
                  <span className="text-xs text-gray-500">{visita.fecha}</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/usuario-basico/visitas/mis-visitas"
            className="mt-4 inline-block text-sm text-plp-primary hover:text-plp-dark transition-colors"
          >
            Ver todas las visitas →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Datos de ejemplo para la actividad reciente
const actividadReciente = [
  {
    tipo: "visita",
    titulo: "Visita programada",
    descripcion: "Se ha programado una nueva visita para el 15/05/2023",
    fecha: "Hace 2 horas",
  },
  {
    tipo: "entidad",
    titulo: "Actualización de entidad",
    descripcion: 'Se actualizaron los datos de la entidad "Empresa ABC"',
    fecha: "Hace 1 día",
  },
  {
    tipo: "perfil",
    titulo: "Recordatorio de actualización",
    descripcion: "Es recomendable actualizar tu información de perfil",
    fecha: "Hace 3 días",
  },
]

// Datos de ejemplo para próximas visitas al Puerto La Plata
const proximasVisitas = [
  {
    titulo: "Laboral - Mariano Murguiondo",
    descripcion: "Puerto La Plata - Oficinas administrativas",
    fecha: "28 Feb 2025 - 09:00",
  },
  {
    titulo: "Guiada",
    descripcion: "Con acceso a muelle - Museo",
    fecha: "5 Mar 2025 - 11:00",
  },
  {
    titulo: "Evento - Noche de tango",
    descripcion: "Puerto La Plata - Dock central",
    fecha: "12 Mar 2025 - 19:00",
  },
]

// Función para obtener el color de fondo según el tipo de actividad
function getColorByTipo(tipo: string) {
  switch (tipo) {
    case "visita":
      return "bg-blue-100 text-blue-600"
    case "entidad":
      return "bg-green-100 text-green-600"
    case "licitacion":
      return "bg-purple-100 text-purple-600"
    case "perfil":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

// Función para obtener el icono según el tipo de actividad
function getIconByTipo(tipo: string) {
  switch (tipo) {
    case "visita":
      return <Calendar className="h-4 w-4" />
    case "entidad":
      return <Building className="h-4 w-4" />
    case "licitacion":
      return <FileText className="h-4 w-4" />
    case "perfil":
      return <Users className="h-4 w-4" />
    default:
      return null
  }
}
