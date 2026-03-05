"use client"

import { useEffect, useRef, useState } from 'react'

export default function UltraSimpleMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Iniciando...')
  const [mapCreated, setMapCreated] = useState(false)

  useEffect(() => {
    let isCancelled = false

    const createMap = () => {
      if (isCancelled || mapCreated) return

      console.log('Ultra Simple Map: Intentando crear mapa...')
      
      if (!mapRef.current) {
        console.log('Ultra Simple Map: Ref no disponible')
        setStatus('Error: Elemento no disponible')
        return
      }

      if (!(window as any).google || !(window as any).google.maps) {
        console.log('Ultra Simple Map: Google Maps no disponible')
        setStatus('Esperando Google Maps...')
        return
      }

      try {
        console.log('Ultra Simple Map: Creando mapa...')
        new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: -34.8738, lng: -57.8774 },
          zoom: 15
        })
        
        if (!isCancelled) {
          console.log('Ultra Simple Map: ✅ Mapa creado exitosamente')
          setStatus('✅ Mapa creado')
          setMapCreated(true)
        }
      } catch (error) {
        console.error('Ultra Simple Map: Error creando mapa:', error)
        setStatus('❌ Error creando mapa')
      }
    }

    // Función global para el callback
    (window as any).initUltraMap = () => {
      console.log('Ultra Simple Map: ✅ Callback ejecutado')
      setTimeout(createMap, 100) // Pequeño delay para asegurar que el DOM esté listo
    }

    // Solo agregar script si no existe
    if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
      console.log('Ultra Simple Map: Agregando script...')
      setStatus('Cargando script...')
      
      const script = document.createElement('script')
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-cNjtmi6BU_SipbO1YlosMVytvI_QDKI&callback=initUltraMap'
      script.onerror = () => {
        if (!isCancelled) {
          console.error('Ultra Simple Map: Error cargando script')
          setStatus('❌ Error cargando script')
        }
      }
      document.head.appendChild(script)
    } else if ((window as any).google && (window as any).google.maps) {
      // Si ya está cargado, crear mapa directamente
      console.log('Ultra Simple Map: Google Maps ya disponible')
      setStatus('Google Maps disponible')
      createMap()
    } else {
      // Script existe pero Google Maps no está listo
      console.log('Ultra Simple Map: Esperando que Google Maps esté listo...')
      setStatus('Esperando Google Maps...')
      
      const checkGoogle = setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
          clearInterval(checkGoogle)
          createMap()
        }
      }, 100)

      // Limpiar interval después de 10 segundos
      setTimeout(() => {
        clearInterval(checkGoogle)
        if (!mapCreated && !isCancelled) {
          setStatus('⏰ Timeout esperando Google Maps')
        }
      }, 10000)
    }

    return () => {
      isCancelled = true
    }
  }, [mapCreated])

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-purple-800">Mapa Ultra Simple</h3>
        <p className="text-sm text-purple-600">Estado: {status}</p>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-96 border-2 border-purple-300 rounded-lg"
        style={{ minHeight: '384px' }}
      />
    </div>
  )
}
