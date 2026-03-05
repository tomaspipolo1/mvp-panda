import { NewsTicker } from "./news-ticker"
import { Ship, Package, Weight } from "lucide-react"
import Image from "next/image"


export function VideoBanner() {
  return (
    <section className="w-full h-screen relative -mt-[var(--header-height,80px)] overflow-hidden">
      {/* Imagen hero a pantalla completa */}
      <Image
        src="/banner.jpg"
        alt="Puerto La Plata"
        fill
        priority
        className="object-cover"
        quality={90}
      />

      {/* Overlay con gradiente solo en la parte inferior para el texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        {/* Texto posicionado en la parte inferior */}
        <div className="absolute bottom-24 left-6 right-6 md:left-12 md:right-auto md:max-w-md">
          <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.6)' }}>
            Puerto La Plata
          </h1>
          <p className="text-white/90 text-sm md:text-base lg:text-lg mt-1" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6)' }}>
            Con la esencia bonaerense que nos caracteriza, seguimos creciendo con una visión de gran protagonismo en el
            futuro.
          </p>
        </div>
      </div>

      {/* Ticker de noticias en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <NewsTicker />
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-28 md:bottom-28 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>

      {/* Indicadores anclados en la parte inferior */}
      <div className="absolute bottom-48 md:bottom-20 left-6 right-6 md:left-auto md:right-12 z-10">
        <div className="flex items-center justify-center md:justify-end">
          {/* Indicador Buques */}
          <div className="px-3 md:px-6 py-2 md:py-4 text-center min-w-[80px] md:min-w-[120px]">
            <Ship className="h-4 w-4 md:h-5 md:w-5 text-white mx-auto mb-1 md:mb-2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))' }} />
            <div className="text-lg md:text-2xl font-bold text-white mb-0.5 md:mb-1" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}>245</div>
            <div className="text-[10px] md:text-xs uppercase text-white/90 tracking-wider" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}>BUQUES</div>
          </div>

          {/* Separador vertical */}
          <div className="h-12 md:h-16 w-px bg-blue-500/70"></div>

          {/* Indicador Contenedores */}
          <div className="px-3 md:px-6 py-2 md:py-4 text-center min-w-[80px] md:min-w-[120px]">
            <Package className="h-4 w-4 md:h-5 md:w-5 text-white mx-auto mb-1 md:mb-2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))' }} />
            <div className="text-lg md:text-2xl font-bold text-white mb-0.5 md:mb-1" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}>1,234</div>
            <div className="text-[10px] md:text-xs uppercase text-white/90 tracking-wider" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}>CONTENEDORES</div>
          </div>

          {/* Separador vertical */}
          <div className="h-12 md:h-16 w-px bg-blue-500/70"></div>

          {/* Indicador Toneladas */}
          <div className="px-3 md:px-6 py-2 md:py-4 text-center min-w-[80px] md:min-w-[120px]">
            <Weight className="h-4 w-4 md:h-5 md:w-5 text-white mx-auto mb-1 md:mb-2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))' }} />
            <div className="text-lg md:text-2xl font-bold text-white mb-0.5 md:mb-1" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}>5.6M</div>
            <div className="text-[10px] md:text-xs uppercase text-white/90 tracking-wider" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}>TONELADAS</div>
          </div>
        </div>
      </div>
    </section>
  )
}
