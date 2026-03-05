"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, ArrowRight, Search } from "lucide-react"

const enlacesDestacados = [
  { label: "Acceso al portal", href: "/login" },
  { label: "Ayudas a la navegación", href: "/servicios/ayudas-navegacion" },
  { label: "Terminal de contenedores TecPlata", href: "/servicios/terminales/contenedores" },
  { label: "Licitaciones publicadas", href: "/servicios/vision-comercial/licitaciones" },
  { label: "Tarifario", href: "/servicios/tarifario" },
  { label: "Mapa interactivo", href: "/servicios/mapa" },
  { label: "Museo", href: "/comunidad/museo" },
  { label: "Trabajar con nosotros", href: "/contacto/trabaja" },
  { label: "Contacto", href: "/contacto" },
]

// Todas las secciones del sitio para el buscador
const todasLasSecciones = [
  // Home
  { label: "Inicio", href: "/", keywords: ["inicio", "home", "principal"] },
  
  // Institucional
  { label: "Institucional", href: "/institucional", keywords: ["institucional"] },
  { label: "Nosotros", href: "/institucional/nosotros", keywords: ["nosotros", "quienes somos", "sobre nosotros", "acerca de"] },
  { label: "Historia", href: "/institucional/historia", keywords: ["historia", "pasado", "origen", "historico", "histórico"] },
  { label: "Autoridad Portuaria", href: "/institucional/autoridad-portuaria", keywords: ["autoridad", "autoridades", "directorio", "portuaria"] },
  { label: "Estructura", href: "/institucional/estructura", keywords: ["estructura", "organigrama", "organizacion", "organización"] },
  
  // Servicios
  { label: "Servicios", href: "/servicios", keywords: ["servicios", "servicio"] },
  { label: "Tarifario", href: "/servicios/tarifario", keywords: ["tarifario", "precios", "costos", "tarifas", "aranceles"] },
  { label: "Mapa Interactivo", href: "/servicios/mapa", keywords: ["mapa", "interactivo", "ubicacion", "ubicación", "localizacion", "localización"] },
  { label: "Oportunidades", href: "/servicios/oportunidades", keywords: ["oportunidades", "oportunidad", "negocios"] },
  { label: "Ventajas Competitivas", href: "/servicios/ventajas-competitivas", keywords: ["ventajas", "competitivas", "beneficios"] },
  { label: "Visión Comercial", href: "/servicios/vision-comercial", keywords: ["vision", "visión", "comercial", "estrategia"] },
  { label: "Transporte Terrestre", href: "/servicios/transporte-terrestre", keywords: ["transporte", "terrestre", "camion", "camión", "logistica", "logística"] },
  
  // Terminales
  { label: "Terminales", href: "/servicios/terminales", keywords: ["terminales", "terminal"] },
  { label: "Terminal de Contenedores", href: "/servicios/terminales/contenedores", keywords: ["contenedores", "contenedor", "tecplata"] },
  { label: "Terminal de Inflamables", href: "/servicios/terminales/inflamables", keywords: ["inflamables", "combustibles", "ypf"] },
  { label: "Terminal Multipropósito", href: "/servicios/terminales/multiproposito", keywords: ["multiproposito", "multipropósito", "carga general"] },
  { label: "Terminal Zona Franca", href: "/servicios/terminales/zona-franca", keywords: ["zona franca", "franca", "fiscal"] },
  
  // Conexiones Intermodales
  { label: "Conexiones Intermodales", href: "/servicios/conexiones-intermodales", keywords: ["conexiones", "intermodales", "intermodal"] },
  { label: "Servicios de Buques", href: "/servicios/conexiones-intermodales/servicios-buques", keywords: ["buques", "barcos", "navios", "navíos", "embarcaciones"] },
  
  // Operadores y Organismos
  { label: "Operadores y Organismos", href: "/servicios/operadores-organismos", keywords: ["operadores", "organismos", "entidades"] },
  { label: "Prácticos", href: "/servicios/operadores-organismos/practicos", keywords: ["practicos", "prácticos", "practicaje"] },
  { label: "Amarradores", href: "/servicios/operadores-organismos/amarradores", keywords: ["amarradores", "amarre", "amarras"] },
  { label: "Remolcadores", href: "/servicios/operadores-organismos/remolcadores", keywords: ["remolcadores", "remolcador", "remolque"] },
  { label: "Despachantes", href: "/servicios/operadores-organismos/despachantes", keywords: ["despachantes", "despachante", "aduana", "aduaneros"] },
  { label: "Agencias Marítimas", href: "/servicios/operadores-organismos/agencias-maritimas", keywords: ["agencias", "maritimas", "marítimas", "agencia maritima", "agencia marítima"] },
  { label: "Otros Servicios", href: "/servicios/operadores-organismos/otros-servicios", keywords: ["otros servicios", "servicios adicionales"] },
  
  // Licitaciones
  { label: "Licitaciones", href: "/licitaciones", keywords: ["licitaciones", "licitacion", "licitación", "concurso"] },
  { label: "Licitaciones Abiertas", href: "/licitaciones/abiertas", keywords: ["licitaciones abiertas", "abiertas", "vigentes", "activas"] },
  { label: "Licitaciones Cerradas", href: "/licitaciones/cerradas", keywords: ["licitaciones cerradas", "cerradas", "finalizadas", "historicas", "históricas"] },
  
  // Calidad
  { label: "Calidad", href: "/calidad", keywords: ["calidad", "gestion", "gestión"] },
  { label: "Sostenibilidad", href: "/calidad/sostenibilidad", keywords: ["sostenibilidad", "sustentabilidad", "ambiental", "medio ambiente", "ecologia", "ecología"] },
  { label: "Certificaciones", href: "/calidad/certificaciones", keywords: ["certificaciones", "certificacion", "certificación", "iso", "normas"] },
  
  // Innovación
  { label: "Innovación y Futuro", href: "/innovacion", keywords: ["innovacion", "innovación", "futuro", "desarrollo"] },
  { label: "Proyectos Estratégicos", href: "/innovacion/proyectos-estrategicos", keywords: ["proyectos", "estrategicos", "estratégicos", "planes", "expansion", "expansión"] },
  { label: "Digitalización Tecnológica", href: "/innovacion/digitalizacion-tecnologica", keywords: ["digitalizacion", "digitalización", "tecnologia", "tecnología", "digital", "iot", "inteligencia artificial"] },
  
  // Comunicación
  { label: "Comunicación", href: "/comunicacion", keywords: ["comunicacion", "comunicación", "prensa"] },
  { label: "Noticias", href: "/comunicacion/noticias", keywords: ["noticias", "novedades", "actualidad", "novedad", "noticia", "informacion", "información"] },
  { label: "Galería", href: "/comunicacion/galeria", keywords: ["galeria", "galería", "fotos", "fotografias", "fotografías", "imagenes", "imágenes", "album", "álbum"] },
  { label: "Descargas", href: "/comunicacion/descargas", keywords: ["descargas", "documentos", "archivos", "pdf", "descarga", "documento"] },
  
  // Comunidad
  { label: "Comunidad", href: "/comunidad", keywords: ["comunidad", "social", "participacion", "participación"] },
  { label: "Museo del Puerto", href: "/comunidad/museo", keywords: ["museo", "cultura", "historia", "cultural", "patrimonio"] },
  { label: "Visitas al Puerto", href: "/comunidad/visitas", keywords: ["visitas", "visitar", "tours", "tour", "recorrido", "visita guiada"] },
  { label: "Eventos", href: "/comunidad/eventos", keywords: ["eventos", "evento", "actividades", "actividad"] },
  { label: "Educación", href: "/comunidad/educacion", keywords: ["educacion", "educación", "escuelas", "estudiantes", "capacitacion", "capacitación"] },
  
  // Contacto
  { label: "Contacto", href: "/contacto", keywords: ["contacto", "contactar", "comunicarse", "consulta", "consultas"] },
  { label: "Trabaja con Nosotros", href: "/contacto/trabaja", keywords: ["trabajar", "trabajo", "empleo", "trabaja", "rrhh", "recursos humanos", "cv", "curriculum", "postulacion", "postulación", "vacante", "vacantes"] },
  { label: "Solicitar Visita", href: "/contacto/visita", keywords: ["solicitar visita", "pedir visita", "agendar visita", "reservar visita"] },
  
  // Login/Registro
  { label: "Iniciar Sesión", href: "/login", keywords: ["login", "ingresar", "iniciar sesion", "sesión", "entrar", "acceder", "acceso"] },
  { label: "Registro", href: "/registro", keywords: ["registro", "registrarse", "crear cuenta", "nueva cuenta", "alta"] },
  { label: "Recuperar Contraseña", href: "/recuperar-contrasena", keywords: ["recuperar", "contraseña", "password", "olvide", "olvidé", "resetear"] },
  
  // Estadísticas
  { label: "Estadísticas", href: "/estadisticas", keywords: ["estadisticas", "estadísticas", "datos", "numeros", "números", "metricas", "métricas", "indicadores"] },
]

export function EnlacesDestacados() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof todasLasSecciones>([])
  const router = useRouter()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    if (query.trim().length < 2) {
      setSearchResults([])
      return
    }

    const lowercaseQuery = query.toLowerCase().trim()
    const results = todasLasSecciones.filter((seccion) => {
      const labelMatch = seccion.label.toLowerCase().includes(lowercaseQuery)
      const keywordMatch = seccion.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowercaseQuery)
      )
      return labelMatch || keywordMatch
    })

    setSearchResults(results.slice(0, 5)) // Máximo 5 resultados
  }

  const handleNavigate = (href: string) => {
    router.push(href)
    setSearchQuery("")
    setSearchResults([])
    setIsExpanded(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleNavigate(searchResults[0].href)
    }
  }

  return (
    <div className="fixed right-0 top-[20%] z-[100] flex items-start">
      {/* Botón de toggle - siempre visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-[#1B1E4A] text-white p-3 hover:bg-[#272C5B] transition-colors w-10 h-auto min-h-[3rem] flex items-center justify-center rounded-bl-lg border-r border-blue-600/30 flex-shrink-0"
        style={{
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
        }}
        aria-label={isExpanded ? "Contraer enlaces destacados" : "Expandir enlaces destacados"}
      >
        {isExpanded ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Panel de enlaces - se expande al lado del botón */}
      <div
        className={`bg-[#1B1E4A] text-white rounded-bl-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "w-72 opacity-100" : "w-0 opacity-0"
        }`}
        style={{
          boxShadow: isExpanded ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)' : 'none'
        }}
      >
        <div className="p-5">
          <h3 className="text-lg font-bold mb-3 text-white pb-3 border-b border-blue-600/30">
            Enlaces destacados
          </h3>

          {/* Buscador */}
          <div className="mb-4 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar sección..."
                className="w-full pl-9 pr-3 py-2 bg-white/10 border border-blue-600/30 rounded-lg text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
              />
            </div>

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#272C5B] border border-blue-600/30 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {searchResults.map((resultado, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigate(resultado.href)}
                    className="w-full text-left px-3 py-2 text-sm text-blue-300 hover:bg-blue-600/20 transition-colors border-b border-blue-600/20 last:border-b-0 flex items-center justify-between group"
                  >
                    <span className="group-hover:text-blue-200">{resultado.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-white flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <ul className="space-y-2.5">
            {enlacesDestacados.map((enlace, index) => (
              <li key={index}>
                <Link
                  href={enlace.href}
                  className="flex items-center justify-between group text-sm py-1.5"
                  target={enlace.href.startsWith("http") ? "_blank" : undefined}
                  rel={enlace.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="flex-1 text-blue-300 underline group-hover:text-blue-200 transition-colors">
                    {enlace.label}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 ml-2 text-white flex-shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
