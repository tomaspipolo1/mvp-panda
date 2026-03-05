# Guía: Google Maps Places API - Detalles de Lugares

Esta guía explica cómo usar la API de Google Maps Places para buscar lugares y mostrar sus detalles al hacer clic en un marcador.

## Funciones Principales

### 1. Google Maps Places API
Utiliza la biblioteca `places` de Google Maps para buscar lugares y obtener información detallada.

```javascript
// Inicializar el servicio de Places
const placesService = new window.google.maps.places.PlacesService(mapInstance)
```

### 2. Búsqueda de Lugares (`textSearch`)
Busca un lugar por texto y obtiene información básica:

```javascript
const request = {
  query: 'Puerto La Plata, Ortiz de Rosas 151 185, B1925 Ensenada...',
  fields: ['name', 'geometry', 'formatted_address', 'place_id']
}

placesService.textSearch(request, (results, status) => {
  if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
    const place = results[0]
    // place.geometry.location - coordenadas
    // place.place_id - ID único del lugar
    // place.name - nombre del lugar
  }
})
```

### 3. Obtener Detalles Completos (`getDetails`)
Con el `place_id`, obtiene información detallada:

```javascript
const detailsRequest = {
  placeId: place.place_id,
  fields: ['name', 'formatted_address', 'formatted_phone_number', 'website']
}

placesService.getDetails(detailsRequest, (placeDetails, detailsStatus) => {
  if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK && placeDetails) {
    // placeDetails.formatted_address
    // placeDetails.formatted_phone_number
    // placeDetails.website
    // etc.
  }
})
```

### 4. Event Listener en el Marcador
Abre el sidebar al hacer clic:

```javascript
marker.addListener('click', () => {
  setSidebarOpen(true) // Estado de React para mostrar/ocultar sidebar
})
```

## Flujo Completo

1. **Crear el mapa** → `new google.maps.Map()`
2. **Inicializar PlacesService** → `new PlacesService(map)`
3. **Buscar el lugar** → `textSearch()` → obtiene `place_id`
4. **Obtener detalles** → `getDetails(place_id)` → obtiene información completa
5. **Crear marcador** → `new Marker()` → posiciona el pin
6. **Agregar listener** → `marker.addListener('click')` → abre el sidebar
7. **Guardar en estado** → `setPlaceDetails()` → muestra la información

## Campos Disponibles en `getDetails`

Puedes solicitar estos campos (y muchos más):

- `name` - Nombre del lugar
- `formatted_address` - Dirección formateada
- `formatted_phone_number` - Teléfono formateado
- `website` - Sitio web
- `rating` - Calificación
- `reviews` - Reseñas
- `opening_hours` - Horarios de apertura
- `photos` - Fotos del lugar
- `geometry` - Coordenadas y viewport

## Ejemplo Completo

```javascript
"use client"

import { useEffect, useRef, useState } from 'react'

export function MapWithPlaceDetails() {
  const mapRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [placeDetails, setPlaceDetails] = useState(null)

  useEffect(() => {
    if (!mapRef.current) return

    // 1. Crear el mapa
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: -34.8738, lng: -57.8774 },
      zoom: 14,
    })

    // 2. Inicializar PlacesService
    const placesService = new window.google.maps.places.PlacesService(mapInstance)

    // 3. Buscar el lugar
    const request = {
      query: 'Puerto La Plata, Ensenada, Buenos Aires',
      fields: ['name', 'geometry', 'formatted_address', 'place_id']
    }

    placesService.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
        const place = results[0]

        // 4. Obtener detalles completos
        const detailsRequest = {
          placeId: place.place_id,
          fields: ['name', 'formatted_address', 'formatted_phone_number', 'website']
        }

        placesService.getDetails(detailsRequest, (placeDetails, detailsStatus) => {
          if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK && placeDetails) {
            // Guardar detalles en estado
            setPlaceDetails({
              name: placeDetails.name,
              formatted_address: placeDetails.formatted_address,
              formatted_phone_number: placeDetails.formatted_phone_number,
              website: placeDetails.website,
              place_id: place.place_id
            })
          }
        })

        // 5. Crear marcador
        const marker = new window.google.maps.Marker({
          position: place.geometry.location,
          map: mapInstance,
          title: place.name
        })

        // 6. Agregar listener para abrir sidebar
        marker.addListener('click', () => {
          setSidebarOpen(true)
        })

        markerRef.current = marker
      }
    })
  }, [])

  return (
    <div>
      <div ref={mapRef} className="w-full h-[500px]" />
      
      {/* Sidebar con detalles */}
      {sidebarOpen && placeDetails && (
        <div className="sidebar">
          <h3>{placeDetails.name}</h3>
          <p>{placeDetails.formatted_address}</p>
          {placeDetails.formatted_phone_number && (
            <p>{placeDetails.formatted_phone_number}</p>
          )}
          {placeDetails.website && (
            <a href={placeDetails.website}>{placeDetails.website}</a>
          )}
        </div>
      )}
    </div>
  )
}
```

## Puntos Importantes

### 1. Cargar la biblioteca `places`
Asegúrate de incluir la biblioteca `places` al cargar Google Maps:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places&v=weekly"></script>
```

### 2. Usar Callbacks
Ambas funciones (`textSearch` y `getDetails`) son asíncronas y usan callbacks. No devuelven promesas directamente.

### 3. Manejar Estados
Usa estados de React (`useState`) para:
- Guardar los detalles del lugar
- Controlar la visibilidad del sidebar
- Manejar el estado de carga

### 4. Manejo de Errores
Siempre verifica el `status` en los callbacks:

```javascript
if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  // Procesar resultados
} else {
  console.error('Error:', status)
}
```

## Referencias

- [Google Maps Places API Documentation](https://developers.google.com/maps/documentation/javascript/places)
- [PlacesService.textSearch()](https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests)
- [PlacesService.getDetails()](https://developers.google.com/maps/documentation/javascript/places#place_details)
- [Place Details Fields](https://developers.google.com/maps/documentation/places/web-service/place-data-fields)
