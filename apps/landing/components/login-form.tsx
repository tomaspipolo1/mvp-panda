"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "./auth-context"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor complete todos los campos")
      return
    }

    try {
      setIsLoading(true)
      // Simulamos un delay para mostrar el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Llamamos a la función login del contexto de autenticación
      login()

      // Redirigimos al usuario a la página principal
      router.push("/")
    } catch (err) {
      setError("Error al iniciar sesión. Por favor intente nuevamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Logo y título */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <img src="/logo-plp.png" alt="PLP Logo" className="h-16" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ingresar al sistema</h1>
        <p className="text-gray-600 text-sm">Acceda a su cuenta del Puerto La Plata</p>
      </div>

      <div>
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@ejemplo.com"
                className="pl-10 bg-white border-gray-300"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresar contraseña"
                className="pl-10 bg-white border-gray-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="radio"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>
            <Link href="/recuperar-contrasena" className="text-sm text-blue-600 hover:text-blue-800">
              ¿Olvidó su contraseña?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-[#1B1E4A] hover:bg-[#272C5B] text-white " disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Ingresar"}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500">o continuar con</span>
            </div>
          </div>

          <Button type="button" className="w-full bg-gray-600 hover:bg-gray-700 text-white  " asChild>
            <Link href="/registro">Crear nueva cuenta</Link>
          </Button>
        </form>
      </div>
    </div>
  )
}
