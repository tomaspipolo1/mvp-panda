import EventoDetalleClient from "./evento-detalle-client"

const EVENT_IDS = ["1", "2", "3", "4", "5"] as const

export function generateStaticParams() {
  return EVENT_IDS.map((id) => ({ id }))
}

export default function DetalleEventoPage() {
  return <EventoDetalleClient />
}
