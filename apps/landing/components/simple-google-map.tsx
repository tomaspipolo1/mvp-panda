"use client"

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

/// <reference types="google.maps" />

export default function SimpleGoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    let isCancelled = false

    const initMap = async () => {
      // Asegurar que el componente está montado y el ref está disponible
      if (!mapRef.current) {
        console.log('Ref no disponible al inicio, postponiendo...')
        setTimeout(initMap, 100)
        return
      }
      try {
        console.log('Iniciando mapa simple...')
        
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyB-cNjtmi6BU_SipbO1YlosMVytvI_QDKI'
        console.log('Usando API Key:', apiKey ? 'Configurada' : 'No encontrada')

        if (!apiKey) {
          throw new Error('API Key no configurada')
        }

        // Verificar si ya existe un loader global
        if (window.google && window.google.maps) {
          console.log('Google Maps ya está cargado, usando instancia existente')
          
          if (!mapRef.current || isCancelled) return

          const mapInstance = new window.google.maps.Map(mapRef.current, {
            center: { lat: -34.8738, lng: -57.8774 },
            zoom: 15,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
          })
          
          if (!isCancelled) {
            setMap(mapInstance)
            setIsLoading(false)
            console.log('Mapa creado exitosamente!')
          }
          return
        }

        console.log('Cargando Google Maps por primera vez...')
        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: []
        })

        const google = await loader.load()
        console.log('Google Maps cargado exitosamente')

        if (isCancelled) {
          console.log('Componente desmontado')
          return
        }

        if (!mapRef.current) {
          console.log('Ref es null, esperando un momento...')
          // Esperar un poco para que el DOM se renderice
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (!mapRef.current) {
            console.log('Ref sigue siendo null después de esperar')
            throw new Error('No se pudo obtener la referencia del elemento del mapa')
          }
        }

        console.log('Creando instancia del mapa...')
        console.log('Elemento del mapa:', mapRef.current)
        console.log('Dimensiones del elemento:', {
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight,
          clientWidth: mapRef.current.clientWidth,
          clientHeight: mapRef.current.clientHeight
        })

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: -34.8738, lng: -57.8774 },
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: true
        })

        console.log('Mapa creado, instancia:', mapInstance)
        
        if (!isCancelled) {
          setMap(mapInstance)
          setIsLoading(false)
          console.log('Mapa creado exitosamente!')
        }

      } catch (error) {
        console.error('Error completo:', error)
        if (!isCancelled) {
          setError(error instanceof Error ? error.message : 'Error desconocido')
          setIsLoading(false)
        }
      }
    }

    // Timeout de seguridad
    const timeoutId = setTimeout(() => {
      if (!isCancelled && isLoading) {
        console.log('Timeout alcanzado, estableciendo error')
        setError('Timeout: El mapa tardó demasiado en cargar')
        setIsLoading(false)
      }
    }, 10000) // 10 segundos

    initMap()

    return () => {
      isCancelled = true
      clearTimeout(timeoutId)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg">
        <div className="text-center text-red-600">
          <p className="font-semibold">Error al cargar el mapa</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Mapa del Puerto La Plata</h2>
        <p className="text-sm text-gray-600">Ubicación: -34.8738, -57.8774</p>
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
        <p className="text-xs text-green-600 mt-2">✅ Mapa cargado correctamente</p>
      )}
    </div>
  )
}
