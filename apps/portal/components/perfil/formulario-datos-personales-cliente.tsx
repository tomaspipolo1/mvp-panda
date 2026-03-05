"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FileText, Save, X, Calendar } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FotoPerfilCliente } from "./foto-perfil-cliente"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Esquema de validación
const formSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  dni: z.string().min(7, "El DNI debe tener al menos 7 caracteres"),
  cuil: z.string().regex(/^\d{2}-\d{8}-\d{1}$/, "El CUIL debe tener el formato XX-XXXXXXXX-X"),
  fechaNacimiento: z.date({
    required_error: "La fecha de nacimiento es requerida",
  }),
  telefonoFijo: z.string().optional(),
  celular: z.string().min(10, "El número de celular debe tener al menos 10 dígitos"),
  emailPrincipal: z.string().email("Debe ser un email válido"),
  emailAlternativo: z.string().email("Debe ser un email válido").optional().or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

// Datos iniciales de ejemplo
const datosIniciales: FormValues = {
  nombre: "Juan",
  apellido: "Pérez",
  dni: "28456789",
  cuil: "20-28456789-3",
  fechaNacimiento: new Date("1980-05-14"),
  telefonoFijo: "01147896543",
  celular: "1165897412",
  emailPrincipal: "juan.perez@empresa.com",
  emailAlternativo: "",
}

export function FormularioDatosPersonalesCliente() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagenPerfil, setImagenPerfil] = useState<File | null>(null)
  const [modoEdicion, setModoEdicion] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: datosIniciales,
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    // Simulamos una petición al servidor
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Datos enviados:", data)
    console.log("Imagen de perfil:", imagenPerfil)

    toast({
      title: "Datos actualizados",
      description: "Tus datos personales han sido actualizados correctamente.",
    })

    setIsSubmitting(false)
    setModoEdicion(false)
  }

  const handleImagenCambiada = (file: File | null) => {
    setImagenPerfil(file)
  }

  const handleCancelar = () => {
    form.reset(datosIniciales)
    setModoEdicion(false)
  }

  // Formatear fecha para mostrar en español
  const formatearFecha = (fecha: Date) => {
    try {
      return format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es })
    } catch (error) {
      return "Fecha inválida"
    }
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Información del Usuario</h3>
        {!modoEdicion && (
          <Button onClick={() => setModoEdicion(true)} className="bg-[#002060] hover:bg-[#001845] text-white">
            <FileText className="h-4 w-4 mr-2" />
            Editar
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Columna de foto de perfil */}
            <div className="flex flex-col items-center">
              {modoEdicion ? (
                <FotoPerfilCliente imagenActual="/mystical-forest-spirit.png" onImagenCambiada={handleImagenCambiada} />
              ) : (
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                  <img src="/mystical-forest-spirit.png" alt="Foto de perfil" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Columna de datos personales */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          {modoEdicion ? (
                            <Input placeholder="Ingrese su nombre" {...field} />
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">{field.value}</div>
                          )}
                        </FormControl>
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apellido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          {modoEdicion ? (
                            <Input placeholder="Ingrese su apellido" {...field} />
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">{field.value}</div>
                          )}
                        </FormControl>
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DNI</FormLabel>
                        <FormControl>
                          {modoEdicion ? (
                            <div className="relative">
                              <Input placeholder="Ingrese su DNI" {...field} disabled className="bg-gray-100" />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">{field.value}</div>
                          )}
                        </FormControl>
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cuil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CUIL</FormLabel>
                        <FormControl>
                          {modoEdicion ? (
                            <div className="relative">
                              <Input placeholder="XX-XXXXXXXX-X" {...field} disabled className="bg-gray-100" />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">{field.value}</div>
                          )}
                        </FormControl>
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fechaNacimiento"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        {modoEdicion ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full pl-3 text-left font-normal flex justify-between items-center"
                                >
                                  {field.value ? format(field.value, "dd/MM/yyyy") : "Seleccione una fecha"}
                                  <Calendar className="h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <div className="p-2 bg-gray-50 rounded border border-gray-200">
                            {formatearFecha(field.value)}
                          </div>
                        )}
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="telefonoFijo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono Fijo</FormLabel>
                        <FormControl>
                          {modoEdicion ? (
                            <Input placeholder="Ingrese su teléfono fijo" {...field} value={field.value || ""} />
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">
                              {field.value || "No especificado"}
                            </div>
                          )}
                        </FormControl>
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="celular"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          {modoEdicion ? (
                            <Input placeholder="Ingrese su número de celular" {...field} />
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">{field.value}</div>
                          )}
                        </FormControl>
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emailPrincipal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Principal</FormLabel>
                        <FormControl>
                          {modoEdicion ? (
                            <Input placeholder="Ingrese su email" {...field} />
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">{field.value}</div>
                          )}
                        </FormControl>
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emailAlternativo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Alternativo</FormLabel>
                        <FormControl>
                          {modoEdicion ? (
                            <Input
                              placeholder="Ingrese un email alternativo (opcional)"
                              {...field}
                              value={field.value || ""}
                            />
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">
                              {field.value || "No especificado"}
                            </div>
                          )}
                        </FormControl>
                        {modoEdicion && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {modoEdicion && (
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelar}
                className="flex items-center gap-2"
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#002060] hover:bg-[#001845] text-white flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>Guardando...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
