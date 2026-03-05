"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { toPortalPath } from "@/lib/portal-path"

export default function Home() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState("Empleado - Prensa")

  const handleUserTypeChange = (userType: string) => {
    setCurrentUser(userType)

    switch (userType) {
      case "Empleado - Contable":
        router.push(toPortalPath("/empleado-contable"))
        break
      default:
        router.push(toPortalPath("/empleado-prensa"))
    }
  }

  // En MVP, el acceso inicial del portal es Prensa.
  useEffect(() => {
    router.push(toPortalPath("/empleado-prensa"))
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-plp-lightest">
      <Header currentUser={currentUser} onUserTypeChange={handleUserTypeChange} />
      <div className="flex flex-1">
        <Sidebar userType={currentUser} />
        <main className="flex-1">{/* El contenido se renderizará en las páginas específicas */}</main>
      </div>
    </div>
  )
}
