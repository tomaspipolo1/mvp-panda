"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const inscriptionSchema = z.object({
  nombre: z.string().min(1, "Requerido"),
  apellido: z.string().min(1, "Requerido"),
  dni: z.string().min(1, "Requerido"),
  telefono: z.string().min(1, "Requerido"),
  fechaNacimiento: z.string().optional(),
  email: z.union([z.string().email("Email inválido"), z.literal("")]).optional(),
})

type InscriptionFormValues = z.infer<typeof inscriptionSchema>

interface EventInscriptionFormProps {
  className?: string
  onSubmit?: (data: InscriptionFormValues) => void
}

export function EventInscriptionForm({ className, onSubmit }: EventInscriptionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InscriptionFormValues>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: { nombre: "", apellido: "", email: "", dni: "", fechaNacimiento: "", telefono: "" },
  })

  const handleFormSubmit = (data: InscriptionFormValues) => {
    onSubmit?.(data)
  }

  const inputClassName =
    "w-full rounded-lg border border-plp-gray-200 bg-white px-4 py-2.5 text-base shadow-sm placeholder:text-plp-gray-400 focus-visible:ring-2 focus-visible:ring-plp-primary/20 focus-visible:border-plp-primary"

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={cn("w-full max-w-4xl mx-auto", className)}>
      <h3 className="text-2xl font-bold text-plp-primary text-center mb-8">Inscribirme</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Fila 1: Nombre, Apellido */}
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-plp-gray-700">Nombre*</Label>
          <Input
            id="nombre"
            {...register("nombre")}
            className={inputClassName}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="text-xs text-red-600">{errors.nombre.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="apellido" className="text-plp-gray-700">Apellido*</Label>
          <Input
            id="apellido"
            {...register("apellido")}
            className={inputClassName}
            placeholder="Apellido"
          />
          {errors.apellido && (
            <p className="text-xs text-red-600">{errors.apellido.message}</p>
          )}
        </div>
        {/* Fila 2: DNI, Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="dni" className="text-plp-gray-700">DNI*</Label>
          <Input
            id="dni"
            {...register("dni")}
            className={inputClassName}
            placeholder="DNI"
          />
          {errors.dni && (
            <p className="text-xs text-red-600">{errors.dni.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono" className="text-plp-gray-700">Teléfono*</Label>
          <Input
            id="telefono"
            type="tel"
            {...register("telefono")}
            className={inputClassName}
            placeholder="Teléfono"
          />
          {errors.telefono && (
            <p className="text-xs text-red-600">{errors.telefono.message}</p>
          )}
        </div>
        {/* Fila 3: Fecha nacimiento, Email */}
        <div className="space-y-2">
          <Label htmlFor="fechaNacimiento" className="text-plp-gray-700">Fecha de nacimiento</Label>
          <Input
            id="fechaNacimiento"
            type="date"
            {...register("fechaNacimiento")}
            className={inputClassName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-plp-gray-700">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={inputClassName}
            placeholder="email@ejemplo.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button type="submit" className="bg-plp-primary hover:bg-plp-primary/90 text-white px-8">
          Inscribirme
        </Button>
      </div>
    </form>
  )
}
