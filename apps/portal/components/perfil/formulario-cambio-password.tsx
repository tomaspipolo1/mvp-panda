"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function FormularioCambioPassword() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    form: "",
  })

  // Requisitos de contraseña
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  })

  // Actualizar validación de requisitos cuando cambia la contraseña
  useEffect(() => {
    setPasswordRequirements({
      minLength: formData.newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(formData.newPassword),
      hasLowercase: /[a-z]/.test(formData.newPassword),
      hasNumber: /[0-9]/.test(formData.newPassword),
      hasSpecial: /[@#$%^&*()~|<>]/.test(formData.newPassword),
    })
  }, [formData.newPassword])

  // Verificar si todos los requisitos se cumplen
  const allRequirementsMet = Object.values(passwordRequirements).every((req) => req)

  // Verificar si el formulario es válido
  const isFormValid = () => {
    return (
      formData.currentPassword.trim() !== "" &&
      formData.newPassword.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.newPassword === formData.confirmPassword &&
      allRequirementsMet &&
      formData.currentPassword !== formData.newPassword
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar errores específicos al cambiar un campo
    setErrors((prev) => ({ ...prev, [name]: "", form: "" }))

    // Validar confirmación de contraseña
    if (name === "confirmPassword" || name === "newPassword") {
      if (name === "confirmPassword" && value !== formData.newPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }))
      } else if (name === "newPassword" && formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }))
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }))
      }
    }

    // Validar que la nueva contraseña sea diferente a la actual
    if (
      (name === "newPassword" && value === formData.currentPassword) ||
      (name === "currentPassword" && value === formData.newPassword)
    ) {
      setErrors((prev) => ({
        ...prev,
        newPassword: "La nueva contraseña debe ser diferente a la actual",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones finales
    let formIsValid = true
    const newErrors = { ...errors }

    if (!formData.currentPassword) {
      newErrors.currentPassword = "La contraseña actual es requerida"
      formIsValid = false
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "La nueva contraseña es requerida"
      formIsValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la nueva contraseña"
      formIsValid = false
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
      formIsValid = false
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "La nueva contraseña debe ser diferente a la actual"
      formIsValid = false
    }

    if (!allRequirementsMet) {
      newErrors.newPassword = "La contraseña no cumple con todos los requisitos"
      formIsValid = false
    }

    setErrors(newErrors)

    if (!formIsValid) return

    // Simulación de envío
    setIsSubmitting(true)

    try {
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Éxito
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente",
        variant: "default",
      })

      // Limpiar formulario
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: "Ocurrió un error al cambiar la contraseña. Inténtalo de nuevo.",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Renderizar indicador de requisito
  const RequirementIndicator = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
      <span className={met ? "text-green-700" : "text-gray-600"}>{text}</span>
    </div>
  )

  const botonAzulClase =
    "flex items-center justify-center gap-2 bg-[#002060] hover:bg-[#001845] text-white font-medium py-2 px-4 rounded-md shadow transition-colors"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contraseña actual */}
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña actual
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.currentPassword ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Ingresa tu contraseña actual"
        />
        {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
      </div>

      {/* Nueva contraseña */}
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Nueva contraseña
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.newPassword ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Ingresa tu nueva contraseña"
        />
        {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
      </div>

      {/* Confirmar nueva contraseña */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar nueva contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Confirma tu nueva contraseña"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      {/* Requisitos de contraseña */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">La contraseña debe tener:</h3>
        <div className="space-y-2">
          <RequirementIndicator met={passwordRequirements.minLength} text="Al menos 8 caracteres" />
          <RequirementIndicator met={passwordRequirements.hasUppercase} text="Una letra mayúscula" />
          <RequirementIndicator met={passwordRequirements.hasLowercase} text="Una letra minúscula" />
          <RequirementIndicator met={passwordRequirements.hasNumber} text="Un número" />
          <RequirementIndicator met={passwordRequirements.hasSpecial} text="Un carácter especial (@#$%^&*()~|<>)" />
        </div>
      </div>

      {/* Error general del formulario */}
      {errors.form && (
        <div className="bg-red-50 p-3 rounded-md">
          <p className="text-sm text-red-600">{errors.form}</p>
        </div>
      )}

      {/* Botón de envío */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className={`${botonAzulClase} ${!isFormValid() || isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Cambiando contraseña..." : "Cambiar contraseña"}
        </button>
      </div>
    </form>
  )
}
