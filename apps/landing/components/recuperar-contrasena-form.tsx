"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "./auth-context"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

type Step = "email" | "code" | "newPassword"

export function RecuperarContrasenaForm() {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { login } = useAuth()

  // Paso 1: Enviar email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Por favor ingrese su correo electrónico")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Correo electrónico inválido")
      return
    }

    try {
      setIsLoading(true)
      // Simulamos el envío del código
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep("code")
    } catch (err) {
      setError("Error al enviar el código. Por favor intente nuevamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Paso 2: Verificar código
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!code) {
      setError("Por favor ingrese el código")
      return
    }

    try {
      setIsLoading(true)
      // Simulamos la verificación del código
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep("newPassword")
    } catch (err) {
      setError("Código inválido. Por favor intente nuevamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Paso 3: Crear nueva contraseña
  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!newPassword || !confirmPassword) {
      setError("Por favor complete todos los campos")
      return
    }

    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      setIsLoading(true)
      // Simulamos el cambio de contraseña
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Logueamos al usuario y redirigimos
      login()
      router.push("/")
    } catch (err) {
      setError("Error al cambiar la contraseña. Por favor intente nuevamente.")
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
        {step === "email" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Olvidé mi clave</h1>
            <p className="text-gray-600 text-sm">Puede recuperar su clave ingresando su correo</p>
          </>
        )}
        {step === "code" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Recuperar clave</h1>
            <p className="text-gray-600 text-sm">Ingrese el código enviado a su correo</p>
          </>
        )}
        {step === "newPassword" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Nueva clave</h1>
            <p className="text-gray-600 text-sm">Cree una nueva clave para su cuenta</p>
          </>
        )}
      </div>

      <div>
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        {/* Paso 1: Ingresar email */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
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

            <Button type="submit" className="w-full bg-[#1B1E4A] hover:bg-[#272C5B] text-white" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        )}

        {/* Paso 2: Ingresar código */}
        {step === "code" && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Código
              </label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingrese el código"
                className="bg-white border-gray-300"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#1B1E4A] hover:bg-[#272C5B] text-white" disabled={isLoading}>
              {isLoading ? "Verificando..." : "Crear nueva clave"}
            </Button>
          </form>
        )}

        {/* Paso 3: Crear nueva contraseña */}
        {step === "newPassword" && (
          <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email-display" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email-display"
                type="email"
                value={email}
                disabled
                className="bg-white border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ingrese su contraseña nuevamente"
                  className="pl-10 bg-white border-gray-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#1B1E4A] hover:bg-[#272C5B] text-white" disabled={isLoading}>
              {isLoading ? "Procesando..." : "Ingresar al sistema"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
