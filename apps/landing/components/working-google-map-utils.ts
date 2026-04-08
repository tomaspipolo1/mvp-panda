import { icon, type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faAnchor,
  faBuilding,
  faPersonMilitaryPointing,
  faRectangleAd,
} from '@fortawesome/free-solid-svg-icons'
import {
  ALL_MAP_FILTERS,
  DEFAULT_ACTIVE_FILTERS,
  MAP_FILTERS,
  MAP_FILTER_COLORS,
  type MapFilterId,
  type MapFilterItemOption,
} from '@/components/map-filter-config'

export const KMZ_PATH = '/permUso.kmz'
export const DEFAULT_FILTERS = DEFAULT_ACTIVE_FILTERS
export const ALL_FILTER_IDS = ALL_MAP_FILTERS
export const INSTITUTIONAL_BLUE = '#1B1E4A'
export const DEFAULT_MAP_CENTER = { lat: -34.857447, lng: -57.880088 }
export const DEFAULT_MAP_ZOOM = 14.3

export const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#eef2f6' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#d6dde8' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#c7d2df' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#708099' }] },
  { featureType: 'landscape.man_made', stylers: [{ color: '#f2f6ef' }] },
  { featureType: 'landscape.natural', stylers: [{ color: '#d7f0db' }] },
  { featureType: 'landscape.natural.terrain', stylers: [{ color: '#d7f0db' }] },
  { featureType: 'landscape.natural', elementType: 'labels.text.fill', stylers: [{ color: '#7d9787' }] },
  { featureType: 'landscape.natural', elementType: 'labels.text.stroke', stylers: [{ color: '#eef8f0' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#d7f0db' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#7d9787' }] },
  { featureType: 'poi.park', elementType: 'labels.text.stroke', stylers: [{ color: '#eef8f0' }] },
  { featureType: 'water', stylers: [{ color: '#a9dff2' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#6b87a2' }] },
  { featureType: 'all', elementType: 'labels.text.stroke', stylers: [{ color: '#f8fafc' }] },
]

export type GeometryType = 'point' | 'line' | 'polygon'
export type MarkerIconType = 'person' | 'anchor' | 'building' | 'billboard'
export type DotMarkerSize = 'default' | 'compact'
export type ArrendamientoAvailability =
  | Partial<Record<string, boolean>>
  | ((arrendamientoCode: string) => boolean | undefined)

export type ParsedFeature = {
  id: string
  name: string
  description: string
  category: MapFilterId | 'OTHER'
  sourceGroup: string
  geometryType: GeometryType
  points: google.maps.LatLngLiteral[]
  rings?: google.maps.LatLngLiteral[][]
}

export type MapOverlay =
  | google.maps.Marker
  | google.maps.Polyline
  | google.maps.Polygon
  | google.maps.Circle

export type SelectedFeatureDetails = {
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

export const CATEGORY_STYLES: Record<
  MapFilterId,
  {
    strokeColor: string
    selectedStrokeColor: string
    fillColor: string
    badgeColor: string
    iconType?: MarkerIconType
    pointIconType?: MarkerIconType
  }
> = {
  ST: { ...MAP_FILTER_COLORS.ST, selectedStrokeColor: '#1d4ed8', pointIconType: 'anchor' },
  AC: { ...MAP_FILTER_COLORS.AC, selectedStrokeColor: '#b45309', iconType: 'person' },
  AR: { ...MAP_FILTER_COLORS.AR, selectedStrokeColor: '#166534' },
  BA: { ...MAP_FILTER_COLORS.BA, selectedStrokeColor: '#b91c1c' },
  PR: { ...MAP_FILTER_COLORS.PR, selectedStrokeColor: '#475569' },
  EJ: { ...MAP_FILTER_COLORS.EJ, selectedStrokeColor: '#6d28d9' },
  ED: { ...MAP_FILTER_COLORS.ED, strokeColor: '#8b5cf6', selectedStrokeColor: '#6d28d9', iconType: 'building' },
  FF: { ...MAP_FILTER_COLORS.FF, selectedStrokeColor: '#1e293b' },
}

const MARKER_ICON_DEFINITIONS: Record<MarkerIconType, IconDefinition> = {
  person: faPersonMilitaryPointing,
  anchor: faAnchor,
  building: faBuilding,
  billboard: faRectangleAd,
}

export const COMPACT_AR_POINT_CODES = new Set(['AR-30', 'AR-31', 'AR-49', 'AR-92'])

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

export function extractCategoryId(folderName: string, placemarkName: string): MapFilterId | 'OTHER' {
  const candidates = [folderName, placemarkName].map((value) => value.trim().toUpperCase())

  for (const candidate of candidates) {
    if (candidate === 'SI' || candidate.startsWith('SI-')) {
      return 'ST'
    }

    const match = ALL_FILTER_IDS.find((filterId) => candidate === filterId || candidate.startsWith(`${filterId}-`))
    if (match) {
      return match
    }
  }

  return 'OTHER'
}

export function getGeometryCenter(feature: ParsedFeature): google.maps.LatLngLiteral {
  const sourcePoints =
    feature.geometryType === 'polygon' && feature.rings?.[0]?.length ? feature.rings[0] : feature.points

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

export function sanitizeDescription(description: string) {
  return description.replace(/<BR\s*\/?>/gi, '<br />')
}

function isTechnicalFeatureCode(value: string) {
  return /^[A-Z]{2}(?:-\d+)+(?:-\d+)*$/i.test(value.trim())
}

function isGeneratedFallbackName(value: string) {
  return /^Elemento\s+\d+$/i.test(value.trim())
}

export function getCatalogLabel(description: string, fallbackName: string) {
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

export function getFeatureItemKey(feature: ParsedFeature) {
  return `${feature.category}:${feature.name}`
}

export function buildGeometryFamilyMap(features: ParsedFeature[]) {
  const geometryMap = new Map<string, Set<GeometryType>>()

  features.forEach((feature) => {
    const itemKey = getFeatureItemKey(feature)
    const families = geometryMap.get(itemKey) || new Set<GeometryType>()
    families.add(feature.geometryType)
    geometryMap.set(itemKey, families)
  })

  return geometryMap
}

function projectPoint(point: google.maps.LatLngLiteral, referenceLat: number) {
  const lngScale = Math.cos((referenceLat * Math.PI) / 180)
  return {
    x: point.lng * lngScale,
    y: point.lat,
  }
}

function getSegmentDistanceMeters(
  point: google.maps.LatLngLiteral,
  start: google.maps.LatLngLiteral,
  end: google.maps.LatLngLiteral,
) {
  const referenceLat = point.lat
  const projectedPoint = projectPoint(point, referenceLat)
  const projectedStart = projectPoint(start, referenceLat)
  const projectedEnd = projectPoint(end, referenceLat)
  const deltaX = projectedEnd.x - projectedStart.x
  const deltaY = projectedEnd.y - projectedStart.y
  const segmentLengthSquared = deltaX * deltaX + deltaY * deltaY

  if (segmentLengthSquared < 1e-12) {
    return Math.hypot(projectedPoint.x - projectedStart.x, projectedPoint.y - projectedStart.y) * 111_320
  }

  const projection =
    ((projectedPoint.x - projectedStart.x) * deltaX + (projectedPoint.y - projectedStart.y) * deltaY) /
    segmentLengthSquared
  const clamped = Math.max(0, Math.min(1, projection))
  const closestX = projectedStart.x + clamped * deltaX
  const closestY = projectedStart.y + clamped * deltaY

  return Math.hypot(projectedPoint.x - closestX, projectedPoint.y - closestY) * 111_320
}

function getLineLengthMeters(points: google.maps.LatLngLiteral[]) {
  if (points.length < 2) return 0

  let total = 0

  for (let index = 0; index < points.length - 1; index += 1) {
    const start = projectPoint(points[index], points[index].lat)
    const end = projectPoint(points[index + 1], points[index].lat)
    total += Math.hypot(end.x - start.x, end.y - start.y) * 111_320
  }

  return total
}

function getDistanceToLineMeters(point: google.maps.LatLngLiteral, line: google.maps.LatLngLiteral[]) {
  if (line.length < 2) return Number.POSITIVE_INFINITY

  let bestDistance = Number.POSITIVE_INFINITY

  for (let index = 0; index < line.length - 1; index += 1) {
    const distance = getSegmentDistanceMeters(point, line[index], line[index + 1])
    if (distance < bestDistance) {
      bestDistance = distance
    }
  }

  return bestDistance
}

export function derivePrLineFeatures(features: ParsedFeature[]) {
  const derivedFeatures: ParsedFeature[] = []
  const usedLineIds = new Set<string>()
  const prPoints = features.filter(
    (feature) => feature.category === 'PR' && feature.geometryType === 'point' && feature.points.length > 0,
  )
  const candidateLines = features.filter(
    (feature) => feature.category === 'OTHER' && feature.geometryType === 'line' && feature.points.length >= 2,
  )

  prPoints.forEach((prPoint) => {
    const bestLine = candidateLines
      .filter((candidate) => !usedLineIds.has(candidate.id))
      .map((candidate) => {
        const lengthMeters = getLineLengthMeters(candidate.points)
        const distanceMeters = getDistanceToLineMeters(prPoint.points[0], candidate.points)

        return { candidate, lengthMeters, distanceMeters }
      })
      .filter(
        ({ lengthMeters, distanceMeters }) =>
          lengthMeters >= 20 && lengthMeters <= 120 && distanceMeters <= 35,
      )
      .sort((a, b) => a.distanceMeters - b.distanceMeters || b.lengthMeters - a.lengthMeters)[0]

    if (!bestLine) {
      return
    }

    usedLineIds.add(bestLine.candidate.id)
    derivedFeatures.push({
      ...bestLine.candidate,
      id: `${bestLine.candidate.id}-pr`,
      name: prPoint.name,
      description: prPoint.description,
      category: 'PR',
      sourceGroup: prPoint.sourceGroup,
    })
  })

  return derivedFeatures
}

function getArrendamientoCodeCandidates(feature: ParsedFeature) {
  const candidates = [
    feature.name,
    feature.sourceGroup,
    feature.name.split('-').slice(0, 2).join('-'),
  ].filter(Boolean)

  return Array.from(new Set(candidates))
}

export function getArrendamientoAvailabilityStatus(
  feature: ParsedFeature,
  availability?: ArrendamientoAvailability,
): boolean | undefined {
  if (feature.category !== 'AR' || !availability) {
    return undefined
  }

  const candidates = getArrendamientoCodeCandidates(feature)

  if (typeof availability === 'function') {
    for (const candidate of candidates) {
      const result = availability(candidate)
      if (typeof result === 'boolean') {
        return result
      }
    }
    return undefined
  }

  for (const candidate of candidates) {
    const result = availability[candidate]
    if (typeof result === 'boolean') {
      return result
    }
  }

  return undefined
}

export function buildCatalog(features: ParsedFeature[]): Partial<Record<MapFilterId, MapFilterItemOption[]>> {
  const catalog: Partial<Record<MapFilterId, MapFilterItemOption[]>> = {}

  ALL_FILTER_IDS.forEach((category) => {
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

export function shouldRenderFeature(feature: ParsedFeature, geometryFamilies = new Set<GeometryType>()) {
  switch (feature.category) {
    case 'ST':
      return feature.geometryType === 'point' || feature.geometryType === 'line'
    case 'AC':
      return feature.geometryType === 'point'
    case 'AR':
      if (feature.geometryType !== 'point') return feature.geometryType === 'polygon' || feature.geometryType === 'line'
      return !geometryFamilies.has('polygon') && !geometryFamilies.has('line')
    case 'BA':
      return feature.geometryType === 'point'
    case 'PR':
      return feature.geometryType === 'point' || feature.geometryType === 'line'
    case 'EJ':
      return feature.geometryType === 'line'
    case 'ED':
      return feature.geometryType === 'point'
    case 'FF':
      return feature.geometryType === 'line'
    default:
      return false
  }
}

function matchesBalizaCode(code: string, suffix: 'VV' | 'VR') {
  return new RegExp(`^B_[A-Z0-9]+_${suffix}$`, 'i').test(code.trim())
}

export function getBalizaColor(feature: ParsedFeature) {
  const candidates = [feature.name, feature.sourceGroup]

  if (candidates.some((candidate) => matchesBalizaCode(candidate, 'VV'))) {
    return '#16a34a'
  }

  if (candidates.some((candidate) => matchesBalizaCode(candidate, 'VR'))) {
    return '#dc2626'
  }

  return null
}

export function createDotSvg(color: string, isSelected = false, size: DotMarkerSize = 'default') {
  const isCompact = size === 'compact'
  const outerStroke = color
  const innerFill = color
  const innerRadius = isCompact ? (isSelected ? 4.6 : 3.8) : (isSelected ? 6.2 : 5.2)
  const outerRadius = isCompact ? (isSelected ? 7.4 : 6.6) : (isSelected ? 10.5 : 9.2)
  const glow = isSelected ? 0.34 : 0.2
  const strokeWidth = isCompact ? (isSelected ? 2.1 : 1.4) : (isSelected ? 3 : 2.4)
  const markerSize = isCompact ? 26 : 34
  const markerCenter = markerSize / 2

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="${markerSize}" height="${markerSize}" viewBox="0 0 ${markerSize} ${markerSize}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="0" y="0" width="${markerSize}" height="${markerSize}" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#0f172a" flood-opacity="${glow}" />
          </filter>
        </defs>
        <g filter="url(#shadow)">
          <circle cx="${markerCenter}" cy="${markerCenter}" r="${outerRadius}" fill="white" stroke="${outerStroke}" stroke-width="${strokeWidth}" />
          <circle cx="${markerCenter}" cy="${markerCenter}" r="${innerRadius}" fill="${innerFill}" />
        </g>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(markerSize, markerSize),
    anchor: new window.google.maps.Point(markerCenter, markerCenter),
  }
}

export function createDiamondSvg(color: string, isSelected = false) {
  const markerSize = 20
  const markerCenter = markerSize / 2
  const diamondHalf = isSelected ? 6.6 : 5.8
  const strokeWidth = isSelected ? 2.2 : 1.5

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="${markerSize}" height="${markerSize}" viewBox="0 0 ${markerSize} ${markerSize}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="0" y="0" width="${markerSize}" height="${markerSize}" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.8" flood-color="#0f172a" flood-opacity="${isSelected ? 0.34 : 0.2}" />
          </filter>
        </defs>
        <g filter="url(#shadow)">
          <path
            d="M ${markerCenter} ${markerCenter - diamondHalf} L ${markerCenter + diamondHalf} ${markerCenter} L ${markerCenter} ${markerCenter + diamondHalf} L ${markerCenter - diamondHalf} ${markerCenter} Z"
            fill="${color}"
            stroke="#ffffff"
            stroke-width="${strokeWidth}"
          />
        </g>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(markerSize, markerSize),
    anchor: new window.google.maps.Point(markerCenter, markerCenter),
  }
}

export function createMarkerSvg(iconType: MarkerIconType, color: string, isSelected = false) {
  const markerSize = 24
  const markerCenter = markerSize / 2
  const strokeWidth = isSelected ? 2 : 1.2
  const radius = 10
  const fontAwesomeSvg = icon(MARKER_ICON_DEFINITIONS[iconType], {
    styles: { color },
    attributes: {
      x: iconType === 'person' ? '5.5' : '6.5',
      y: iconType === 'person' ? '5.5' : '6.5',
      width: iconType === 'person' ? '13' : '11',
      height: iconType === 'person' ? '13' : '11',
    },
  }).html.join('')

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="${markerSize}" height="${markerSize}" viewBox="0 0 ${markerSize} ${markerSize}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="0" y="0" width="${markerSize}" height="${markerSize}" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#0f172a" flood-opacity="${isSelected ? 0.34 : 0.2}" />
          </filter>
        </defs>
        <g filter="url(#shadow)">
          <circle cx="${markerCenter}" cy="${markerCenter}" r="${radius}" fill="white" stroke="${color}" stroke-width="${strokeWidth}"/>
          ${fontAwesomeSvg}
        </g>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(markerSize, markerSize),
    anchor: new window.google.maps.Point(markerCenter, markerCenter),
  }
}

export function createReferenceLabelSvg(label: string, isSelected = false) {
  const safeLabel = label.trim() || 'Referencia'
  const textLength = safeLabel.length
  const width = Math.max(86, Math.min(136, 26 + textLength * 6.4))
  const height = 24
  const strokeColor = isSelected ? '#334155' : '#94a3b8'

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="0" y="0" width="${width}" height="${height}" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#0f172a" flood-opacity="${isSelected ? 0.26 : 0.18}" />
          </filter>
        </defs>
        <g filter="url(#shadow)">
          <rect x="1.5" y="1.5" width="${width - 3}" height="16" rx="8" fill="#ffffff" stroke="${strokeColor}" stroke-width="1.5" />
          <circle cx="12" cy="9" r="2.8" fill="#d8b15d" />
          <text x="22" y="12" fill="#58789b" font-family="Arial, sans-serif" font-size="8.6" font-weight="700">${safeLabel}</text>
        </g>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(width, height),
    anchor: new window.google.maps.Point(width / 2, height / 2),
  }
}

export function parseKML(kmlContent: string): ParsedFeature[] {
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
    Array.from(xmlDoc.getElementsByTagName('Placemark')).forEach((placemark) =>
      parsePlacemark(placemark, 'GENERAL'),
    )
  }

  return parsedFeatures
}
