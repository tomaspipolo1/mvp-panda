/**
 * Datos de noticias: usado en listado y en detalle por id.
 * Las rutas /comunicacion/noticias y /comunicacion/noticias/[id] consumen este array.
 */
export type CategoriaNoticia =
  | "Operaciones"
  | "Sustentabilidad"
  | "Relaciones"
  | "Capacitación"
  | "Infraestructura"
  | "Internacional"
  | "Seguridad"
  | "Tecnología"
  | "Comunidad"

export interface Noticia {
  id: string
  titulo: string
  /** Breve descripción para la card (2 líneas) */
  descripcion: string
  /** Contenido completo para la página de detalle */
  contenido: string
  categoria: CategoriaNoticia
  /** Fecha en formato ISO (YYYY-MM-DD) para ordenamiento y formato "d de MMMM yyyy" */
  fecha: string
  /** Ruta de imagen en /public */
  imagen: string
  /** Si es "instagram", la vista detalle usa layout celeste + gris con reel o galería */
  fuente?: "instagram"
  /** URL de embed del reel (ej. https://www.instagram.com/reel/XXX/embed). Si no hay, se muestra galeria. */
  reelUrl?: string
  /** Imágenes para carrusel cuando no hay reel (rutas en /public) */
  galeria?: string[]
}

export const CATEGORIAS_FILTRO: readonly string[] = [
  "Todas",
  "Operaciones",
  "Sustentabilidad",
  "Relaciones",
  "Capacitación",
  "Infraestructura",
  "Internacional",
  "Seguridad",
  "Tecnología",
  "Comunidad",
] as const

export const NOTICIAS: Noticia[] = [
  {
    id: "1",
    titulo: "Puerto La Plata alcanza récord histórico en movimiento de contenedores",
    descripcion:
      "Durante el último trimestre, el puerto registró un incremento del 45% en el movimiento de contenedores, superando las expectativas del sector.",
    contenido: `El Puerto La Plata cerró el trimestre con un récord histórico en movimiento de contenedores. La cifra alcanzada representa un incremento del 45% respecto al mismo período del año anterior, consolidando al puerto como un hub logístico clave en la región.

Las operaciones se vieron favorecidas por las mejoras en infraestructura y la optimización de los tiempos de carga y descarga. El Consorcio de Gestión del Puerto La Plata (CGPLP) destacó el compromiso de las terminales y de todo el sector portuario en alcanzar estos resultados.

Este crecimiento refleja la confianza de las navieras y exportadores en la capacidad operativa del puerto, así como el trabajo coordinado entre el sector público y privado. La inversión en tecnología y la profesionalización de los equipos han sido factores determinantes para superar las metas proyectadas.

Las autoridades portuarias anticipan que esta tendencia positiva se mantendrá durante el resto del año, gracias a los acuerdos comerciales vigentes y a la diversificación de cargas que transitan por nuestras instalaciones.`,
    categoria: "Operaciones",
    fecha: "2025-03-10",
    imagen: "/banner.jpg",
    fuente: "instagram",
    galeria: [
      "/banner.jpg",
      "/social/port-sunrise.png",
      "/social/DSC04672.JPG",
      "/social/Visita-Puerto-LP.jpeg",
      "/colorful-harbor-town.png",
      "/social/cruise-ship.png",
      "/museo.jpg",
      "/visita.jpg",
      "/puerto-plata-satellite.png",
      "/social/diverse-group-city.png",
      "/diverse-group-city.png",
    ],
  },
  {
    id: "2",
    titulo: "Nueva certificación ambiental para terminales portuarias",
    descripcion:
      "Las terminales del Puerto La Plata obtuvieron la certificación ISO 14001:2025, reafirmando su compromiso con la sostenibilidad.",
    contenido: `Las terminales del Puerto La Plata obtuvieron la certificación ISO 14001:2025, reafirmando su compromiso con la gestión ambiental y la sostenibilidad. El proceso de auditoría incluyó la revisión de procesos operativos, manejo de residuos y políticas de reducción de emisiones.

Esta certificación posiciona al puerto a la vanguardia en estándares ambientales dentro del sector portuario regional. El proceso de certificación demandó más de un año de trabajo conjunto entre las terminales, el CGPLP y los organismos certificadores internacionales.

Entre las acciones implementadas se destacan el tratamiento de efluentes, el reciclaje de materiales de operación, la forestación de áreas verdes y el monitoreo continuo de la calidad del aire y del agua. Estas prácticas forman parte de una estrategia de largo plazo que busca minimizar el impacto ambiental de la actividad portuaria.

El CGPLP reitera su compromiso de seguir avanzando en iniciativas que contribuyan a un puerto más sostenible y responsable con el medio ambiente.`,
    categoria: "Sustentabilidad",
    fecha: "2025-03-08",
    imagen: "/social/port-sunrise.png",
    galeria: [
      "/social/port-sunrise.png",
      "/banner.jpg",
      "/social/DSC04672.JPG",
      "/colorful-harbor-town.png",
      "/social/Visita-Puerto-LP.jpeg",
      "/museo.jpg",
      "/puerto-plata-satellite.png",
      "/social/INICIO_PANEL_TEC 1.jpg",
      "/visita.jpg",
      "/social/diverse-group-city.png",
    ],
  },
  {
    id: "3",
    titulo: "Visita de delegación internacional fortalece lazos comerciales",
    descripcion:
      "Representantes de puertos europeos visitaron nuestras instalaciones para explorar oportunidades de colaboración.",
    contenido: `Una delegación de representantes de puertos europeos visitó las instalaciones del Puerto La Plata con el objetivo de explorar oportunidades de colaboración y intercambio de mejores prácticas. La visita incluyó recorridos por las terminales de contenedores y graneles, así como reuniones con autoridades del CGPLP.

Ambas partes expresaron su interés en profundizar los lazos comerciales y logísticos en el corto plazo. La delegación estuvo integrada por directivos de puertos de España, Países Bajos y Alemania, quienes conocieron en detalle la operativa del puerto y las ventajas competitivas de nuestra ubicación estratégica.

Durante las jornadas de trabajo se abordaron temas como la digitalización de procesos, la sostenibilidad portuaria y las oportunidades de comercio bilateral. Se acordó establecer mesas de trabajo para avanzar en proyectos concretos de cooperación técnica y comercial.

Esta visita refuerza la proyección internacional del Puerto La Plata y abre nuevas puertas para el intercambio de conocimiento y el fortalecimiento de las relaciones con el sector portuario europeo.`,
    categoria: "Relaciones",
    fecha: "2025-03-05",
    imagen: "/colorful-harbor-town.png",
    galeria: [
      "/colorful-harbor-town.png",
      "/social/Visita-Puerto-LP.jpeg",
      "/social/diverse-group-city.png",
      "/banner.jpg",
      "/social/port-sunrise.png",
      "/social/DSC04672.JPG",
      "/social/cruise-ship.png",
      "/museo.jpg",
      "/visita.jpg",
      "/puerto-plata-satellite.png",
    ],
  },
  {
    id: "4",
    titulo: "Programa de capacitación 2025 para trabajadores portuarios",
    descripcion:
      "Se lanza nuevo programa de formación continua para personal operativo y administrativo del puerto.",
    contenido: `Se presentó el Programa de Capacitación 2025 dirigido a trabajadores portuarios, tanto del sector operativo como administrativo. El programa incluye cursos en seguridad laboral, operación de equipos, logística y gestión portuaria.

La formación continua es una prioridad del CGPLP para mantener estándares de calidad y seguridad en todas las operaciones. Este año se suman nuevas temáticas vinculadas a la digitalización, la eficiencia energética y el manejo de cargas especiales, respondiendo a las demandas actuales del sector.

Las capacitaciones serán dictadas en conjunto con instituciones educativas de la región y contarán con certificación oficial. Se prevé que más de 500 trabajadores participen de las distintas instancias formativas a lo largo del año.

El programa contempla modalidades presenciales y virtuales, permitiendo que el personal pueda acceder a la formación sin interrumpir sus tareas habituales. El CGPLP invita a todas las empresas que operan en el puerto a sumar a su personal a estas iniciativas.`,
    categoria: "Capacitación",
    fecha: "2025-03-01",
    imagen: "/social/DSC04672.JPG",
    galeria: [
      "/social/DSC04672.JPG",
      "/social/Visita-Puerto-LP.jpeg",
      "/visita.jpg",
      "/banner.jpg",
      "/social/port-sunrise.png",
      "/social/INICIO_PANEL_MUP 1.jpg",
      "/social/INICIO_PANEL_TEC 1.jpg",
      "/museo.jpg",
      "/colorful-harbor-town.png",
      "/social/diverse-group-city.png",
    ],
  },
  {
    id: "5",
    titulo: "Avances en obras de modernización de infraestructura",
    descripcion:
      "Las obras de ampliación del muelle principal avanzan según lo programado, con un 60% de progreso.",
    contenido: `Las obras de ampliación y modernización del muelle principal del Puerto La Plata avanzan según lo programado, con un 60% de progreso reportado. Las mejoras incluyen refuerzo de estructuras, nueva iluminación y optimización de áreas de operación.

Se prevé que la totalidad de las obras concluya en el segundo semestre del año, mejorando la capacidad operativa del puerto. Los trabajos comprenden la rehabilitación de más de 400 metros lineales de muelle, la instalación de nuevos sistemas de amarre y la ampliación de las zonas de maniobra para grúas y equipos de carga.

Además, se está implementando un sistema de iluminación LED de última generación que permitirá operaciones nocturnas más seguras y eficientes, reduciendo el consumo energético en un 40%. Las obras cuentan con financiamiento del gobierno provincial y aportes del sector privado.

Una vez finalizadas, el puerto incrementará significativamente su capacidad de atención de buques y reducirá los tiempos de estadía, beneficiando a exportadores, importadores y navieras que utilizan nuestras instalaciones.`,
    categoria: "Infraestructura",
    fecha: "2025-02-28",
    imagen: "/banner.jpg",
    galeria: [
      "/banner.jpg",
      "/social/INICIO_PANEL_TEC 1.jpg",
      "/social/INICIO_PANEL_MUP 1.jpg",
      "/social/DSC04672.JPG",
      "/social/port-sunrise.png",
      "/puerto-plata-satellite.png",
      "/colorful-harbor-town.png",
      "/visita.jpg",
      "/museo.jpg",
      "/social/Visita-Puerto-LP.jpeg",
    ],
  },
  {
    id: "6",
    titulo: "Puerto La Plata firma acuerdo de cooperación con Rotterdam",
    descripcion:
      "El convenio permitirá intercambiar mejores prácticas y tecnología con uno de los puertos más importantes del mundo.",
    contenido: `El Puerto La Plata firmó un acuerdo de cooperación con el puerto de Rotterdam, uno de los más importantes del mundo. El convenio contempla el intercambio de mejores prácticas, tecnología y experiencias en gestión logística y sostenibilidad.

Esta alianza refuerza la proyección internacional del Puerto La Plata y abre nuevas oportunidades de desarrollo. El puerto de Rotterdam, con más de 470 millones de toneladas movilizadas anuales, es un referente global en eficiencia operativa, digitalización y transición energética.

El acuerdo incluye la realización de misiones técnicas bilaterales, el intercambio de profesionales y la cooperación en proyectos de investigación aplicada. Ambas partes se comprometieron a trabajar en iniciativas conjuntas relacionadas con la descarbonización del transporte marítimo y la optimización de cadenas logísticas.

Esta alianza estratégica permitirá al Puerto La Plata incorporar conocimientos de vanguardia y fortalecer su posición como puerta de entrada al comercio internacional desde la región.`,
    categoria: "Internacional",
    fecha: "2025-02-25",
    imagen: "/social/port-sunrise.png",
    galeria: [
      "/social/port-sunrise.png",
      "/social/cruise-ship.png",
      "/banner.jpg",
      "/social/Visita-Puerto-LP.jpeg",
      "/colorful-harbor-town.png",
      "/social/diverse-group-city.png",
      "/social/DSC04672.JPG",
      "/museo.jpg",
      "/visita.jpg",
      "/puerto-plata-satellite.png",
    ],
  },
  {
    id: "7",
    titulo: "Nuevo sistema de gestión ambiental reduce emisiones en un 30%",
    descripcion:
      "La implementación de tecnologías verdes marca un hito en la sustentabilidad portuaria.",
    contenido: `La implementación del nuevo sistema de gestión ambiental en el Puerto La Plata ha permitido una reducción del 30% en emisiones respecto al año anterior. El proyecto incluye monitoreo en tiempo real, uso de energías renovables en instalaciones administrativas y programas de eficiencia energética.

Este avance consolida al puerto como referente en sustentabilidad dentro del sector. El sistema de monitoreo instalado permite medir en forma continua las emisiones de gases de efecto invernadero, la calidad del aire y los niveles de ruido en las zonas de operación, generando datos que facilitan la toma de decisiones y la mejora continua.

Las instalaciones administrativas del CGPLP ya funcionan parcialmente con energía solar gracias a la instalación de paneles fotovoltaicos, y se está evaluando extender esta tecnología a otras áreas del puerto. Además, se implementó un programa de recambio de maquinaria antigua por equipos de menor consumo y menores emisiones.

Estas iniciativas forman parte del compromiso del Puerto La Plata con los Objetivos de Desarrollo Sostenible y con la transición hacia una operación portuaria más limpia y responsable.`,
    categoria: "Sustentabilidad",
    fecha: "2025-02-20",
    imagen: "/colorful-harbor-town.png",
    galeria: [
      "/colorful-harbor-town.png",
      "/social/port-sunrise.png",
      "/puerto-plata-satellite.png",
      "/banner.jpg",
      "/social/DSC04672.JPG",
      "/social/Visita-Puerto-LP.jpeg",
      "/museo.jpg",
      "/visita.jpg",
      "/social/diverse-group-city.png",
      "/social/INICIO_PANEL_CP 3.jpg",
    ],
  },
  {
    id: "8",
    titulo: "Exitoso simulacro de emergencia en terminal de contenedores",
    descripcion:
      "El ejercicio demostró la efectividad de los protocolos de seguridad actualizados.",
    contenido: `Se realizó un simulacro de emergencia en la terminal de contenedores con participación de operadores, prefectura y bomberos. El ejercicio permitió validar los protocolos de seguridad actualizados y detectar puntos de mejora.

La seguridad operativa y la preparación ante emergencias son pilares de la gestión del Puerto La Plata. El simulacro simuló un escenario de incendio en zona de almacenamiento, poniendo a prueba los tiempos de respuesta, las vías de evacuación y la coordinación entre los distintos actores involucrados.

Participaron más de 150 personas, incluyendo personal de las terminales, Prefectura Naval Argentina, Bomberos de Ensenada y personal médico de emergencias. El ejercicio fue supervisado por autoridades del CGPLP y contó con la observación de representantes de organismos de control.

Como resultado del simulacro, se identificaron mejoras menores en la señalización de salidas de emergencia y en los puntos de reunión. Estas observaciones serán incorporadas en las próximas semanas para fortalecer aún más la capacidad de respuesta del puerto ante situaciones de contingencia.`,
    categoria: "Seguridad",
    fecha: "2025-02-15",
    imagen: "/banner.jpg",
    galeria: [
      "/banner.jpg",
      "/social/INICIO_PANEL_TEC 1.jpg",
      "/social/DSC04672.JPG",
      "/social/port-sunrise.png",
      "/colorful-harbor-town.png",
      "/visita.jpg",
      "/social/Visita-Puerto-LP.jpeg",
      "/museo.jpg",
      "/social/cruise-ship.png",
      "/puerto-plata-satellite.png",
    ],
  },
  {
    id: "9",
    titulo: "Puerto La Plata lidera innovación en logística portuaria",
    descripcion:
      "La implementación de inteligencia artificial optimiza tiempos de operación y reduce costos.",
    contenido: `El Puerto La Plata avanza en la implementación de soluciones basadas en inteligencia artificial para optimizar tiempos de operación y reducir costos logísticos. Los primeros módulos ya están en fase de pruebas en la terminal de contenedores.

Esta innovación posiciona al puerto a la vanguardia tecnológica del sector en la región. El sistema en desarrollo permite predecir tiempos de estadía de buques, optimizar la asignación de grúas y espacios de almacenamiento, y anticipar cuellos de botella en la cadena logística.

La plataforma utiliza algoritmos de machine learning que se nutren de datos históricos y en tiempo real de las operaciones, mejorando sus predicciones con el uso. Se estima que una vez implementado en su totalidad, permitirá reducir los tiempos de operación entre un 15% y un 20%.

El proyecto cuenta con el apoyo de universidades nacionales y empresas tecnológicas especializadas. El CGPLP considera que la digitalización y la innovación son claves para mantener la competitividad del puerto en un escenario global cada vez más exigente.`,
    categoria: "Tecnología",
    fecha: "2025-02-10",
    imagen: "/social/port-sunrise.png",
    galeria: [
      "/social/port-sunrise.png",
      "/puerto-plata-satellite.png",
      "/banner.jpg",
      "/social/INICIO_PANEL_TEC 1.jpg",
      "/social/DSC04672.JPG",
      "/colorful-harbor-town.png",
      "/social/diverse-group-city.png",
      "/social/Visita-Puerto-LP.jpeg",
      "/museo.jpg",
      "/visita.jpg",
    ],
  },
  {
    id: "10",
    titulo: "Comunidad portuaria celebra día del trabajador marítimo",
    descripcion:
      "Eventos y reconocimientos destacan la labor esencial de los trabajadores del sector.",
    contenido: `La comunidad portuaria del Puerto La Plata celebró el Día del Trabajador Marítimo con eventos y reconocimientos a la labor esencial del sector. Se realizaron actos en las terminales y se destacó el rol de los trabajadores en la cadena logística y en el desarrollo regional.

El CGPLP agradeció el compromiso de todo el personal y de las empresas que operan en el puerto. La jornada incluyó un acto central en el que se entregaron distinciones a trabajadores con más de 25 años de trayectoria en el sector, reconociendo su aporte al crecimiento del puerto y de la región.

Además, se realizaron charlas sobre seguridad laboral, salud ocupacional y derechos de los trabajadores marítimos, con la participación de sindicatos, empleadores y organismos públicos. Se destacó la importancia de mantener condiciones laborales dignas y entornos de trabajo seguros.

El puerto no sería posible sin el esfuerzo diario de estibadores, prácticos, operarios, administrativos y todos aquellos que hacen posible que las mercaderías lleguen a destino. Esta celebración refuerza el compromiso del CGPLP con su comunidad de trabajadores.`,
    categoria: "Comunidad",
    fecha: "2025-02-05",
    imagen: "/social/cruise-ship.png",
    fuente: "instagram",
    reelUrl: "https://www.instagram.com/reel/Cexample/embed/",
    galeria: [
      "/social/cruise-ship.png",
      "/social/Visita-Puerto-LP.jpeg",
      "/banner.jpg",
      "/social/DSC04672.JPG",
      "/social/port-sunrise.png",
      "/visita.jpg",
      "/museo.jpg",
      "/colorful-harbor-town.png",
      "/puerto-plata-satellite.png",
      "/social/diverse-group-city.png",
    ],
  },
]

/** Obtiene una noticia por id para la página de detalle. Devuelve undefined si no existe. */
export function getNoticiaById(id: string): Noticia | undefined {
  return NOTICIAS.find((n) => n.id === id)
}
