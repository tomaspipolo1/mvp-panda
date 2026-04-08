"use client"

import { useEffect, useRef, useState } from 'react'
import JSZip from 'jszip'
import { MAP_FILTERS, type MapFilterId, type MapFilterItemOption } from '@/components/map-filters'
import { Layers3, MapPin, Tag, X } from 'lucide-react'

/// <reference types="google.maps" />

const KMZ_PATH = '/permUso.kmz'
const DEFAULT_FILTERS = MAP_FILTERS.map((filter) => filter.id)

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.man_made', stylers: [{ color: '#f4f5f1' }] },
  { featureType: 'landscape.natural', stylers: [{ color: '#eef3ec' }] },
  { featureType: 'water', stylers: [{ color: '#cfe6ff' }] },
]

type GeometryType = 'point' | 'line' | 'polygon'

type ParsedFeature = {
  id: string
  name: string
  description: string
  category: MapFilterId | 'OTHER'
  sourceGroup: string
  geometryType: GeometryType
  points: google.maps.LatLngLiteral[]
  rings?: google.maps.LatLngLiteral[][]
}

type MapOverlay =
  | google.maps.Marker
  | google.maps.Polyline
  | google.maps.Polygon
  | google.maps.Circle

type WorkingGoogleMapProps = {
  activeFilters?: MapFilterId[]
  activeItemKeys?: string[]
  onCatalogChange?: (catalog: Partial<Record<MapFilterId, MapFilterItemOption[]>>) => void
  height?: string
}

type SelectedFeatureDetails = {
  id: string
  itemKey: string
  label: string
  code: string
  category: MapFilterId | 'OTHER'
  categoryLabel: string
  sourceGroup: string
  description: string
  position: google.maps.LatLngLiteral
}

declare global {
  interface Window {
    google: typeof google
    initWorkingMap: () => void
  }
}

const CATEGORY_STYLES: Record<MapFilterId, { strokeColor: string; fillColor: string; iconType?: 'gate' | 'building' }> = {
  ST: { strokeColor: '#2563eb', fillColor: '#93c5fd' },
  AC: { strokeColor: '#b45309', fillColor: '#f59e0b', iconType: 'gate' },
  AR: { strokeColor: '#0f766e', fillColor: '#5eead4' },
  BA: { strokeColor: '#dc2626', fillColor: '#fca5a5' },
  PR: { strokeColor: '#6b7280', fillColor: '#d1d5db' },
  EJ: { strokeColor: '#7c3aed', fillColor: '#c4b5fd' },
  ED: { strokeColor: '#1d4ed8', fillColor: '#93c5fd', iconType: 'building' },
  FF: { strokeColor: '#111827', fillColor: '#9ca3af' },
}

// Solo estas categorias tienen sentido como secuencias de puntos conectadas.
const CONNECT_POINT_GROUPS = new Set<MapFilterId>(['PR', 'BA'])
const FEATURE_LABEL_ALIASES: Record<string, string> = {
  'AR-03': 'TecPlata',
  'AR-03-02': 'TecPlata',
}

function getDirectChildText(parent: Element, localName: string): string {
  const child = Array.from(parent.children).find((element) => element.localName === localName)
  return child?.textContent?.trim() || ''
}

function parseCoordinateString(rawCoordinates: string): google.maps.LatLngLiteral[] {
  return rawCoordinates
    .trim()
    .split(/\s+/)
    .map((coordinateSet) => {
      const [lng, lat] = coordinateSet.split(',')
      return {
        lat: Number.parseFloat(lat),
        lng: Number.parseFloat(lng),
      }
    })
    .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng))
}

function extractCategoryId(folderName: string, placemarkName: string): MapFilterId | 'OTHER' {
  const candidates = [folderName, placemarkName].map((value) => value.trim().toUpperCase())

  for (const candidate of candidates) {
    if (candidate === 'SI' || candidate.startsWith('SI-')) {
      return 'ST'
    }

    const match = DEFAULT_FILTERS.find((filterId) => candidate === filterId || candidate.startsWith(`${filterId}-`))
    if (match) {
      return match
    }
  }

  return 'OTHER'
}

function getGeometryCenter(feature: ParsedFeature): google.maps.LatLngLiteral {
  const sourcePoints = feature.geometryType === 'polygon' && feature.rings?.[0]?.length
    ? feature.rings[0]
    : feature.points

  const total = sourcePoints.reduce(
    (accumulator, point) => ({
      lat: accumulator.lat + point.lat,
      lng: accumulator.lng + point.lng,
    }),
    { lat: 0, lng: 0 },
  )

  return {
    lat: total.lat / sourcePoints.length,
    lng: total.lng / sourcePoints.length,
  }
}

function sanitizeDescription(description: string) {
  return description.replace(/<BR\s*\/?>/gi, '<br />')
}

function isTechnicalFeatureCode(value: string) {
  return /^[A-Z]{2}(?:-\d+)+(?:-\d+)*$/i.test(value.trim())
}

function isGeneratedFallbackName(value: string) {
  return /^Elemento\s+\d+$/i.test(value.trim())
}

function getCatalogLabel(description: string, fallbackName: string) {
  if (FEATURE_LABEL_ALIASES[fallbackName]) {
    return FEATURE_LABEL_ALIASES[fallbackName]
  }

  const normalizedKey = fallbackName.split('-').slice(0, 2).join('-')
  if (FEATURE_LABEL_ALIASES[normalizedKey]) {
    return FEATURE_LABEL_ALIASES[normalizedKey]
  }

  if (fallbackName && !isTechnicalFeatureCode(fallbackName) && !isGeneratedFallbackName(fallbackName)) {
    return fallbackName
  }

  const plainText = description
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<BR\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!plainText) {
    return fallbackName
  }

  const withoutElevation = plainText
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.toUpperCase().includes('ELEVATION'))

  const candidate = (withoutElevation || plainText)
    .replace(/^\d+\s+/, '')
    .replace(/[_-]+/g, ' ')
    .trim()

  return candidate || fallbackName
}

function getFeatureItemKey(feature: ParsedFeature) {
  return `${feature.category}:${feature.name}`
}

function buildCatalog(features: ParsedFeature[]): Partial<Record<MapFilterId, MapFilterItemOption[]>> {
  const catalog: Partial<Record<MapFilterId, MapFilterItemOption[]>> = {}

  DEFAULT_FILTERS.forEach((category) => {
    const counts = new Map<string, number>()

    features
      .filter((feature) => feature.category === category)
      .forEach((feature) => {
        const current = counts.get(feature.name) || 0
        counts.set(feature.name, current + 1)
      })

    catalog[category] = Array.from(counts.entries())
      .map(([name, count]) => ({
        key: `${category}:${name}`,
        name,
        label: getCatalogLabel(
          features.find((feature) => feature.category === category && feature.name === name)?.description || '',
          name,
        ),
        count,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'es'))
  })

  return catalog
}

function createMarkerSvg(iconType: 'gate' | 'building', color: string, isSelected = false) {
  const strokeWidth = isSelected ? 3 : 2
  const radius = isSelected ? 17 : 16
  const iconScale = isSelected ? 1.08 : 1
  const svg = iconType === 'gate'
    ? `
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17" cy="17" r="${radius}" fill="white" stroke="${color}" stroke-width="${strokeWidth}"/>
        <g transform="scale(${iconScale}) translate(${isSelected ? '-0.8' : '0'}, ${isSelected ? '-0.8' : '0'})">
          <path d="M10 23V14L17 10L24 14V23" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 23V17H20V23" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    `
    : `
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17" cy="17" r="${radius}" fill="white" stroke="${color}" stroke-width="${strokeWidth}"/>
        <g transform="scale(${iconScale}) translate(${isSelected ? '-0.8' : '0'}, ${isSelected ? '-0.8' : '0'})">
          <path d="M11 24V11H23V24" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 15H16M18 15H19M15 18H16M18 18H19" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </g>
      </svg>
    `

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new window.google.maps.Size(34, 34),
    anchor: new window.google.maps.Point(17, 17),
  }
}

export default function WorkingGoogleMap({
  activeFilters = DEFAULT_FILTERS,
  activeItemKeys = [],
  onCatalogChange,
  height = '600px',
}: WorkingGoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Iniciando...')
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [kmlMethod, setKmlMethod] = useState<'layer' | 'direct'>('direct')
  const [visibleItemsCount, setVisibleItemsCount] = useState(0)
  const mapCreatedRef = useRef(false)
  const directFeaturesRef = useRef<ParsedFeature[]>([])
  const kmzLayerRef = useRef<google.maps.KmlLayer | null>(null)
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
    kmzLayerRef.current?.setMap(null)
    kmzLayerRef.current = null

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
  ) => {
    const marker = new window.google.maps.Marker({
      position: feature.points[0],
      map: mapInstance,
      title: feature.name,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: feature.category === 'ST' ? (isSelected ? 8 : 6) : (isSelected ? 7 : 5),
        fillColor: isSelected ? '#f59e0b' : color,
        fillOpacity: 1,
        strokeColor: isSelected ? '#1f2937' : '#ffffff',
        strokeWeight: isSelected ? 3 : 2,
      },
      zIndex: isSelected ? 50 : 30,
    })

    marker.addListener('click', () => {
      openFeaturePanel(mapInstance, feature, { position: feature.points[0] })
    })

    overlaysRef.current.push(marker)
  }

  const parseKML = (kmlContent: string) => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(kmlContent, 'text/xml')
    const folders = Array.from(xmlDoc.getElementsByTagName('Folder'))
    const parsedFeatures: ParsedFeature[] = []
    let featureIndex = 0

    const parsePlacemark = (placemark: Element, sourceGroup: string) => {
      const placemarkName = getDirectChildText(placemark, 'name') || `Elemento ${featureIndex + 1}`
      const description = getDirectChildText(placemark, 'description')
      const category = extractCategoryId(sourceGroup, placemarkName)
      let hasGeometry = false

      const polygonRings = Array.from(placemark.getElementsByTagName('Polygon'))
        .map((polygon) => {
          const coordinatesNode = polygon.getElementsByTagName('coordinates')[0]
          return coordinatesNode ? parseCoordinateString(coordinatesNode.textContent || '') : []
        })
        .filter((ring) => ring.length >= 3)

      if (polygonRings.length > 0) {
        hasGeometry = true
        parsedFeatures.push({
          id: `feature-${featureIndex++}`,
          name: placemarkName,
          description,
          category,
          sourceGroup,
          geometryType: 'polygon',
          points: polygonRings[0],
          rings: polygonRings,
        })
      }

      const lineCoordinates = Array.from(placemark.getElementsByTagName('LineString'))
        .flatMap((lineString) => {
          const coordinatesNode = lineString.getElementsByTagName('coordinates')[0]
          return coordinatesNode ? [parseCoordinateString(coordinatesNode.textContent || '')] : []
        })
        .filter((path) => path.length >= 2)

      if (lineCoordinates.length > 0) {
        hasGeometry = true
        lineCoordinates.forEach((path, pathIndex) => {
          parsedFeatures.push({
            id: `feature-${featureIndex++}-${pathIndex}`,
            name: placemarkName,
            description,
            category,
            sourceGroup,
            geometryType: 'line',
            points: path,
          })
        })
      }

      const pointCoordinates = Array.from(placemark.getElementsByTagName('Point'))
        .flatMap((point) => {
          const coordinatesNode = point.getElementsByTagName('coordinates')[0]
          return coordinatesNode ? parseCoordinateString(coordinatesNode.textContent || '') : []
        })

      if (pointCoordinates.length > 0) {
        hasGeometry = true
        parsedFeatures.push({
          id: `feature-${featureIndex++}`,
          name: placemarkName,
          description,
          category,
          sourceGroup,
          geometryType: 'point',
          points: [pointCoordinates[0]],
        })
      }

      if (!hasGeometry) {
        console.warn('Placemark sin geometría utilizable:', placemarkName)
      }
    }

    if (folders.length > 0) {
      folders.forEach((folder) => {
        const folderName = getDirectChildText(folder, 'name') || 'GENERAL'
        const placemarks = Array.from(folder.getElementsByTagName('Placemark'))
        placemarks.forEach((placemark) => parsePlacemark(placemark, folderName))
      })
    } else {
      Array.from(xmlDoc.getElementsByTagName('Placemark')).forEach((placemark) => parsePlacemark(placemark, 'GENERAL'))
    }

    return parsedFeatures
  }

  const renderDirectFeatures = (
    mapInstance: google.maps.Map,
    features: ParsedFeature[],
    selectedFilters: MapFilterId[],
    selectedItemKeys: string[],
    currentSelection: SelectedFeatureDetails | null,
  ) => {
    clearMapElements()

    const bounds = new window.google.maps.LatLngBounds()
    const selectedItemsSet = new Set(selectedItemKeys)
    const visibleFeatures = features.filter((feature) => {
      if (feature.category === 'OTHER' || !selectedFilters.includes(feature.category)) {
        return false
      }

      const categoryItemKeys = selectedItemKeys.filter((itemKey) => itemKey.startsWith(`${feature.category}:`))
      if (categoryItemKeys.length === 0) {
        return true
      }

      return selectedItemsSet.has(getFeatureItemKey(feature))
    })
    const pointGroups = new Map<string, ParsedFeature[]>()

    const extendBounds = (points: google.maps.LatLngLiteral[]) => {
      points.forEach((point) => bounds.extend(point))
    }

    visibleFeatures.forEach((feature) => {
      const category = feature.category as MapFilterId
      const style = CATEGORY_STYLES[category]
      const isSelected = isFeatureHighlighted(feature, currentSelection)

      if (style.iconType) {
        const position = getGeometryCenter(feature)
        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance,
          title: feature.name,
          icon: createMarkerSvg(style.iconType, style.strokeColor, isSelected),
          zIndex: isSelected ? 50 : undefined,
        })

        marker.addListener('click', () => {
          openFeaturePanel(mapInstance, feature, { position })
        })

        overlaysRef.current.push(marker)
        extendBounds([position])
        return
      }

      if (feature.geometryType === 'polygon' && feature.rings?.length) {
        feature.rings.forEach((ring) => {
          const polygon = new window.google.maps.Polygon({
            map: mapInstance,
            paths: ring,
            strokeColor: isSelected ? '#f59e0b' : style.strokeColor,
            strokeOpacity: 1,
            strokeWeight: isSelected ? 4 : 2,
            fillColor: isSelected ? style.strokeColor : style.fillColor,
            fillOpacity: isSelected ? 0.42 : 0.22,
            zIndex: isSelected ? 40 : 20,
          })

          polygon.addListener('click', () => {
            openFeaturePanel(mapInstance, feature)
          })

          overlaysRef.current.push(polygon)
          extendBounds(ring)
        })
        return
      }

      if (feature.geometryType === 'line' && feature.points.length >= 2) {
        const polyline = new window.google.maps.Polyline({
          map: mapInstance,
          path: feature.points,
          strokeColor: isSelected ? '#f59e0b' : style.strokeColor,
          strokeOpacity: 1,
          strokeWeight: isSelected ? 5 : category === 'EJ' ? 3 : 2,
          zIndex: isSelected ? 40 : 15,
        })

        polyline.addListener('click', () => {
          openFeaturePanel(mapInstance, feature, { position: feature.points[0] })
        })

        overlaysRef.current.push(polyline)
        extendBounds(feature.points)
        return
      }

      if (feature.geometryType === 'point' && feature.points.length > 0) {
        createPointMarker(mapInstance, feature, style.strokeColor, isSelected)
        extendBounds(feature.points)

        const groupKey = `${category}-${feature.sourceGroup}`
        const currentGroup = pointGroups.get(groupKey) || []
        currentGroup.push(feature)
        pointGroups.set(groupKey, currentGroup)
      }
    })

    pointGroups.forEach((groupFeatures) => {
      const category = groupFeatures[0].category as MapFilterId
      const style = CATEGORY_STYLES[category]
      const path = groupFeatures.map((feature) => feature.points[0])
      const isSelectedGroup =
        currentSelection?.category === category && currentSelection.code === groupFeatures[0].sourceGroup

      if (path.length >= 2 && CONNECT_POINT_GROUPS.has(category)) {
        const polyline = new window.google.maps.Polyline({
          map: mapInstance,
          path,
          strokeColor: isSelectedGroup ? '#f59e0b' : style.strokeColor,
          strokeOpacity: 1,
          strokeWeight: isSelectedGroup ? 5 : category === 'ST' ? 3 : 2,
          zIndex: isSelectedGroup ? 45 : 10,
        })

        polyline.addListener('click', () => {
          openFeaturePanel(mapInstance, groupFeatures[0], {
            position: path[0],
            code: groupFeatures[0].sourceGroup,
            label: groupFeatures[0].sourceGroup,
            description: `${groupFeatures.length} elementos conectados`,
          })
        })

        overlaysRef.current.push(polyline)
        extendBounds(path)
      }

      path.forEach((point, index) => {
        const feature = groupFeatures[index]
        if (!CONNECT_POINT_GROUPS.has(category)) {
          return
        }

        extendBounds([point])
      })
    })

    setVisibleItemsCount(visibleFeatures.length)
    setStatus(`✅ Mapa directo + ${visibleFeatures.length} elementos del KMZ`)

    if (!currentSelection && !bounds.isEmpty()) {
      mapInstance.fitBounds(bounds, 48)
    }
  }

  const focusSelectedFeature = (
    mapInstance: google.maps.Map,
    selected: SelectedFeatureDetails | null,
    features: ParsedFeature[],
  ) => {
    if (!selected) return

    const matchingFeature = features.find((feature) => getFeatureItemKey(feature) === selected.itemKey)
    if (!matchingFeature) return

    if (selected.code === matchingFeature.sourceGroup && CONNECT_POINT_GROUPS.has(matchingFeature.category as MapFilterId)) {
      const groupedPoints = features
        .filter(
          (feature) =>
            feature.category === matchingFeature.category &&
            feature.sourceGroup === matchingFeature.sourceGroup &&
            feature.geometryType === 'point' &&
            feature.points.length > 0,
        )
        .map((feature) => feature.points[0])

      if (groupedPoints.length > 0) {
        focusMapOnFeature(mapInstance, matchingFeature, groupedPoints)
        return
      }
    }

    focusMapOnFeature(mapInstance, matchingFeature)
  }

  // Método 1: KMZ Layer de Google (requiere servidor público)
  const loadKMZLayer = (mapInstance: google.maps.Map) => {
    try {
      clearMapElements()
      console.log('WorkingMap: Cargando KMZ con Google Layer...')
      const kmlLayer = new window.google.maps.KmlLayer({
        url: `${window.location.origin}${KMZ_PATH}?t=${Date.now()}`, // Cache busting
        suppressInfoWindows: false,
        map: mapInstance,
        preserveViewport: false
      })

      kmlLayer.addListener('status_changed', () => {
        const status = kmlLayer.getStatus()
        console.log('WorkingMap: Estado KMZ Layer:', status)
        
        if (status === window.google.maps.KmlLayerStatus.OK) {
          console.log('WorkingMap: ✅ KMZ Layer cargado')
          setStatus('✅ Mapa + KMZ Layer funcionando')
          setVisibleItemsCount(0)
        } else {
          console.log('WorkingMap: ⚠️ KMZ Layer status:', status)
          setStatus('⚠️ KMZ Layer: ' + status)
        }
      })

      kmzLayerRef.current = kmlLayer
    } catch (error) {
      console.error('WorkingMap: Error cargando KMZ Layer:', error)
    }
  }

  // Método 2: Lectura directa del KMZ (descomprime y parsea el KML interno)
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
          center: { lat: -34.8738, lng: -57.8774 },
          zoom: 15,
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

        // Cargar KMZ según el método seleccionado
        setTimeout(() => {
          if (kmlMethod === 'layer') {
            loadKMZLayer(mapInstance)
          } else {
            loadKMZDirect(mapInstance)
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
      clearMapElements()
    }
  }, [])

  useEffect(() => {
    if (!map || kmlMethod !== 'direct' || directFeaturesRef.current.length === 0) {
      return
    }

    renderDirectFeatures(map, directFeaturesRef.current, activeFilters, activeItemKeys, selectedFeature)
  }, [activeFilters, activeItemKeys, kmlMethod, map, selectedFeature])

  useEffect(() => {
    if (!map || kmlMethod !== 'direct' || directFeaturesRef.current.length === 0 || !selectedFeature) {
      return
    }

    focusSelectedFeature(map, selectedFeature, directFeaturesRef.current)
  }, [kmlMethod, map, selectedFeature])

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

  // Cambiar método de carga KMZ
  const toggleKMLMethod = () => {
    if (!map) return

    const newMethod = kmlMethod === 'layer' ? 'direct' : 'layer'
    setKmlMethod(newMethod)
    
    // Recargar con nuevo método
    setTimeout(() => {
      if (newMethod === 'layer') {
        loadKMZLayer(map)
      } else {
        loadKMZDirect(map)
      }
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-green-800">Mapa de Google Maps con KMZ</h3>
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
              {kmlMethod === 'direct' ? '📋 Lectura directa (KMZ)' : '🌐 Google KMZ Layer'}
            </button>
          )}
          {map && (
            <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              Puerto La Plata (-34.8738, -57.8774)
            </div>
          )}
        </div>
      </div>
      
      
      
      <div className="relative overflow-hidden rounded-lg border-2 border-green-300 bg-gray-50" style={{ minHeight: height, height }}>
        <div
          ref={mapRef}
          className="h-full w-full"
        />

        {kmlMethod === 'direct' && selectedFeature && (
          <div className="absolute left-0 top-0 z-10 h-full w-full overflow-y-auto bg-white shadow-2xl md:w-[360px]">
            <div className="flex items-start justify-between p-4 pb-3" style={{ backgroundColor: '#CAE6FF' }}>
              <div className="pr-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#1B1E4A]/70">
                  {selectedFeature.categoryLabel}
                </p>
                <h3 className="text-xl font-bold text-[#1B1E4A]">{selectedFeature.label}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="rounded-full p-2 text-[#1B1E4A] transition-colors hover:bg-white/50"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 p-4 pt-3">
              <div className="flex items-start gap-3 rounded-lg p-3" style={{ backgroundColor: '#F0F2F9' }}>
                <div className="rounded-lg p-2" style={{ backgroundColor: '#CAE6FF' }}>
                  <Tag className="h-5 w-5 text-[#1B1E4A]" />
                </div>
                <div className="flex-1">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#1B1E4A]">Código</p>
                  <p className="text-sm font-medium text-gray-700">{selectedFeature.code}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg p-3" style={{ backgroundColor: '#F0F2F9' }}>
                <div className="rounded-lg p-2" style={{ backgroundColor: '#CAE6FF' }}>
                  <Layers3 className="h-5 w-5 text-[#1B1E4A]" />
                </div>
                <div className="flex-1">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#1B1E4A]">Grupo</p>
                  <p className="text-sm text-gray-700">{selectedFeature.sourceGroup}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg p-3" style={{ backgroundColor: '#F0F2F9' }}>
                <div className="rounded-lg p-2" style={{ backgroundColor: '#CAE6FF' }}>
                  <MapPin className="h-5 w-5 text-[#1B1E4A]" />
                </div>
                <div className="flex-1">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#1B1E4A]">Ubicación</p>
                  <p className="text-sm text-gray-700">
                    {selectedFeature.position.lat.toFixed(6)}, {selectedFeature.position.lng.toFixed(6)}
                  </p>
                </div>
              </div>

              {selectedFeature.description && (
                <div className="rounded-lg p-3" style={{ backgroundColor: '#F0F2F9' }}>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#1B1E4A]">Detalle</p>
                  <div
                    className="text-sm leading-relaxed text-gray-700"
                    dangerouslySetInnerHTML={{ __html: sanitizeDescription(selectedFeature.description) }}
                  />
                </div>
              )}

            </div>
          </div>
        )}
      </div>
      
      {/* Información de datos cargados */}
      {visibleItemsCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">
                📁 {visibleItemsCount} elementos visibles desde permUso.kmz
              </p>
              <p className="text-xs text-blue-600">
                Método: {kmlMethod === 'direct' ? 'Lectura directa con filtros y geometrías' : 'Google KMZ Layer'}
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
    </div>
  )
}
