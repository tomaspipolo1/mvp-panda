import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"
import { AuthCard } from "@/components/auth-card"

export default function LoginPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E3E3E3' }}>
      {/* Header */}
      <Header />

      {/* Contenido principal con padding-top para el header fijo */}
      <main className="pt-[var(--header-height,80px)] min-h-[calc(100vh-var(--header-height,80px))] flex items-center justify-center px-4 py-12">
        <AuthCard imageSrc="/login.jpg" imageAlt="Puerto La Plata">
          <LoginForm />
        </AuthCard>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
