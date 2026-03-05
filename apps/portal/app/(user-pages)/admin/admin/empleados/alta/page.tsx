"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerModal } from "@/components/ui/date-picker-modal"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Briefcase, Mail, MapPin } from "lucide-react"
import DireccionesEmpleadoForm from "@/components/empleados/direcciones-empleado-form"

// Esquema de validación con Zod - direcciones ahora es opcional
const empleadoSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  apellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  dni: z.string().min(7, { message: "El DNI debe tener al menos 7 caracteres" }),
  cuil: z.string().min(11, { message: "El CUIL debe tener 11 caracteres" }),
  legajo: z.string().min(1, { message: "El legajo es obligatorio" }),
  fechaIngreso: z.date({ required_error: "La fecha de ingreso es obligatoria" }),
  gerencia: z.string({ required_error: "La gerencia es obligatoria" }),
  departamento: z.string({ required_error: "El departamento es obligatoria" }),
  cargo: z.string({ required_error: "El cargo es obligatorio" }),
  email: z.string().email({ message: "El email no es válido" }),
  telefono: z.string().min(8, { message: "El teléfono debe tener al menos 8 caracteres" }),
  telefonoEmpresa: z.string().optional().default(""),
  estado: z.enum(["activo", "inactivo"]),
  fechaNacimiento: z.date({ required_error: "La fecha de nacimiento es obligatoria" }),
  sexo: z.enum(["masculino", "femenino", "no_binario"], {
    required_error: "Debe seleccionar una opción",
  }),
  nacionalidad: z.string().min(2, { message: "La nacionalidad es obligatoria" }),
  estadoCivil: z.enum(["soltero", "casado", "divorciado", "viudo", "otro"], { required_error: "El estado civil es obligatorio" }),
  grupoSanguineo: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"], { required_error: "El grupo sanguíneo es obligatorio" }),
  hijos: z.enum(["si", "no"]),
  telefonoEmergencia: z.string().optional().default(""),
  contactoEmergencia: z.string().optional().default(""),
  direcciones: z
    .array(
      z.object({
        id: z.string(),
        tipo: z.string(),
        calle: z.string(),
        sinNumero: z.boolean(),
        numero: z.string().optional().default(""),
        piso: z.string().optional().default(""),
        departamento: z.string().optional().default(""),
        codigoPostal: z.string(),
        pais: z.string(),
        provincia: z.string(),
        ciudad: z.string(),
        comentarios: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
  conyuge: z
    .object({
      nombreCompleto: z.string().min(2, { message: "El nombre es obligatorio" }),
      dni: z.string().min(7, { message: "El DNI es obligatorio" }),
      fechaNacimiento: z.date({ required_error: "La fecha de nacimiento es obligatoria" }),
    })
    .optional(),
  hijosDatos: z
    .array(
      z.object({
        nombreCompleto: z.string().min(2, { message: "El nombre es obligatorio" }),
        dni: z.string().min(7, { message: "El DNI es obligatorio" }),
        fechaNacimiento: z.date({ required_error: "La fecha de nacimiento es obligatoria" }),
      }),
    )
    .optional()
    .default([]),
  licencias: z.array(z.object({ periodo: z.number(), dias: z.number().min(0, { message: "Debe ser un número positivo" }) })).length(3),
  diaTramite: z.object({ periodo: z.number(), dias: z.number().min(0, { message: "Debe ser un número positivo" }) }),
})

type EmpleadoFormValues = z.infer<typeof empleadoSchema>

export default function AltaEmpleadoPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Estado para simular la verificación de DNI único
  const [verificandoDNI, setVerificandoDNI] = useState(false)
  const [direcciones, setDirecciones] = useState<any[]>([])

  // Datos de ejemplo para los selectores
  const gerencias = [
    { id: "GA", nombre: "Administración" },
    { id: "GAL", nombre: "Legales" },
    { id: "GRIC", nombre: "RRHH RRII y Comunidad" },
    { id: "GO", nombre: "Operaciones" },
    { id: "GIM", nombre: "Infraestructura y Mantenimiento" },
    { id: "PRES", nombre: "Presidencia" },
  ]

  const departamentos = {
    GA: [
      { id: "CONT", nombre: "Contable" },
      { id: "COMP", nombre: "Compras y Abastecimiento" },
      { id: "ING", nombre: "Ingresos" },
      { id: "SIST", nombre: "Sistemas" },
      { id: "MESA", nombre: "Mesa de Entradas y Archivo" },
      { id: "TESO", nombre: "Tesorería" },
    ],
    GAL: [{ id: "ASUN", nombre: "Asuntos y Despachos Jurídicos" }],
    GRIC: [
      { id: "GRRHH", nombre: "Gestión de RRHH" },
      { id: "RRII", nombre: "Relaciones Institucionales" },
      { id: "COMER", nombre: "Unidad Comercial" },
    ],
    GO: [
      { id: "SEGU", nombre: "Seguridad Integral" },
      { id: "TRAF", nombre: "Tráfico Terrestre" },
      { id: "TRAFM", nombre: "Tráfico Terrestre Maquinistas" },
      { id: "TRAFS", nombre: "Tráfico Terrestre Señaleros" },
      { id: "MYS", nombre: "Medioambiente y Seguridad" },
      { id: "GIRO", nombre: "Giro de Buques" },
    ],
    GIM: [
      { id: "TALL", nombre: "Taller" },
      { id: "MANT", nombre: "Mantenimiento" },
      { id: "MANTP", nombre: "Mantenimiento Pintura" },
      { id: "MANTH", nombre: "Mantenimiento Herrería" },
      { id: "BATI", nombre: "Batimetrías y Balizamientos" },
      { id: "DRAG", nombre: "Dragado y Muelles" },
      { id: "OBRAS", nombre: "Obras Terrestres" },
    ],
    PRES: [
      { id: "SECPRE", nombre: "Secretaría de Presidencia" },
      { id: "SECDRI", nombre: "Secretaría de Directorio" },
    ],
  }

  const cargos = [
    { id: "AGENLA", nombre: "Agente de Enlace" },
    { id: "AN1A", nombre: "AN1 Administrativo" },
    { id: "AN1F", nombre: "AN1 Ferroviario" },
    { id: "AN1OB", nombre: "AN1 Obrero" },
    { id: "AN1OP", nombre: "AN1 Operativo" },
    { id: "AN1M", nombre: "AN1 Mant, Vías y Obras" },
    { id: "AN2A", nombre: "AN2 Administrativo" },
    { id: "AN2F", nombre: "AN2 Ferroviario" },
    { id: "AN2M", nombre: "AN2 Mant, Vías y Obras" },
    { id: "AN2OB", nombre: "AN2 Obrero" },
    { id: "AN2OP", nombre: "AN2 Operativo" },
    { id: "AN3A", nombre: "AN3 Administrativo" },
    { id: "AN3F", nombre: "AN3 Ferroviario" },
    { id: "AN3M", nombre: "AN3 Mant, Vías y Obras" },
    { id: "AN3OB", nombre: "AN3 Obrero" },
    { id: "AN3OP", nombre: "AN3 Operativo" },
    { id: "ASPCON", nombre: "Aspirante a Conductor" },
    { id: "COND", nombre: "Conductor" },
    { id: "COORD", nombre: "Coordinador" },
    { id: "COOSUPE", nombre: "Coordinador Superior" },
    { id: "E1A", nombre: "E1 Administrativo" },
    { id: "E1F", nombre: "E1 Ferroviario" },
    { id: "E1M", nombre: "E1 Mant, Vías y Obras" },
    { id: "E1OB", nombre: "E1 Obrero" },
    { id: "E1OP", nombre: "E1 Operativo" },
    { id: "E2A", nombre: "E2 Administrativo" },
    { id: "E2F", nombre: "E2 Ferroviario" },
    { id: "E2M", nombre: "E2 Mant, Vías y Obras" },
    { id: "E2OB", nombre: "E2 Obrero" },
    { id: "E2OP", nombre: "E2 Operativo" },
    { id: "E3A", nombre: "E3 Administrativo" },
    { id: "E3F", nombre: "E3 Ferroviario" },
    { id: "E3M", nombre: "E3 Mant, Vías y Obras" },
    { id: "E3OB", nombre: "E3 Obrero" },
    { id: "E3OP", nombre: "E3 Operativo" },
    { id: "E4A", nombre: "E4 Administrativo" },
    { id: "E4F", nombre: "E4 Ferroviario" },
    { id: "E4M", nombre: "E4 Mant, Vías y Obras" },
    { id: "E4OB", nombre: "E4 Obrero" },
    { id: "E4OP", nombre: "E4 Operativo" },
    { id: "E5M", nombre: "E5 Mant, Vías y Obras" },
    { id: "E6M", nombre: "E6 Mant, Vías y Obras" },
    { id: "GER", nombre: "Gerente" },
    { id: "INST", nombre: "Instructor" },
    { id: "JTREN", nombre: "Jefe de Tren" },
    { id: "ODEP", nombre: "Operador de Depósito" },
    { id: "ODEPII", nombre: "Operador de Depósito II" },
    { id: "PAS", nombre: "Pasante" },
    { id: "PROFING", nombre: "Profesional Ingresante" },
    { id: "PROFJUN", nombre: "Profesional Junior" },
    { id: "PROFMED", nombre: "Profesional Medio" },
    { id: "PROFSEN", nombre: "Profesional Senior" },
    { id: "PROFSUP", nombre: "Profesional Superior" },
    { id: "SUBCOOR", nombre: "Subcoordinador" },
    { id: "SUBSUPE", nombre: "Subcoordinador Superior" },
    { id: "SUPERV", nombre: "Supervisor" },
    { id: "TEC", nombre: "Técnico" },
    { id: "TECING", nombre: "Técnico Ingresante" },
  ]

  // Estados para los selectores dependientes
  const [departamentosDisponibles, setDepartamentosDisponibles] = useState<any[]>([])
  const [cargosDisponibles, setCargosDisponibles] = useState<any[]>([])

  // Valores por defecto del formulario
  const defaultValues: Partial<EmpleadoFormValues> = {
    nombre: "",
    apellido: "",
    dni: "",
    cuil: "",
    legajo: "",
    email: "",
    telefono: "",
    telefonoEmpresa: "",
    estado: "activo",
    fechaNacimiento: undefined,
    sexo: undefined,
    nacionalidad: "",
    estadoCivil: undefined,
    grupoSanguineo: undefined,
    hijos: undefined,
    telefonoEmergencia: "",
    contactoEmergencia: "",
    direcciones: [],
    conyuge: undefined,
    hijosDatos: [],
    licencias: [
      { periodo: 2024, dias: 0 },
      { periodo: 2025, dias: 0 },
      { periodo: 2026, dias: 0 },
    ],
    diaTramite: { periodo: new Date().getFullYear(), dias: 0 },
  }

  // Configuración del formulario con React Hook Form
  const form = useForm<EmpleadoFormValues>({
    resolver: zodResolver(empleadoSchema),
    defaultValues,
  })

  // Para hijos dinámicos
  const { fields: hijosFields, append: appendHijo, remove: removeHijo } = useFieldArray({
    control: form.control,
    name: "hijosDatos",
  })

  // Watch para estadoCivil e hijos
  const estadoCivil = form.watch("estadoCivil")
  const tieneHijos = form.watch("hijos")

  // Función para manejar el cambio de gerencia
  const handleGerenciaChange = (gerenciaId: string) => {
    form.setValue("gerencia", gerenciaId)
    form.setValue("departamento", "")
    form.setValue("cargo", "")
    setDepartamentosDisponibles(departamentos[gerenciaId as keyof typeof departamentos] || [])
    setCargosDisponibles([])
  }

  // Función para manejar el cambio de departamento
  const handleDepartamentoChange = (departamentoId: string) => {
    form.setValue("departamento", departamentoId)
    form.setValue("cargo", "")
    // Ahora todos los cargos están disponibles para cualquier departamento
    setCargosDisponibles(cargos)
  }

  // Función para verificar si el DNI ya existe
  const verificarDNIUnico = async (dni: string) => {
    setVerificandoDNI(true)

    // Simulamos una llamada a la API para verificar el DNI
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulamos que el DNI 12345678 ya existe
    if (dni === "12345678") {
      form.setError("dni", {
        type: "manual",
        message: "Este DNI ya está registrado en el sistema",
      })
      setVerificandoDNI(false)
      return false
    }

    setVerificandoDNI(false)
    return true
  }

  // Función para manejar el envío del formulario
  const onSubmit = async (data: EmpleadoFormValues) => {
    // Verificar DNI único
    const dniUnico = await verificarDNIUnico(data.dni)
    if (!dniUnico) return

    // Simulamos el envío de datos al servidor
    console.log("Datos del empleado:", data)

    // Mostramos un toast de éxito
    toast({
      title: "Empleado registrado con éxito",
      description: `${data.nombre} ${data.apellido} ha sido dado de alta en el sistema.`,
      duration: 5000,
    })

    // Redirigimos al listado de empleados
    router.push("/admin/admin/empleados/listado")
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Alta de Empleado</h1>
        <p className="text-muted-foreground">Complete los datos del nuevo empleado</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Datos Personales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Datos Personales
              </CardTitle>
              <CardDescription>Información personal del empleado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Nombre, Apellido, DNI, CUIL, Fecha Nacimiento, Sexo */}
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apellido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el DNI"
                          {...field}
                          onBlur={(e) => {
                            field.onBlur()
                            if (e.target.value) {
                              verificarDNIUnico(e.target.value)
                            }
                          }}
                        />
                      </FormControl>
                      {verificandoDNI && <p className="text-xs text-muted-foreground">Verificando DNI...</p>}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CUIL *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el CUIL (sin guiones)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fechaNacimiento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Nacimiento *</FormLabel>
                      <FormControl>
                        <DatePickerModal date={field.value} setDate={field.onChange} placeholder="Seleccione fecha" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="femenino">Femenino</SelectItem>
                          <SelectItem value="no_binario">No Binario</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Nacionalidad, Estado Civil, Grupo Sanguíneo, Hijos */}
                <FormField
                  control={form.control}
                  name="nacionalidad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidad *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese la nacionalidad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estadoCivil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un estado civil" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="soltero">Soltero</SelectItem>
                          <SelectItem value="casado">Casado</SelectItem>
                          <SelectItem value="divorciado">Divorciado</SelectItem>
                          <SelectItem value="viudo">Viudo</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grupoSanguineo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grupo Sanguíneo *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un grupo sanguíneo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hijos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Tiene Hijos?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione si" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="si">Sí</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Datos Laborales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Datos Laborales
              </CardTitle>
              <CardDescription>Información laboral y organizacional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="legajo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Legajo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el número de legajo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fechaIngreso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Ingreso *</FormLabel>
                      <FormControl>
                        <DatePickerModal date={field.value} setDate={field.onChange} placeholder="Seleccione fecha" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gerencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gerencia *</FormLabel>
                      <Select onValueChange={(value) => handleGerenciaChange(value)} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una gerencia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gerencias.map((gerencia) => (
                            <SelectItem key={gerencia.id} value={gerencia.id}>
                              {gerencia.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento *</FormLabel>
                      <Select
                        onValueChange={(value) => handleDepartamentoChange(value)}
                        defaultValue={field.value}
                        disabled={departamentosDisponibles.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un departamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departamentosDisponibles.map((depto) => (
                            <SelectItem key={depto.id} value={depto.id}>
                              {depto.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={cargosDisponibles.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un cargo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cargosDisponibles.map((cargo) => (
                            <SelectItem key={cargo.id} value={cargo.id}>
                              {cargo.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="activo">Activo</SelectItem>
                          <SelectItem value="inactivo">Inactivo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Licencias y días disponibles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Licencias y días disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* 3 periodos de licencia anual */}
                {form.watch("licencias").map((lic, idx) => (
                  <FormField
                    key={lic.periodo}
                    control={form.control}
                    name={`licencias.${idx}.dias`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Periodo {lic.periodo}</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                {/* Día de trámite */}
                <FormField
                  control={form.control}
                  name="diaTramite.dias"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Día de trámite {form.watch("diaTramite").periodo}</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Datos de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Datos de Contacto
              </CardTitle>
              <CardDescription>Información de contacto del empleado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el teléfono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefonoEmpresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono de la Empresa (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el teléfono de la empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefonoEmergencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono de Emergencia (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el teléfono de emergencia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactoEmergencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de Contacto de Emergencia (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el nombre de contacto de emergencia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Direcciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Direcciones
              </CardTitle>
              <CardDescription>Domicilios del empleado (opcional)</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="direcciones"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DireccionesEmpleadoForm
                        direcciones={direcciones}
                        onDireccionesChange={(newDirecciones) => {
                          setDirecciones(newDirecciones)
                          field.onChange(newDirecciones)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Datos familiares */}
          {(estadoCivil === "casado" || tieneHijos === "si") && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Datos familiares
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cónyuge */}
                {estadoCivil === "casado" && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Cónyuge</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="conyuge.nombreCompleto"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo *</FormLabel>
                            <FormControl>
                              <Input placeholder="Ingrese el nombre completo del cónyuge" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="conyuge.dni"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>DNI *</FormLabel>
                            <FormControl>
                              <Input placeholder="Ingrese el DNI del cónyuge" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="conyuge.fechaNacimiento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha de nacimiento *</FormLabel>
                            <FormControl>
                              <DatePickerModal date={field.value} setDate={field.onChange} placeholder="Seleccione fecha" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                {/* Hijos */}
                {tieneHijos === "si" && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Hijo/s</h4>
                    <div className="space-y-2">
                      {hijosFields.map((hijo, idx) => (
                        <div key={hijo.id} className="grid gap-4 md:grid-cols-3 bg-gray-50 rounded-lg p-3">
                          <FormField
                            control={form.control}
                            name={`hijosDatos.${idx}.nombreCompleto`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre completo *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ingrese el nombre completo del hijo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`hijosDatos.${idx}.dni`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>DNI *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ingrese el DNI del hijo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`hijosDatos.${idx}.fechaNacimiento`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fecha de nacimiento *</FormLabel>
                                <FormControl>
                                  <DatePickerModal date={field.value} setDate={field.onChange} placeholder="Seleccione fecha" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeHijo(idx)}>
                            Quitar
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => appendHijo({ nombreCompleto: "", dni: "", fechaNacimiento: undefined })}>
                        Agregar hijo
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Botones de acción */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/admin/empleados/listado")}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar Empleado</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

