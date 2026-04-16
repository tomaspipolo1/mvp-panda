"use client"

import { useEffect, useRef, useState } from 'react'
import JSZip from 'jszip'
import { MAP_FILTERS, type MapFilterId, type MapFilterItemOption } from '@/components/map-filter-config'
import {
  buildGeometryFamilyMap,
  derivePrLineFeatures,
  CATEGORY_STYLES,
  COMPACT_AR_POINT_CODES,
  DEFAULT_FILTERS,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  INSTITUTIONAL_BLUE,
  KMZ_PATH,
  MAP_STYLES,
  buildCatalog,
  createDotSvg,
  createDiamondSvg,
  createReferenceLabelSvg,
  createMarkerSvg,
  getArrendamientoAvailabilityStatus,
  getBalizaColor,
  getCatalogLabel,
  getFeatureItemKey,
  getGeometryCenter,
  parseKML,
  sanitizeDescription,
  shouldRenderFeature,
  type ArrendamientoAvailability,
  type DotMarkerSize,
  type MapOverlay,
  type MarkerIconType,
  type ParsedFeature,
  type SelectedFeatureDetails,
} from '@/components/working-google-map-utils'
import {
  DesktopSelectionPanel,
  MobileSelectionPanel,
} from '@/components/working-google-map-panels'

/// <reference types="google.maps" />

type WorkingGoogleMapProps = {
  activeFilters?: MapFilterId[]
  activeItemKeys?: string[]
  onCatalogChange?: (catalog: Partial<Record<MapFilterId, MapFilterItemOption[]>>) => void
  height?: string
  arrendamientoAvailability?: ArrendamientoAvailability
}

declare global {
  interface Window {
    google: typeof google
    initWorkingMap: () => void
  }
}

export default function WorkingGoogleMap({
  activeFilters = DEFAULT_FILTERS,
  activeItemKeys = [],
  onCatalogChange,
  height = '600px',
  arrendamientoAvailability,
}: WorkingGoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Iniciando...')
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [visibleItemsCount, setVisibleItemsCount] = useState(0)
  const mapCreatedRef = useRef(false)
  const directFeaturesRef = useRef<ParsedFeature[]>([])
  const overlaysRef = useRef<MapOverlay[]>([])
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeatureDetails | null>(null)

  const extractKmlFromKmz = async (kmzBlob: Blob) => {
    const zip = await JSZip.loadAsync(await kmzBlob.arrayBuffer())
    const kmlEntry = zip.file(/\.kml$/i)[0]

    if (!kmlEntry) {
      throw new Error('No se encontró ningún archivo .kml dentro de permUso.kmz')
    }

    return kmlEntry.async('text')
  }

  const clearMapElements = () => {
    overlaysRef.current.forEach((overlay) => overlay.setMap(null))
    overlaysRef.current = []
  }

  const focusMapOnFeature = (
    mapInstance: google.maps.Map,
    feature: ParsedFeature,
    overridePoints?: google.maps.LatLngLiteral[],
  ) => {
    const focusPoints = overridePoints && overridePoints.length > 0
      ? overridePoints
      : feature.geometryType === 'polygon' && feature.rings?.length
        ? feature.rings.flat()
        : feature.points

    if (focusPoints.length === 1) {
      mapInstance.panTo(focusPoints[0])
      mapInstance.setZoom(Math.max(mapInstance.getZoom() || 15, 18))
      return
    }

    const bounds = new window.google.maps.LatLngBounds()
    focusPoints.forEach((point) => bounds.extend(point))
    mapInstance.fitBounds(bounds, 80)
  }

  const isFeatureHighlighted = (feature: ParsedFeature, currentSelection: SelectedFeatureDetails | null) => {
    if (!currentSelection) return false

    if (currentSelection.itemKey === getFeatureItemKey(feature)) {
      return true
    }

    return currentSelection.category === feature.category && currentSelection.code === feature.sourceGroup
  }

  const openFeaturePanel = (
    mapInstance: google.maps.Map,
    feature: ParsedFeature,
    overrides?: Partial<Pick<SelectedFeatureDetails, 'label' | 'description' | 'position' | 'code'>>,
  ) => {
    const categoryLabel = MAP_FILTERS.find((filter) => filter.id === feature.category)?.label || feature.category
    focusMapOnFeature(mapInstance, feature, overrides?.position ? [overrides.position] : undefined)
    setSelectedFeature({
      id: feature.id,
      itemKey: getFeatureItemKey(feature),
      label: overrides?.label || getCatalogLabel(feature.description, feature.name),
      code: overrides?.code || feature.name,
      category: feature.category,
      categoryLabel,
      sourceGroup: feature.sourceGroup,
      description: overrides?.description || feature.description,
      position: overrides?.position || getGeometryCenter(feature),
    })
  }

  const createPointMarker = (
    mapInstance: google.maps.Map,
    feature: ParsedFeature,
    color: string,
    isSelected: boolean,
    iconType?: MarkerIconType,
    size: DotMarkerSize = 'default',
    customIcon?: google.maps.Icon,
  ) => {
    const marker = new window.google.maps.Marker({
      position: feature.points[0],
      map: mapInstance,
      title: feature.name,
      icon: customIcon || (iconType ? createMarkerSvg(iconType, color, isSelected) : createDotSvg(color, isSelected, size)),
      zIndex: isSelected ? 50 : 30,
    })

    marker.addListener('click', () => {
      openFeaturePanel(mapInstance, feature, { position: feature.points[0] })
    })

    overlaysRef.current.push(marker)
  }

  const getVisibleFeatures = (
    features: ParsedFeature[],
    selectedFilters: MapFilterId[],
    selectedItemKeys: string[],
  ) => {
    const featuresWithDerivedLines = [...features, ...derivePrLineFeatures(features)]
    const selectedItemsSet = new Set(selectedItemKeys)
    const geometryFamilyMap = buildGeometryFamilyMap(featuresWithDerivedLines)

    return featuresWithDerivedLines.filter((feature) => {
      const geometryFamilies = geometryFamilyMap.get(getFeatureItemKey(feature))

      if (
        feature.category === 'OTHER' ||
        !selectedFilters.includes(feature.category) ||
        !shouldRenderFeature(feature, geometryFamilies)
      ) {
        return false
      }

      const categoryItemKeys = selectedItemKeys.filter((itemKey) => itemKey.startsWith(`${feature.category}:`))
      if (categoryItemKeys.length === 0) {
        return true
      }

      return selectedItemsSet.has(getFeatureItemKey(feature))
    })
  }

  const renderDirectFeatures = (
    mapInstance: google.maps.Map,
    features: ParsedFeature[],
    selectedFilters: MapFilterId[],
    selectedItemKeys: string[],
    currentSelection: SelectedFeatureDetails | null,
  ) => {
    clearMapElements()

    const visibleFeatures = getVisibleFeatures(features, selectedFilters, selectedItemKeys)

    visibleFeatures.forEach((feature) => {
      const category = feature.category as MapFilterId
      const style = CATEGORY_STYLES[category]
      const isSelected = isFeatureHighlighted(feature, currentSelection)
      const availabilityStatus = getArrendamientoAvailabilityStatus(feature, arrendamientoAvailability)
      const isOccupiedArrendamiento = category === 'AR' && availabilityStatus === false
      const baseStrokeColor = isOccupiedArrendamiento ? '#dc2626' : style.strokeColor
      const selectedStrokeColor = isOccupiedArrendamiento ? '#991b1b' : style.selectedStrokeColor
      const baseFillColor = isOccupiedArrendamiento ? '#fecaca' : style.fillColor

      if (style.iconType) {
        const position = getGeometryCenter(feature)
        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance,
          title: feature.name,
          icon: createMarkerSvg(
            style.iconType,
            isSelected ? selectedStrokeColor : baseStrokeColor,
            isSelected,
          ),
          zIndex: isSelected ? 50 : undefined,
        })

        marker.addListener('click', () => {
          openFeaturePanel(mapInstance, feature, { position })
        })

        overlaysRef.current.push(marker)
        return
      }

      if (feature.geometryType === 'polygon' && feature.rings?.length) {
        feature.rings.forEach((ring) => {
          const polygon = new window.google.maps.Polygon({
            map: mapInstance,
            paths: ring,
            strokeColor: isSelected ? selectedStrokeColor : baseStrokeColor,
            strokeOpacity: 1,
            strokeWeight: isSelected ? 4 : category === 'AR' ? 2.5 : 2,
            fillColor: baseFillColor,
            fillOpacity: isSelected ? (category === 'AR' ? 0.8 : 0.38) : category === 'AR' ? 0.28 : 0.14,
            zIndex: isSelected ? 40 : 20,
          })

          polygon.addListener('click', () => {
            openFeaturePanel(mapInstance, feature)
          })

          overlaysRef.current.push(polygon)
        })
        return
      }

      if (feature.geometryType === 'line' && feature.points.length >= 2) {
        const polyline = new window.google.maps.Polyline({
          map: mapInstance,
          path: feature.points,
          strokeColor: isSelected ? selectedStrokeColor : baseStrokeColor,
          strokeOpacity: isSelected ? 1 : 0.9,
          strokeWeight: isSelected ? 5 : category === 'EJ' ? 3 : 2,
          zIndex: isSelected ? 40 : 15,
        })

        polyline.addListener('click', () => {
          openFeaturePanel(mapInstance, feature, { position: feature.points[0] })
        })

        overlaysRef.current.push(polyline)

        return
      }

      if (feature.geometryType === 'point' && feature.points.length > 0) {
        if (category === 'PR') {
          createPointMarker(
            mapInstance,
            feature,
            isSelected ? selectedStrokeColor : baseStrokeColor,
            isSelected,
            undefined,
            'default',
            createReferenceLabelSvg(getCatalogLabel(feature.description, feature.name), isSelected),
          )
          return
        }

        const pointSize: DotMarkerSize =
          category === 'AR' && COMPACT_AR_POINT_CODES.has(feature.name) ? 'compact' : 'default'
        const pointIconType: MarkerIconType | undefined =
          category === 'AR'
            ? 'billboard'
            : style.pointIconType
        const balizaColor = category === 'BA' ? getBalizaColor(feature) : null
        createPointMarker(
          mapInstance,
          feature,
          isSelected ? selectedStrokeColor : baseStrokeColor,
          isSelected,
          pointIconType,
          pointSize,
          balizaColor ? createDiamondSvg(balizaColor, isSelected) : undefined,
        )
      }
    })

    setVisibleItemsCount(visibleFeatures.length)
    setStatus(`✅ Mapa + ${visibleFeatures.length} elementos del KMZ`)

  }

  const focusSelectedFeature = (
    mapInstance: google.maps.Map,
    selected: SelectedFeatureDetails | null,
    features: ParsedFeature[],
  ) => {
    if (!selected) return

    const matchingFeature = features.find((feature) => getFeatureItemKey(feature) === selected.itemKey)
    if (!matchingFeature) return

    focusMapOnFeature(mapInstance, matchingFeature)
  }

  const loadKMZDirect = async (mapInstance: google.maps.Map) => {
    try {
      console.log('WorkingMap: Cargando KMZ directamente...')
      setStatus('Cargando KMZ directamente...')
      
      const response = await fetch(KMZ_PATH)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const kmzBlob = await response.blob()
      const kmlText = await extractKmlFromKmz(kmzBlob)
      console.log('WorkingMap: KMZ descomprimido, tamaño KML:', kmlText.length)
      
      const parsedFeatures = parseKML(kmlText)
      console.log('WorkingMap: KML interno parseado, elementos encontrados:', parsedFeatures.length)

      directFeaturesRef.current = parsedFeatures
      onCatalogChange?.(buildCatalog(parsedFeatures))
      renderDirectFeatures(mapInstance, parsedFeatures, activeFilters, activeItemKeys, selectedFeature)
      
    } catch (error) {
      console.error('WorkingMap: Error cargando KMZ directo:', error)
      setStatus('❌ Error cargando KMZ: ' + (error as Error).message)
    }
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
          center: DEFAULT_MAP_CENTER,
          zoom: DEFAULT_MAP_ZOOM,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          fullscreenControl: true,
          mapTypeControl: false,
          styles: MAP_STYLES,
        })
        
        console.log('WorkingMap: ✅ Mapa creado exitosamente')
        setStatus('✅ Mapa funcionando')
        setMap(mapInstance)
        mapCreatedRef.current = true

        setTimeout(() => {
          loadKMZDirect(mapInstance)
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
      clearMapElements()
    }
  }, [])

  useEffect(() => {
    if (!map || directFeaturesRef.current.length === 0) {
      return
    }

    renderDirectFeatures(map, directFeaturesRef.current, activeFilters, activeItemKeys, selectedFeature)
  }, [activeFilters, activeItemKeys, map, selectedFeature])

  useEffect(() => {
    if (!map || directFeaturesRef.current.length === 0 || !selectedFeature) {
      return
    }

    focusSelectedFeature(map, selectedFeature, directFeaturesRef.current)
  }, [map, selectedFeature])

  useEffect(() => {
    if (!selectedFeature) return

    if (!activeFilters.includes(selectedFeature.category as MapFilterId)) {
      setSelectedFeature(null)
      return
    }

    const categorySpecificSelections = activeItemKeys.filter((itemKey) => itemKey.startsWith(`${selectedFeature.category}:`))
    if (categorySpecificSelections.length > 0 && !categorySpecificSelections.includes(selectedFeature.itemKey)) {
      setSelectedFeature(null)
    }
  }, [activeFilters, activeItemKeys, selectedFeature])

  const canOpenDirections =
    selectedFeature &&
    (selectedFeature.category === 'AC' || selectedFeature.category === 'ST' || selectedFeature.category === 'ED')

  const googleMapsDirectionsUrl = canOpenDirections
    ? `https://www.google.com/maps/dir/?api=1&destination=${selectedFeature.position.lat},${selectedFeature.position.lng}&travelmode=driving`
    : null

  const handleCloseSelection = () => {
    if (map) {
      map.panTo(DEFAULT_MAP_CENTER)
      map.setZoom(DEFAULT_MAP_ZOOM)
    }

    setSelectedFeature(null)
  }

  useEffect(() => {
    if (!selectedFeature) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseSelection()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedFeature, map])

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
        style={{ minHeight: height, height }}
      >
        <div
          ref={mapRef}
          className="h-full w-full"
        />

        {selectedFeature && (
          <>
            <DesktopSelectionPanel
              directionsUrl={googleMapsDirectionsUrl}
              onClose={handleCloseSelection}
              selectedFeature={selectedFeature}
            />
            <MobileSelectionPanel
              directionsUrl={googleMapsDirectionsUrl}
              onClose={handleCloseSelection}
              selectedFeature={selectedFeature}
            />
          </>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-800">Estado: {status}</p>
            <p className="text-xs text-slate-600">
              {visibleItemsCount} elementos cargados desde `permUso.kmz`
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
