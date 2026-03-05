import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecuperarContrasenaForm } from "@/components/recuperar-contrasena-form"
import { AuthCard } from "@/components/auth-card"

export default function RecuperarContrasenaPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E3E3E3' }}>
      {/* Header */}
      <Header />

      {/* Contenido principal con padding-top para el header fijo */}
      <main className="pt-[var(--header-height,80px)] min-h-[calc(100vh-var(--header-height,80px))] flex items-center justify-center px-4 py-12">
        <AuthCard imageSrc="/LOGIN.JPG" imageAlt="Puerto La Plata">
          <RecuperarContrasenaForm />
        </AuthCard>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
