import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Licitaciones() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#002A5B] to-[#001A3B]">
      {/* Header */}
      <Header />

      {/* Contenido principal con padding-top para el header fijo */}
      <main className="pt-[104px] min-h-[calc(100vh-104px)] flex items-center justify-center px-4">
        <h1 className="text-white text-3xl font-bold">Licitaciones CERRADAS</h1>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}