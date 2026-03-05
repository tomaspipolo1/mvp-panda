"use client"

import Timeline, { TimelinePeriod } from "@/components/timeline"

const timelineData: TimelinePeriod[] = [
  {
    period: "1731-1879",
    title: "Antecesor y primeras poblaciones",
    image: "/puerto-plata-satellite.png",
    imageAlt: "Puerto La Plata en sus orígenes",
    intro:
      "Surge el Puerto de la Ensenada ante la necesidad que tuvo la Corona Española de fortificar las costas del Río de la Plata en el siglo XVII, como parte de un sistema de transporte con un valor estratégico militar de incalculable importancia geopolítica.",
    items: [
      {
        year: "1731",
        text:
          "Inicio del trazado defensivo de la Ensenada como punto estratégico del Río de la Plata.",
      },
      { year: "", text: "Aparecen los saladeros." },
      { year: "1801", text: "Ensenada es el primer asentamiento urbano de la región." },
      { year: "1871", text: "Tolosa es el segundo asentamiento urbano de la región." },
      { year: "1879", text: "Don Juan Berisso instaló dos saladeros, dando origen a la futura localidad homónima." },
    ],
  },
  {
    period: "1882-1890",
    title: "La Fundación",
    images: ["/banner.jpg", "/colorful-harbor-town.png"],
    imageAlt: "Construcción del Puerto La Plata",
    items: [
      {
        year: "1882",
        text:
          "La fundación de La Plata -ciudad Capital de la provincia de Buenos Aires- tuvo en cuenta la ubicación del territorio sobre un Puerto de aguas profundas hasta el cual pudieran llegar las embarcaciones de mayor calado, para asegurar la actividad comercial del primer estado argentina.",
      },
      {
        year: "1883",
        text:
          "Comienzan las obras de construcción del Puerto, dispuestas por decreto del presidente Julio A. Roca en 1882. Las mismas estuvieron a cargo de la empresa Lavalle, Medici y Cía. y dirigidas por el ingeniero holandés J. A. Waldorp, con un costo de 18 millones de pesos oro y 4.500 obreros.",
      },
      {
        year: "1890",
        text:
          "El 30 de marzo se realizó la inauguración del Puerto La Plata, aunque el primer buque de gran calado - Cordoan, proveniente de Marsella- ingresó en octubre de 1888, cuando los trabajos de construcción todavía estaban en curso.",
      },
    ],
  },
  {
    period: "1904-1925",
    title: "Movimiento portuario",
    image: "/colorful-harbor-town.png",
    imageAlt: "Frigoríficos históricos",
    intro: "En esta etapa, caracterizada por el movimiento de productos agrícola ganaderos para exportación, el Puerto comenzó a tener mayor movimiento gracias a la instalación de nuevos frigoríficos Armour (1904) y Swift (1915) en la localidad de Berisso. Otro hecho significativo fue la construcción del Ferrocarril Provincial, conectado directamente al Puerto La Plata, y la construcción de un elevador de granos.",
    items: [
      { year: "1904", text: "El Puerto fue traspasado al Gobierno Nacional" },
      { year: "1920", text: "Se derivaron los talleres navales y depósitos explosivos desde el Puerto de Buenos Aires." },
      { year: "1925", text: "Se inauguró la Destilería de YPF S.E. que dio al Puerto una fisonomía de puerto petrolero." },
      { year: "Segunda Guerra Mundial", text: "Se incrementó el movimiento de carnes, pero al final de la misma decreció ostensiblemente, transformándose en Puerto de cabotaje." },
    ],
  },
  {
    period: "1936-1960",
    title: "Complejo Industrial",
    image: "/banner.jpg",
    imageAlt: "Complejo industrial portuario",
    items: [
      { year: "1936", text: "Instalación del Astillero Río Santiago." },
      { year: "1940", text: "Cooperativa Argentina Textil en funcionamiento." },
      { year: "1952", text: "Fábrica Militar de Ácido Sulfúrico y consolidación del complejo industrial." },
    ],
  },
  {
    period: "1960-1999",
    title: "Especialización",
    images: ["/social/port-sunrise.png", "/banner.jpg"],
    imageAlt: "Puerto moderno",
    intro: "Aunque en esta época se produce la paralización de la actividad frigorífica, el surgimiento de varias empresas dio forma a la actual configuración del complejo portuario industrial.",
    items: [
      { year: "1962", text: "Petroquímica Ipako." },
      { year: "1969", text: "Propulsora." },
      { year: "1969", text: "Siderúrgica." },
      { year: "1974", text: "Petroquímica Gral. Mosconi." },
      { year: "1978", text: "Copetro S.A." },
      { year: "1989", text: "Polo Tecnológico e Informático de Berisso." },
      { year: "1991", text: "Surge Zona Franca La Plata." },
      { year: "1991", text: "Transferencia del Puerto a la provincia de Buenos Aires." },
    ],
  },
  {
    period: "1999-Actualidad",
    title: "Primer puerto Argentino en el Rio de La Plata",
    image: "/banner.jpg",
    imageAlt: "Puerto La Plata actual",
    intro: "El Puerto ha fijado importantes objetivos para desarrollar su potencialidad, con el esfuerzo de toda la comunidad que lo rodea, permitirán el crecimiento de La Plata, Berisso y Ensenada.",
    items: [
      { year: "1999", text: "El 29 de septiembre se crea el Consorcio de Gestión del Puerto La Plata, iniciando una etapa caracterizada por una visión moderna, orientada al futuro." },
      { year: "2000s", text: "Transición hacia la contenedorización y modernización de operaciones." },
      { year: "2010s", text: "Inversiones en infraestructura y mejoras de conectividad regional." },
      { year: "2014", text: "Con la inauguración de la terminal TecPlata, el Puerto La Plata amplió su mercado a la carga contenerizada." },
      { year: "Actualidad", text: "Plan Director para impulsar nuevas inversiones y competitividad." },
    ],
  }
]

export default function Historia() {
  return (
    <div className="min-h-screen bg-white">
      {/* Título e introducción (fondo blanco) */}
      <div className="w-full bg-white pt-8 pb-6 md:pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Historia del puerto
            </h1>
            <p className="text-lg text-plp-gray-600 leading-relaxed">
              Desde sus orígenes como puerto estratégico de la Corona Española hasta su actual rol como moderno
              puerto industrial, el Puerto La Plata ha sido testigo y protagonista de la historia argentina.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline reutilizable */}
      <Timeline data={timelineData} backgroundColor="#CAE6FF" />
    </div>
  )
}
