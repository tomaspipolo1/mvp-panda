import NuevoClienteClientPage from "./NuevoClienteClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nuevo Cliente | Portal PLP",
  description: "Formulario para crear un nuevo cliente",
}

export default function NuevoClientePage() {
  return <NuevoClienteClientPage />
}
