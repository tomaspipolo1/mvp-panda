"use client"

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

// Declaración de tipos para Google Maps
/// <reference types="google.maps" />
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Upload, 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface GoogleMapsKMLProps {
  center?: { lat: number; lng: number }
  zoom?: number
  kmlUrl?: string
  className?: string
  height?: string
}

interface KMLLayer {
  layer: google.maps.KmlLayer
  name: string
  url: string
  visible: boolean
}

export default function GoogleMapsKML({ 
  center = { lat: -34.8738, lng: -57.8774 }, // Puerto La Plata coordinates
  zoom = 15,
  kmlUrl,
  className = "",
  height = "600px"
}: GoogleMapsKMLProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [kmlLayers, setKMLLayers] = useState<KMLLayer[]>([])
  const [selectedKMLFile, setSelectedKMLFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      try {
        // Temporalmente usar la API key directamente para diagnosticar
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyB-cNjtmi6BU_SipbO1YlosMVytvI_QDKI'
        console.log('API Key loaded:', apiKey ? 'Yes' : 'No')
        console.log('API Key from env:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
        
        if (!apiKey) {
          console.error('Todas las variables de entorno:', process.env)
          throw new Error('Google Maps API key no configurada. Agrega NEXT_PUBLIC_GOOGLE_MAPS_API_KEY a tu archivo .env.local')
        }

        console.log('Creating Loader...')
        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        })

        console.log('Loading Google Maps API...')
        const google = await loader.load()
        console.log('Google Maps API loaded successfully')
        
        if (!mapRef.current) {
          console.log('Map ref is null, returning')
          return
        }

        console.log('Creating map instance...')
        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: google.maps.MapTypeId.HYBRID,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER,
          },
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          streetViewControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        })

        console.log('Map instance created successfully')
        setMap(mapInstance)
        setIsLoading(false)
        console.log('Loading state set to false')

        // Load initial KML if provided
        if (kmlUrl) {
          console.log('Loading initial KML:', kmlUrl)
          loadKMLFromUrl(mapInstance, kmlUrl)
        }

      } catch (err) {
        console.error('Error loading Google Maps:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
        setIsLoading(false)
      }
    }

    initMap()
  }, [center.lat, center.lng, zoom, kmlUrl])

  // Load KML from URL
  const loadKMLFromUrl = (mapInstance: google.maps.Map, url: string) => {
    try {
      const kmlLayer = new google.maps.KmlLayer({
        url,
        suppressInfoWindows: false,
        map: mapInstance,
        preserveViewport: false
      })

      kmlLayer.addListener('status_changed', () => {
        const status = kmlLayer.getStatus()
        if (status !== google.maps.KmlLayerStatus.OK) {
          console.error('KML Layer error:', status)
          setError(`Error cargando KML: ${status}`)
        } else {
          console.log('KML Layer loaded successfully')
        }
      })

      const newLayer: KMLLayer = {
        layer: kmlLayer,
        name: `KML Layer ${kmlLayers.length + 1}`,
        url,
        visible: true
      }

      setKMLLayers(prev => [...prev, newLayer])
    } catch (err) {
      console.error('Error loading KML:', err)
      setError('Error cargando archivo KML')
    }
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.kml')) {
      setError('Por favor selecciona un archivo KML válido')
      return
    }

    setSelectedKMLFile(file)
    loadKMLFromFile(file)
  }

  // Load KML from file
  const loadKMLFromFile = (file: File) => {
    if (!map) {
      setError('Mapa no inicializado')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const kmlContent = e.target?.result as string
        
        // Create a blob URL for the KML content
        const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' })
        const blobUrl = URL.createObjectURL(blob)
        
        // For local files, we need to use a different approach
        // We'll parse the KML content and create markers manually
        parseKMLContent(kmlContent)
        
      } catch (err) {
        console.error('Error reading KML file:', err)
        setError('Error leyendo archivo KML')
      }
    }
    reader.readAsText(file)
  }

  // Parse KML content and create markers
  const parseKMLContent = (kmlContent: string) => {
    if (!map) return

    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(kmlContent, 'text/xml')
      
      // Extract placemarks
      const placemarks = xmlDoc.getElementsByTagName('Placemark')
      
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
              const marker = new google.maps.Marker({
                position: { lat, lng },
                map,
                title: name,
                icon: {
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#3B82F6"/>
                    </svg>
                  `),
                  scaledSize: new google.maps.Size(24, 24),
                  anchor: new google.maps.Point(12, 24)
                }
              })

              if (description) {
                const infoWindow = new google.maps.InfoWindow({
                  content: `
                    <div class="p-2">
                      <h3 class="font-bold text-lg mb-2">${name}</h3>
                      <p class="text-sm text-gray-600">${description}</p>
                    </div>
                  `
                })

                marker.addListener('click', () => {
                  infoWindow.open(map, marker)
                })
              }
            }
          }
        }
      })

      setError(null)
    } catch (err) {
      console.error('Error parsing KML:', err)
      setError('Error procesando contenido KML')
    }
  }

  // Toggle KML layer visibility
  const toggleKMLLayer = (index: number) => {
    setKMLLayers(prev => prev.map((layer, i) => {
      if (i === index) {
        const newVisible = !layer.visible
        layer.layer.setMap(newVisible ? map : null)
        return { ...layer, visible: newVisible }
      }
      return layer
    }))
  }

  // Remove KML layer
  const removeKMLLayer = (index: number) => {
    setKMLLayers(prev => {
      const layer = prev[index]
      if (layer) {
        layer.layer.setMap(null)
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  // Map controls
  const zoomIn = () => map?.setZoom((map.getZoom() || 10) + 1)
  const zoomOut = () => map?.setZoom((map.getZoom() || 10) - 1)
  const resetView = () => {
    map?.setCenter(center)
    map?.setZoom(zoom)
  }

  if (isLoading) {
    return (
      <Card className={`p-8 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-plp-primary"></div>
          <span className="ml-3 text-plp-gray-600">Cargando mapa...</span>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      </Card>
    )
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Map Controls */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-plp-primary">Mapa Interactivo</h3>
            <Badge variant="secondary" className="bg-plp-primary/10 text-plp-primary">
              Puerto La Plata
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".kml"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Cargar KML
            </Button>

            {/* Map Controls */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button variant="ghost" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={resetView}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* KML Layers */}
        {kmlLayers.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-plp-primary" />
              <span className="text-sm font-medium text-plp-primary">Capas KML</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {kmlLayers.map((layer, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <button
                    onClick={() => toggleKMLLayer(index)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      layer.visible 
                        ? 'bg-plp-primary border-plp-primary' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {layer.visible && <CheckCircle className="h-3 w-3 text-white" />}
                  </button>
                  <span className="text-sm text-plp-gray-700">{layer.name}</span>
                  <button
                    onClick={() => removeKMLLayer(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef} 
        style={{ height }} 
        className="w-full"
      />
      
      {/* Map Info */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-plp-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Puerto La Plata, Argentina</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{kmlLayers.length} capas cargadas</span>
            {selectedKMLFile && (
              <span className="text-plp-primary">
                📁 {selectedKMLFile.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
