import type { ReactNode } from 'react'
import { Layers3, MapPin, Tag, X } from 'lucide-react'
import {
  INSTITUTIONAL_BLUE,
  sanitizeDescription,
  type SelectedFeatureDetails,
} from '@/components/working-google-map-utils'

type SelectionPanelProps = {
  directionsUrl: string | null
  onClose: () => void
  selectedFeature: SelectedFeatureDetails
}

type DetailCardProps = {
  children: ReactNode
  icon: ReactNode
  title: string
}

function DetailCard({ children, icon, title }: DetailCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 shadow-sm" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="rounded-xl p-2" style={{ backgroundColor: '#E0EEFF' }}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#1B1E4A]">{title}</p>
        {children}
      </div>
    </div>
  )
}

export function DesktopSelectionPanel({
  directionsUrl,
  onClose,
  selectedFeature,
}: SelectionPanelProps) {
  return (
    <div className="absolute left-0 top-0 z-10 hidden h-full w-[360px] overflow-y-auto border-r border-slate-200 bg-white shadow-2xl md:block">
      <div
        className="flex items-start justify-between border-b border-white/40 p-4 pb-3"
        style={{ backgroundColor: '#CAE6FF' }}
      >
        <div className="pr-4">
          <span
            className="mb-2 inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{
              color: INSTITUTIONAL_BLUE,
              borderColor: '#1B1E4A33',
              backgroundColor: '#FFFFFF',
            }}
          >
            {selectedFeature.categoryLabel}
          </span>
          <h3 className="text-xl font-bold text-[#1B1E4A]">{selectedFeature.label}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-[#1B1E4A] transition-colors hover:bg-white/50"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3 p-4 pt-3">
        <DetailCard icon={<Tag className="h-5 w-5 text-[#1B1E4A]" />} title="Código">
          <p className="text-sm font-medium text-gray-700">{selectedFeature.code}</p>
        </DetailCard>

        <DetailCard icon={<Layers3 className="h-5 w-5 text-[#1B1E4A]" />} title="Grupo">
          <p className="text-sm text-gray-700">{selectedFeature.sourceGroup}</p>
        </DetailCard>

        <DetailCard icon={<MapPin className="h-5 w-5 text-[#1B1E4A]" />} title="Ubicación">
          <p className="text-sm text-gray-700">
            {selectedFeature.position.lat.toFixed(6)}, {selectedFeature.position.lng.toFixed(6)}
          </p>
        </DetailCard>

        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center rounded-xl bg-[#1B1E4A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A2F6B]"
          >
            Ver en Google Maps
          </a>
        )}

        {selectedFeature.description && (
          <div className="rounded-xl border border-slate-200 p-3 shadow-sm" style={{ backgroundColor: '#F8FAFC' }}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#1B1E4A]">Detalle</p>
            <div
              className="text-sm leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ __html: sanitizeDescription(selectedFeature.description) }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export function MobileSelectionPanel({
  directionsUrl,
  onClose,
  selectedFeature,
}: SelectionPanelProps) {
  return (
    <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-sm md:hidden">
      <div className="flex items-start justify-between border-b border-slate-200 px-4 py-3">
        <div className="pr-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Name</p>
          <h3 className="text-base font-bold text-[#1B1E4A]">{selectedFeature.label}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-[#1B1E4A] transition-colors hover:bg-slate-100"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3 px-4 py-3">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Tipo</p>
          <p className="text-sm font-medium text-slate-800">{selectedFeature.categoryLabel}</p>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Detalle</p>
          <div
            className="text-sm leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{
              __html: sanitizeDescription(selectedFeature.description || selectedFeature.code),
            }}
          />
        </div>

        {directionsUrl ? (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center rounded-xl bg-[#1B1E4A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A2F6B]"
          >
            Como llegar
          </a>
        ) : (
          <div className="flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400">
            Como llegar
          </div>
        )}
      </div>
    </div>
  )
}
