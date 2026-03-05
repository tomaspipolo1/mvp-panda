"use client"

import { useEffect, useRef, useState } from 'react'

/// <reference types="google.maps" />

declare global {
  interface Window {
    google: typeof google
    initWorkingMap: () => void
  }
}

export default function WorkingGoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Iniciando...')
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [kmlMethod, setKmlMethod] = useState<'layer' | 'direct'>('layer')
  const [kmlData, setKmlData] = useState<any[]>([])
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const mapCreatedRef = useRef(false)

  // Método 1: KML Layer de Google (requiere servidor público)
  const loadKMLLayer = (mapInstance: google.maps.Map) => {
    try {
      console.log('WorkingMap: Cargando KML con Google Layer...')
      const kmlLayer = new window.google.maps.KmlLayer({
        url: `${window.location.origin}/permUso.kml?t=${Date.now()}`, // Cache busting
        suppressInfoWindows: false,
        map: mapInstance,
        preserveViewport: false
      })

      kmlLayer.addListener('status_changed', () => {
        const status = kmlLayer.getStatus()
        console.log('WorkingMap: Estado KML Layer:', status)
        
        if (status === window.google.maps.KmlLayerStatus.OK) {
          console.log('WorkingMap: ✅ KML Layer cargado')
          setStatus('✅ Mapa + KML Layer funcionando')
        } else {
          console.log('WorkingMap: ⚠️ KML Layer status:', status)
          setStatus('⚠️ KML Layer: ' + status)
        }
      })
    } catch (error) {
      console.error('WorkingMap: Error cargando KML Layer:', error)
    }
  }

  // Método 2: Lectura directa del KML (más control, funciona local)
  const loadKMLDirect = async (mapInstance: google.maps.Map) => {
    try {
      console.log('WorkingMap: Cargando KML directamente...')
      setStatus('Cargando KML directamente...')
      
      const response = await fetch('/permUso.kml')
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const kmlText = await response.text()
      console.log('WorkingMap: KML descargado, tamaño:', kmlText.length)
      
      const kmlData = parseKML(kmlText)
      console.log('WorkingMap: KML parseado, puntos encontrados:', kmlData.length)
      
      const newMarkers = createMarkersFromKML(mapInstance, kmlData)
      setMarkers(newMarkers)
      setKmlData(kmlData)
      
      setStatus(`✅ Mapa + ${kmlData.length} puntos KML`)
      
    } catch (error) {
      console.error('WorkingMap: Error cargando KML directo:', error)
      setStatus('❌ Error cargando KML: ' + (error as Error).message)
    }
  }

  // Parsear KML manualmente
  const parseKML = (kmlContent: string) => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(kmlContent, 'text/xml')
    const placemarks = xmlDoc.getElementsByTagName('Placemark')
    const data: any[] = []

    Array.from(placemarks).forEach((placemark, index) => {
      const name = placemark.getElementsByTagName('name')[0]?.textContent || `Punto ${index + 1}`
      const description = placemark.getElementsByTagName('description')[0]?.textContent || ''
      const coordinates = placemark.getElementsByTagName('coordinates')[0]?.textContent

      if (coordinates) {
        const coords = coordinates.trim().split(',')
        if (coords.length >= 2) {
          const lng = parseFloat(coords[0])
          const lat = parseFloat(coords[1])

          if (!isNaN(lat) && !isNaN(lng)) {
            data.push({
              name,
              description,
              position: { lat, lng },
              coordinates: { lat, lng }
            })
          }
        }
      }
    })

    return data
  }

  // Crear marcadores a partir de datos KML
  const createMarkersFromKML = (mapInstance: google.maps.Map, kmlData: any[]) => {
    const newMarkers: google.maps.Marker[] = []

    kmlData.forEach((point, index) => {
      const marker = new window.google.maps.Marker({
        position: point.position,
        map: mapInstance,
        title: point.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#2563eb"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(24, 24),
          anchor: new window.google.maps.Point(12, 24)
        }
      })

      // Crear ventana de información si hay descripción
      if (point.description) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 300px; padding: 10px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${point.name}</h3>
              <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">${point.description}</div>
              <div style="margin-top: 8px; font-size: 12px; color: #9ca3af;">
                📍 ${point.position.lat.toFixed(6)}, ${point.position.lng.toFixed(6)}
              </div>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker)
        })
      }

      newMarkers.push(marker)
    })

    // Ajustar vista para mostrar todos los marcadores
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition()!)
      })
      mapInstance.fitBounds(bounds)
    }

    return newMarkers
  }

  useEffect(() => {
    // Si ya se creó el mapa, no hacer nada
    if (mapCreatedRef.current) return

    const createMap = () => {
      if (mapCreatedRef.current) return

      console.log('WorkingMap: Intentando crear mapa...')
      
      if (!mapRef.current) {
        console.log('WorkingMap: Ref no disponible')
        return false
      }

      if (!window.google || !window.google.maps) {
        console.log('WorkingMap: Google Maps no disponible')
        return false
      }

      try {
        console.log('WorkingMap: Creando mapa...')
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: -34.8738, lng: -57.8774 },
          zoom: 15,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP
        })
        
        console.log('WorkingMap: ✅ Mapa creado exitosamente')
        setStatus('✅ Mapa funcionando')
        setMap(mapInstance)
        mapCreatedRef.current = true

        // Cargar KML según el método seleccionado
        setTimeout(() => {
          if (kmlMethod === 'layer') {
            loadKMLLayer(mapInstance)
          } else {
            loadKMLDirect(mapInstance)
          }
        }, 1000)

        return true
      } catch (error) {
        console.error('WorkingMap: Error creando mapa:', error)
        setStatus('❌ Error: ' + (error as Error).message)
        return false
      }
    }


    // Callback global único
    window.initWorkingMap = () => {
      console.log('WorkingMap: ✅ Google Maps listo')
      setStatus('Google Maps cargado')
      
      // Pequeño delay para asegurar que todo esté listo
      setTimeout(() => {
        if (createMap()) {
          console.log('WorkingMap: Mapa creado en callback')
        }
      }, 100)
    }

    // Verificar si Google Maps ya está disponible
    if (window.google && window.google.maps) {
      console.log('WorkingMap: Google Maps ya disponible')
      setStatus('Usando Google Maps existente')
      createMap()
    } else {
      // Verificar si ya hay un script cargándose
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      
      if (existingScript) {
        console.log('WorkingMap: Script ya existe, esperando...')
        setStatus('Esperando Google Maps...')
        
        // Chequear cada 500ms por máximo 20 segundos
        let attempts = 0
        const maxAttempts = 40
        
        const checkInterval = setInterval(() => {
          attempts++
          if (window.google && window.google.maps) {
            clearInterval(checkInterval)
            createMap()
          } else if (attempts >= maxAttempts) {
            clearInterval(checkInterval)
            setStatus('⏰ Timeout - Google Maps no cargó')
          }
        }, 500)
      } else {
        console.log('WorkingMap: Creando script...')
        setStatus('Cargando Google Maps...')
        
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-cNjtmi6BU_SipbO1YlosMVytvI_QDKI&callback=initWorkingMap&libraries=&v=weekly`
        script.async = true
        script.defer = true
        
        script.onerror = () => {
          console.error('WorkingMap: Error cargando script')
          setStatus('❌ Error cargando Google Maps')
        }
        
        document.head.appendChild(script)
      }
    }

    return () => {
      // Cleanup si es necesario
    }
  }, [])

  // Cambiar método de carga KML
  const toggleKMLMethod = () => {
    if (!map) return
    
    // Limpiar marcadores existentes
    markers.forEach(marker => marker.setMap(null))
    setMarkers([])
    setKmlData([])
    
    const newMethod = kmlMethod === 'layer' ? 'direct' : 'layer'
    setKmlMethod(newMethod)
    
    // Recargar con nuevo método
    setTimeout(() => {
      if (newMethod === 'layer') {
        loadKMLLayer(map)
      } else {
        loadKMLDirect(map)
      }
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-green-800">Mapa de Google Maps con KML</h3>
          <p className="text-sm text-green-600">Estado: {status}</p>
        </div>
        <div className="flex items-center gap-3">
          {map && (
            <button
              onClick={toggleKMLMethod}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                kmlMethod === 'direct' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                  : 'bg-orange-100 text-orange-800 border border-orange-300'
              }`}
            >
              {kmlMethod === 'direct' ? '📋 Lectura Directa' : '🌐 Google Layer'}
            </button>
          )}
          {map && (
            <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              Puerto La Plata (-34.8738, -57.8774)
            </div>
          )}
        </div>
      </div>
      
      {/* Información de datos cargados */}
      {kmlData.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">
                📁 {kmlData.length} puntos cargados desde permUso.kml
              </p>
              <p className="text-xs text-blue-600">
                Método: {kmlMethod === 'direct' ? 'Lectura directa (sin API)' : 'Google KML Layer'}
              </p>
            </div>
            <button
              onClick={toggleKMLMethod}
              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
            >
              Cambiar método
            </button>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-[600px] border-2 border-green-300 rounded-lg bg-gray-50"
        style={{ minHeight: '600px' }}
      />
      
      {/* Lista de puntos cargados */}
      {kmlData.length > 0 && kmlMethod === 'direct' && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Puntos KML cargados ({kmlData.length})
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {kmlData.slice(0, 10).map((point, index) => (
              <div key={index} className="text-xs text-gray-600 flex justify-between">
                <span className="truncate">{point.name}</span>
                <span className="ml-2 text-gray-400">
                  {point.position.lat.toFixed(4)}, {point.position.lng.toFixed(4)}
                </span>
              </div>
            ))}
            {kmlData.length > 10 && (
              <div className="text-xs text-gray-500 italic">
                ... y {kmlData.length - 10} puntos más
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
