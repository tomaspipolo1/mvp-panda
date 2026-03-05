"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function FormularioCambioPasswordCliente() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validaciones de contraseña
  const hasMinLength = formData.newPassword.length >= 8
  const hasUpperCase = /[A-Z]/.test(formData.newPassword)
  const hasLowerCase = /[a-z]/.test(formData.newPassword)
  const hasNumber = /\d/.test(formData.newPassword)
  const hasSpecialChar = /[@#$%^&*()-<>]/.test(formData.newPassword)
  const passwordsMatch = formData.newPassword === formData.confirmPassword

  const isFormValid =
    formData.currentPassword &&
    formData.newPassword &&
    formData.confirmPassword &&
    hasMinLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar &&
    passwordsMatch

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    setIsSubmitting(true)

    // Simulación de envío al servidor
    try {
      // Aquí iría la llamada a la API para cambiar la contraseña
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente.",
      })

      // Resetear el formulario
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la contraseña. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="block text-sm font-medium">
              Contraseña actual
            </label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña actual"
                value={formData.currentPassword}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium">
              Nueva contraseña
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Ingresa tu nueva contraseña"
                value={formData.newPassword}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirmar nueva contraseña
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirma tu nueva contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm font-medium mb-2">La contraseña debe tener:</p>
            <ul className="space-y-1">
              <li className="flex items-center text-sm">
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${hasMinLength ? "bg-green-500" : "bg-red-500"}`}
                >
                  <span className="text-white text-xs">•</span>
                </span>
                Al menos 8 caracteres
              </li>
              <li className="flex items-center text-sm">
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${hasUpperCase ? "bg-green-500" : "bg-red-500"}`}
                >
                  <span className="text-white text-xs">•</span>
                </span>
                Una letra mayúscula
              </li>
              <li className="flex items-center text-sm">
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${hasLowerCase ? "bg-green-500" : "bg-red-500"}`}
                >
                  <span className="text-white text-xs">•</span>
                </span>
                Una letra minúscula
              </li>
              <li className="flex items-center text-sm">
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${hasNumber ? "bg-green-500" : "bg-red-500"}`}
                >
                  <span className="text-white text-xs">•</span>
                </span>
                Un número
              </li>
              <li className="flex items-center text-sm">
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${hasSpecialChar ? "bg-green-500" : "bg-red-500"}`}
                >
                  <span className="text-white text-xs">•</span>
                </span>
                Un carácter especial (@#$%^&*()-&lt;&gt;)
              </li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={!isFormValid || isSubmitting} className="bg-blue-700 hover:bg-blue-800">
              {isSubmitting ? "Cambiando..." : "Cambiar contraseña"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
