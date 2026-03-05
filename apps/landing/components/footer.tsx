import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Barra azul superior */}
      <div className="h-1" style={{ backgroundColor: '#79B5E3' }}></div>
      
      <div className="container mx-auto px-4 py-12">
        {/* PRIMERA FILA: Logos y Columnas de Accesos Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-6">
          {/* Logos PLP y Provincia + Eslogan - Ocupa 2 columnas */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-plp-white.png"
                alt="PLP Puerto La Plata"
                width={120}
                height={60}
                className="object-contain"
              />
              <Image
                src="/logo-provincia.png"
                alt="Gobierno de la Provincia de Buenos Aires"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
            
            {/* Eslogan */}
            <p className="text-sm text-white/80 leading-relaxed">
              Puerto La Plata es una puerta estratégica al comercio internacional, ofreciendo servicios portuarios de excelencia, infraestructura moderna y una ubicación privilegiada que conecta la región con los principales mercados del mundo. Comprometidos con la innovación, la sostenibilidad y el desarrollo económico de la provincia de Buenos Aires.
            </p>
          </div>

          {/* Columna: Institucional */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/institucional/nosotros" className="text-sm text-white/80 hover:text-white transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/institucional/autoridad-portuaria" className="text-sm text-white/80 hover:text-white transition-colors">
                  Autoridad portuaria
                </Link>
              </li>
              <li>
                <Link href="/institucional/estructura" className="text-sm text-white/80 hover:text-white transition-colors">
                  Estructura
                </Link>
              </li>
              <li>
                <Link href="/institucional/historia" className="text-sm text-white/80 hover:text-white transition-colors">
                  Historia del puerto
                </Link>
              </li>
              <li>
                <Link href="/contacto/trabaja" className="text-sm text-white/80 hover:text-white transition-colors">
                  Trabajar con Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna: Servicios */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios/mapa" className="text-sm text-white/80 hover:text-white transition-colors">
                  Mapa interactivo
                </Link>
              </li>
              <li>
                <Link href="/servicios/terminales/contenedores" className="text-sm text-white/80 hover:text-white transition-colors">
                  Terminales
                </Link>
              </li>
              <li>
                <Link href="/servicios/operadores-organismos" className="text-sm text-white/80 hover:text-white transition-colors">
                  Operadores y organismos
                </Link>
              </li>
              <li>
                <Link href="/servicios/vision-comercial/licitaciones" className="text-sm text-white/80 hover:text-white transition-colors">
                  Licitaciones publicadas
                </Link>
              </li>
              <li>
                <Link href="/servicios/transporte-terrestre" className="text-sm text-white/80 hover:text-white transition-colors">
                  Transporte terrestre
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna: Recursos */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/comunicacion/descargas" className="text-sm text-white/80 hover:text-white transition-colors">
                  Documentación
                </Link>
              </li>
              <li>
                <Link href="/servicios/tarifario" className="text-sm text-white/80 hover:text-white transition-colors">
                  Tarifario
                </Link>
              </li>
              <li>
                <Link href="/calidad/normas-politicas" className="text-sm text-white/80 hover:text-white transition-colors">
                  Normativas
                </Link>
              </li>
              <li>
                <Link href="/comunicacion/galeria" className="text-sm text-white/80 hover:text-white transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-white/80 hover:text-white transition-colors">
                  Reclamos o sugerencias
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SEGUNDA FILA: Información de Contacto, ISO y Mapa */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Información de contacto y botón - Ocupa 2 columnas */}
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#79B5E3', strokeWidth: 2 }} />
                <p className="text-sm text-white">Ortíz de Rosas 151, Ensenada, Buenos Aires, Argentina</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" style={{ color: '#79B5E3', strokeWidth: 2 }} />
                <p className="text-sm text-white">+54 221 429-0000</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" style={{ color: '#79B5E3', strokeWidth: 2 }} />
                <p className="text-sm text-white">info@puertolaplata.com.ar</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link href="/contacto">
                <Button className="text-white rounded-lg px-6 py-2" style={{ backgroundColor: '#1B1E4A' }}>
                  Contactanos
                </Button>
              </Link>
            </div>
          </div>

          {/* Certificación ISO */}
          <div className="space-y-2">
            <div className="mb-3">
              <Image
                src="/iso.png"
                alt="ISO 9001:2015"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="text-xs text-white/80">Certificado ISO 9001</div>
          </div>

          {/* Mapa - Ocupa 2 columnas */}
          <div className="md:col-span-2">
            <div className="relative h-32 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13094.340195020419!2d-57.9004884552002!3d-34.866652399494775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e43bde68f75f%3A0xbff9bdaa30a33c7!2sPuerto%20La%20Plata!5e0!3m2!1ses!2sus!4v1770138902554!5m2!1ses!2sus" 
              width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Puerto La Plata"
                className="w-full h-full">
              </iframe>
              
              
              {/* Botón Compartir */}
              <div className="absolute bottom-3 right-3">
                <a
                  href="https://maps.app.goo.gl/S2AfRRQgbFHzMaor7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="sm"
                    className="text-white rounded-lg px-4 py-2 flex items-center gap-2"
                    style={{ backgroundColor: '#1B1E4A' }}
                  >
                    <Share2 className="h-4 w-4" />
                    Compartir
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior: Copyright y Redes Sociales */}
        <div className="border-t border-white/20 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/80">
              © 2025 Puerto La Plata. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/search/top?q=puerto%20la%20plata"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/PuertoLaPlata"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/puertolaplata/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
