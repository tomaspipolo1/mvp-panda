import { NOTICIAS } from "@/lib/noticias-data"
import NoticiaDetalleClient from "./noticia-detalle-client"

export function generateStaticParams() {
  return NOTICIAS.map((n) => ({ id: n.id }))
}

export default function NoticiaDetallePage() {
  return <NoticiaDetalleClient />
}
