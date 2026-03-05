"use client"

import { useEffect, useRef, useState } from 'react'

/// <reference types="google.maps" />

export default function DirectGoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [kmlLayers, setKmlLayers] = useState<google.maps.KmlLayer[]>([])

  useEffect(() => {
    let isCancelled = false

    const loadGoogleMaps = () => {
      console.log('🚀 Iniciando carga de Google Maps...')
      
      // Si ya está cargado, crear mapa directamente
      if (window.google && window.google.maps) {
        console.log('✅ Google Maps ya disponible, creando mapa...')
        createMap()
        return
      }

      // Si ya hay un script cargándose, esperar
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        console.log('Script ya existe, esperando...')
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogle)
            createMap()
          }
        }, 100)
        
        setTimeout(() => {
          clearInterval(checkGoogle)
          if (!window.google) {
            setError('Error: Google Maps no se cargó')
            setIsLoading(false)
          }
        }, 8000)
        return
      }

      // Crear callback global
      (window as any).initDirectMap = () => {
        console.log('✅ Google Maps callback ejecutado')
        createMap()
      }

      console.log('📥 Creando script de Google Maps...')
      
      // Cargar script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-cNjtmi6BU_SipbO1YlosMVytvI_QDKI&callback=initDirectMap`
      script.async = true
      script.defer = true

      script.onload = () => {
        console.log('📦 Script cargado, esperando callback...')
      }

      script.onerror = (error) => {
        console.error('❌ Error cargando Google Maps:', error)
        if (!isCancelled) {
          setError('Error cargando Google Maps API')
          setIsLoading(false)
        }
      }

      console.log('📤 Añadiendo script al DOM...')
      document.head.appendChild(script)
    }

    const createMap = () => {
      console.log('🏗️ createMap llamado, estado:', { 
        isCancelled, 
        refExists: !!mapRef.current,
        googleExists: !!(window.google && window.google.maps)
      })
      
      if (isCancelled) {
        console.log('❌ Componente cancelado, no creando mapa')
        return
      }

      if (!mapRef.current) {
        console.log('⏳ Ref no disponible, reintentando en 100ms...')
        setTimeout(createMap, 100)
        return
      }

      if (!window.google || !window.google.maps) {
        console.log('⏳ Google Maps no disponible aún, reintentando...')
        setTimeout(createMap, 100)
        return
      }

      try {
        console.log('🗺️ Creando mapa directamente...')
        console.log('📍 Ref del elemento:', mapRef.current)
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: -34.8738, lng: -57.8774 },
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        })

        console.log('✅ Mapa creado exitosamente, instancia:', mapInstance)
        
        if (!isCancelled) {
          console.log('✅ Estableciendo estado del mapa')
          setMap(mapInstance)
          setIsLoading(false)
          
          // Cargar KML automáticamente
          console.log('📁 Iniciando carga de KML...')
          loadKML(mapInstance, '/permUso.kml')
        }

      } catch (error) {
        console.error('Error creando mapa:', error)
        if (!isCancelled) {
          setError('Error creando el mapa')
          setIsLoading(false)
        }
      }
    }

    loadGoogleMaps()

    // Timeout de seguridad más largo
    const timeout = setTimeout(() => {
      if (!isCancelled && isLoading) {
        console.log('⏰ Timeout alcanzado, estado actual:', { 
          isLoading, 
          mapExists: !!map, 
          googleMapsLoaded: !!(window.google && window.google.maps) 
        })
        setError('Timeout: Carga demasiado lenta - revisa la consola para más detalles')
        setIsLoading(false)
      }
    }, 20000) // Aumentado a 20 segundos

    return () => {
      isCancelled = true
      clearTimeout(timeout)
    }
  }, [])

  // Función para cargar KML
  const loadKML = (mapInstance: google.maps.Map, kmlUrl: string) => {
    try {
      console.log('🗂️ Cargando KML:', kmlUrl)
      
      const kmlLayer = new google.maps.KmlLayer({
        url: window.location.origin + kmlUrl,
        suppressInfoWindows: false,
        map: mapInstance,
        preserveViewport: false
      })

      kmlLayer.addListener('status_changed', () => {
        const status = kmlLayer.getStatus()
        console.log('Estado KML:', status)
        
        if (status === google.maps.KmlLayerStatus.OK) {
          console.log('✅ KML cargado exitosamente')
          setKmlLayers(prev => [...prev, kmlLayer])
        } else {
          console.error('❌ Error cargando KML:', status)
        }
      })

      kmlLayer.addListener('click', (event: any) => {
        console.log('Click en KML:', event)
      })

    } catch (error) {
      console.error('Error al cargar KML:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-blue-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-blue-600">Cargando mapa (método directo)...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg">
        <div className="text-center text-red-600">
          <p className="font-semibold">Error en mapa directo</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-green-800">Mapa Directo - Puerto La Plata</h2>
        <p className="text-sm text-green-600">Cargado sin @googlemaps/js-api-loader</p>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-96 border rounded-lg shadow-sm"
        style={{ 
          minHeight: '384px', 
          minWidth: '100%',
          position: 'relative'
        }}
      />
      {map && (
        <div className="mt-2 space-y-1">
          <p className="text-xs text-green-600">✅ Mapa directo funcionando</p>
          {kmlLayers.length > 0 && (
            <p className="text-xs text-blue-600">📁 {kmlLayers.length} capas KML cargadas</p>
          )}
        </div>
      )}
    </div>
  )
}
