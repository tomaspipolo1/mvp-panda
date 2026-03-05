"use client"

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Phone, Globe, MapPin, ExternalLink } from "lucide-react"

/// <reference types="google.maps" />

declare global {
  interface Window {
    google: typeof google
    initHomeMap: () => void
  }
}

interface PlaceDetails {
  name: string
  formatted_address: string
  formatted_phone_number?: string
  website?: string
  place_id: string
}

interface MapSectionProps {
  /** Título de la sección (por defecto "Mapa interactivo") */
  title?: string
  /** Descripción opcional debajo del título */
  description?: string
  /** ID para anclas (ej. scroll desde hero "Ver mapa de rutas") */
  id?: string
}

export function MapSection({ title = "Mapa interactivo", description, id }: MapSectionProps = {}) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapCreatedRef = useRef(false)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null)

  useEffect(() => {
    // Si ya se creó el mapa, no hacer nada
    if (mapCreatedRef.current) return

    const createMap = () => {
      if (mapCreatedRef.current) return

      if (!mapRef.current) {
        return false
      }

      if (!window.google || !window.google.maps) {
        return false
      }

      try {
        // Coordenadas de Puerto La Plata - Ortiz de Rosas esquina Gilgerto Gaggino, Ensenada
        const puertoLaPlataPosition = { lat: -34.8738, lng: -57.8774 }
        
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: puertoLaPlataPosition, // Centrado en Puerto La Plata
          zoom: 14, // Zoom más bajo para mostrar más área (Ensenada, Berisso, etc.)
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          // Desactivar controles de capas por defecto
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true, // Activar fullscreen como en la imagen
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER,
          },
          // Desactivar POI (Points of Interest) y otras capas
          styles: [
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          // Desactivar tráfico por defecto
          disableDefaultUI: false,
        })

        const addDefaultMarkerAndDetails = () => {
          const marker = new window.google.maps.Marker({
            position: puertoLaPlataPosition,
            map: mapInstance,
            title: 'Puerto La Plata'
          })
          markerRef.current = marker
          setPlaceDetails({
            name: 'Puerto La Plata',
            formatted_address: 'Ortiz de Rosas 151 185, B1925 Ensenada, Provincia de Buenos Aires',
            place_id: ''
          })
          marker.addListener('click', () => setSidebarOpen(true))
        }

        // Usar Places API solo si la librería está cargada
        if (window.google.maps.places && window.google.maps.places.PlacesService) {
          const placesService = new window.google.maps.places.PlacesService(mapInstance)
          const request = {
            query: 'Puerto La Plata, Ortiz de Rosas 151 185, B1925 Ensenada, Provincia de Buenos Aires',
            fields: ['name', 'geometry', 'formatted_address', 'place_id']
          }

          placesService.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
              const place = results[0]
              if (place.geometry && place.geometry.location) {
                mapInstance.setCenter(place.geometry.location)
                const marker = new window.google.maps.Marker({
                  position: place.geometry.location,
                  map: mapInstance,
                  title: place.name || 'Puerto La Plata'
                })
                const detailsRequest = {
                  placeId: place.place_id,
                  fields: ['name', 'formatted_address', 'formatted_phone_number', 'website']
                }
                placesService.getDetails(detailsRequest, (placeDetails, detailsStatus) => {
                  if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                    setPlaceDetails({
                      name: placeDetails.name || 'Puerto La Plata',
                      formatted_address: placeDetails.formatted_address || 'Ortiz de Rosas 151 185, B1925 Ensenada, Provincia de Buenos Aires',
                      formatted_phone_number: placeDetails.formatted_phone_number,
                      website: placeDetails.website,
                      place_id: place.place_id
                    })
                  } else {
                    setPlaceDetails({
                      name: place.name || 'Puerto La Plata',
                      formatted_address: place.formatted_address || 'Ortiz de Rosas 151 185, B1925 Ensenada, Provincia de Buenos Aires',
                      place_id: place.place_id
                    })
                  }
                })
                marker.addListener('click', () => setSidebarOpen(true))
                markerRef.current = marker
              } else {
                addDefaultMarkerAndDetails()
              }
            } else {
              addDefaultMarkerAndDetails()
            }
          })
        } else {
          addDefaultMarkerAndDetails()
        }

        mapCreatedRef.current = true
        return true
      } catch (error) {
        console.error('Error creando mapa:', error)
        return false
      }
    }

    // Callback global único
    window.initHomeMap = () => {
      setTimeout(() => {
        if (createMap()) {
          console.log('HomeMap: Mapa creado en callback')
        }
      }, 100)
    }

    // Verificar si Google Maps ya está disponible
    if (window.google && window.google.maps) {
      createMap()
    } else {
      // Verificar si ya hay un script cargándose
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      
      if (existingScript) {
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
          }
        }, 500)
      } else {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-cNjtmi6BU_SipbO1YlosMVytvI_QDKI&callback=initHomeMap&libraries=places&v=weekly`
        script.async = true
        script.defer = true
        
        script.onerror = () => {
          console.error('Error cargando Google Maps')
        }
        
        document.head.appendChild(script)
      }
    }

    return () => {
      // Cleanup si es necesario
    }
  }, [])

  return (
    <section id={id} className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-medium text-center mb-8" style={{ color: '#1B1E4A' }}>
          {title}
        </h2>
        {description && (
          <p className="text-center text-plp-gray-700 mb-6 max-w-2xl mx-auto">{description}</p>
        )}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
          <div className="relative w-full h-[500px]" style={{ minHeight: '500px' }}>
            {/* Mapa */}
            <div 
              ref={mapRef} 
              className="w-full h-full"
            />
            
            {/* Sidebar dentro del mapa */}
            {sidebarOpen && placeDetails && (
              <div className="absolute left-0 top-0 h-full w-full md:w-[380px] bg-white shadow-2xl z-10 overflow-y-auto transform transition-transform duration-300">
                {/* Header con fondo celeste */}
                <div className="p-4 pb-3" style={{ backgroundColor: '#CAE6FF' }}>
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold pr-4" style={{ color: '#1B1E4A' }}>
                      {placeDetails.name}
                    </h3>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
                      aria-label="Cerrar"
                      style={{ color: '#1B1E4A' }}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4 pt-3">
                  {/* Dirección */}
                  <div className="mb-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F0F2F9' }}>
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#CAE6FF' }}>
                        <MapPin className="h-5 w-5" style={{ color: '#1B1E4A' }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#1B1E4A' }}>
                          Dirección
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {placeDetails.formatted_address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Teléfono */}
                  {placeDetails.formatted_phone_number && (
                    <div className="mb-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F0F2F9' }}>
                        <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#CAE6FF' }}>
                          <Phone className="h-5 w-5" style={{ color: '#1B1E4A' }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#1B1E4A' }}>
                            Teléfono
                          </p>
                          <a 
                            href={`tel:${placeDetails.formatted_phone_number}`}
                            className="text-sm font-medium hover:underline block"
                            style={{ color: '#1B1E4A' }}
                          >
                            {placeDetails.formatted_phone_number}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sitio web */}
                  {placeDetails.website && (
                    <div className="mb-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F0F2F9' }}>
                        <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#CAE6FF' }}>
                          <Globe className="h-5 w-5" style={{ color: '#1B1E4A' }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#1B1E4A' }}>
                            Sitio web
                          </p>
                          <a 
                            href={placeDetails.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:underline flex items-center gap-1"
                            style={{ color: '#1B1E4A' }}
                          >
                            {placeDetails.website}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botón para ver en Google Maps */}
                  <div className="pt-2">
                    <a
                      href={placeDetails.place_id
                        ? `https://www.google.com/maps/place/?q=place_id:${placeDetails.place_id}`
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeDetails.formatted_address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-[#1B1E4A] hover:bg-[#272C5B] text-white flex items-center justify-center gap-2 py-4 rounded-lg font-medium">
                        Ver en Google Maps
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Botón para ver mapa completo */}
        <div className="text-center mt-6">
          <Link href="/servicios/mapa">
            <Button 
              className="bg-[#1B1E4A] hover:bg-[#272C5B] text-white"
            >
              Ver mapa completo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
