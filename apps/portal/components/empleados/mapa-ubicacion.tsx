"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Dynamic import for map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)

const useMapEvents = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMapEvents),
  { ssr: false }
)

interface MapaUbicacionProps {
  latitud: string
  longitud: string
  onCoordenadasChange: (latitud: string, longitud: string) => void
}

// Component to handle map events
function MapClickHandler({ onCoordenadasChange }: { onCoordenadasChange: (latitud: string, longitud: string) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null)

  useMapEvents({
    click: (e) => {
      console.log("Map clicked:", e.latlng) // Debug log
      const { lat, lng } = e.latlng
      setPosition(e.latlng)
      onCoordenadasChange(lat.toFixed(6), lng.toFixed(6))
    },
  })

  return position === null ? null : <Marker position={position} />
}

export default function MapaUbicacion({ latitud, longitud, onCoordenadasChange }: MapaUbicacionProps) {
  const [isClient, setIsClient] = useState(false)

  // Parse initial coordinates
  const initialLat = latitud ? parseFloat(latitud) : -34.6037
  const initialLng = longitud ? parseFloat(longitud) : -58.3816

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-64 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border">
      <MapContainer
        center={[initialLat, initialLng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onCoordenadasChange={onCoordenadasChange} />
        {latitud && longitud && (
          <Marker position={[initialLat, initialLng]} />
        )}
      </MapContainer>
    </div>
  )
}