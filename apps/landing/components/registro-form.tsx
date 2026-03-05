"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from "./auth-context"
import { Eye, EyeOff, User, Mail, Lock, Phone, CalendarIcon, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export function RegistroForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    confirmPassword: "",
    dni: "",
    telefono: "",
  })
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>(undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error del campo cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar campos obligatorios
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio"
    if (!formData.apellido) newErrors.apellido = "El apellido es obligatorio"
    if (!formData.correo) newErrors.correo = "El correo es obligatorio"
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = "Correo electrónico inválido"
    if (!formData.password) newErrors.password = "La contraseña es obligatoria"
    else if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Debe confirmar la contraseña"
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden"
    if (!formData.dni) newErrors.dni = "El DNI es obligatorio"
    if (!formData.telefono) newErrors.telefono = "El teléfono es obligatorio"
    if (!fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria"
    if (!aceptaTerminos) newErrors.aceptaTerminos = "Debe aceptar los términos y condiciones"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsLoading(true)
      // Simulamos un delay para mostrar el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Llamamos a la función login del contexto de autenticación
      login()

      // Redirigimos al usuario a la página principal
      router.push("/")
    } catch (err) {
      setErrors({ general: "Error al registrar usuario. Por favor intente nuevamente." })
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Crear nuevo usuario</h1>
        <p className="text-gray-600 text-sm">Complete el formulario para crear una cuenta nueva en Puerto La Plata</p>
      </div>

      <div>
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Row 1: Nombre y Apellido */}
            <div className="space-y-2">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre"
                  className={`pl-10 bg-white border-gray-300 ${errors.nombre ? "border-red-500" : ""}`}
                />
              </div>
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese su apellido"
                  className={`pl-10 bg-white border-gray-300 ${errors.apellido ? "border-red-500" : ""}`}
                />
              </div>
              {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
            </div>

            {/* Row 2: DNI y Fecha de Nacimiento */}
            <div className="space-y-2">
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                DNI
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="Ingrese su DNI"
                  className={`pl-10 bg-white border-gray-300 ${errors.dni ? "border-red-500" : ""}`}
                />
              </div>
              {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                Fecha de nacimiento
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full h-10 pl-10 pr-3 text-left border rounded-md bg-white border-gray-300 relative",
                      !fechaNacimiento && "text-gray-400",
                      errors.fechaNacimiento && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    {fechaNacimiento ? (
                      format(fechaNacimiento, "dd/MM/yyyy", { locale: es })
                    ) : (
                      <span>Seleccione fecha</span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    onChange={(value) => setFechaNacimiento(value as Date)}
                    value={fechaNacimiento}
                    maxDate={new Date()}
                    minDate={new Date("1900-01-01")}
                    locale="es"
                  />
                </PopoverContent>
              </Popover>
              {errors.fechaNacimiento && <p className="text-red-500 text-xs mt-1">{errors.fechaNacimiento}</p>}
            </div>

            {/* Row 3: Email y Teléfono */}
            <div className="space-y-2">
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  className={`pl-10 bg-white border-gray-300 ${errors.correo ? "border-red-500" : ""}`}
                />
              </div>
              {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ingrese su teléfono"
                  className={`pl-10 bg-white border-gray-300 ${errors.telefono ? "border-red-500" : ""}`}
                />
              </div>
              {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
            </div>

            {/* Row 4: Contraseña y Confirmar Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingrese contraseña"
                  className={`pl-10 bg-white border-gray-300 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme su contraseña"
                  className={`pl-10 bg-white border-gray-300 ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Términos y Condiciones */}
          <div className="flex items-center">
            <Checkbox
              id="terminos"
              checked={aceptaTerminos}
              onCheckedChange={(checked) => setAceptaTerminos(checked as boolean)}
              className={errors.aceptaTerminos ? "border-red-500" : ""}
            />
            <label htmlFor="terminos" className="ml-2 text-sm text-gray-700">
              Acepto los términos y condiciones
            </label>
            {errors.aceptaTerminos && <p className="text-red-500 text-xs ml-2">{errors.aceptaTerminos}</p>}
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <Button
              type="button"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
              asChild
            >
              <Link href="/login">Usar cuenta existente</Link>
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#1B1E4A] hover:bg-[#272C5B] text-white "
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Crear cuenta nueva"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
