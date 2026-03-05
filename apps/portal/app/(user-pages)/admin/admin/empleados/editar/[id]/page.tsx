"use client"

import { useState, useEffect } from "react"
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
import { User, Briefcase, Mail, MapPin, ChevronLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import DireccionesEmpleadoForm from "@/components/empleados/direcciones-empleado-form"

// Esquema de validación con Zod
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

// Datos de ejemplo - Esto vendría de la API
const empleadosData: Record<string, any> = {
  "1": {
    id: 1,
    nombre: "Juan Carlos",
    apellido: "González",
    dni: "12345678",
    cuil: "20-12345678-9",
    fechaNacimiento: "1985-03-15",
    sexo: "masculino",
    legajo: "EMP001",
    fechaIngreso: "2020-01-15",
    gerencia: "1",
    departamento: "301",
    cargo: "3001",
    estado: "activo",
    email: "juan.gonzalez@empresa.com",
    telefono: "+54 11 1234-5678",
    telefonoEmpresa: "+54 11 4000-1000",
    direcciones: [
      {
        id: "1",
        tipo: "Personal",
        calle: "Av. Corrientes",
        sinNumero: false,
        numero: "1234",
        piso: "5",
        departamento: "A",
        codigoPostal: "1043",
        pais: "Argentina",
        provincia: "CABA",
        ciudad: "Buenos Aires",
        comentarios: "Portero eléctrico",
      },
    ],
  },
  "2": {
    id: 2,
    nombre: "María Elena",
    apellido: "Rodríguez",
    dni: "23456789",
    cuil: "27-23456789-4",
    fechaNacimiento: "1990-07-22",
    sexo: "femenino",
    legajo: "EMP002",
    fechaIngreso: "2021-03-10",
    gerencia: "1",
    departamento: "302",
    cargo: "3003",
    estado: "activo",
    email: "maria.rodriguez@empresa.com",
    telefono: "+54 11 2345-6789",
    telefonoEmpresa: "",
    direcciones: [],
  },
}

export default function EditarEmpleadoPage({ params }: { params: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [empleadoId, setEmpleadoId] = useState<string | null>(null)

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params
      setEmpleadoId(resolvedParams.id)
    }
    unwrapParams()
  }, [params])

  // Estados
  const [verificandoDNI, setVerificandoDNI] = useState(false)
  const [direcciones, setDirecciones] = useState<any[]>([])
  const [cargandoDatos, setCargandoDatos] = useState(true)

  // Datos de ejemplo para los selectores
  const gerencias = [
    { id: "1", nombre: "Gerencia General" },
    { id: "2", nombre: "Gerencia de Operaciones" },
    { id: "3", nombre: "Gerencia de Administración" },
    { id: "4", nombre: "Gerencia de Recursos Humanos" },
    { id: "5", nombre: "Gerencia de Tecnología" },
  ]

  const departamentos = {
    "1": [{ id: "101", nombre: "Dirección Ejecutiva" }],
    "2": [
      { id: "201", nombre: "Operaciones Portuarias" },
      { id: "202", nombre: "Logística" },
      { id: "203", nombre: "Seguridad" },
    ],
    "3": [
      { id: "301", nombre: "Contabilidad" },
      { id: "302", nombre: "Tesorería" },
      { id: "303", nombre: "Compras" },
    ],
    "4": [
      { id: "401", nombre: "Selección de Personal" },
      { id: "402", nombre: "Capacitación" },
      { id: "403", nombre: "Relaciones Laborales" },
    ],
    "5": [
      { id: "501", nombre: "Desarrollo" },
      { id: "502", nombre: "Infraestructura" },
      { id: "503", nombre: "Soporte Técnico" },
    ],
  }

  const cargos = {
    "101": [{ id: "1001", nombre: "Director General" }],
    "201": [
      { id: "2001", nombre: "Jefe de Operaciones" },
      { id: "2002", nombre: "Supervisor de Muelle" },
      { id: "2003", nombre: "Operador Portuario" },
    ],
    "202": [
      { id: "2004", nombre: "Coordinador de Logística" },
      { id: "2005", nombre: "Analista de Logística" },
    ],
    "203": [
      { id: "2006", nombre: "Jefe de Seguridad" },
      { id: "2007", nombre: "Oficial de Seguridad" },
    ],
    "301": [
      { id: "3001", nombre: "Contador General" },
      { id: "3002", nombre: "Analista Contable" },
    ],
    "302": [
      { id: "3003", nombre: "Tesorero" },
      { id: "3004", nombre: "Analista de Tesorería" },
    ],
    "303": [
      { id: "3005", nombre: "Jefe de Compras" },
      { id: "3006", nombre: "Analista de Compras" },
    ],
    "401": [
      { id: "4001", nombre: "Coordinador de Selección" },
      { id: "4002", nombre: "Analista de Selección" },
    ],
    "402": [
      { id: "4003", nombre: "Coordinador de Capacitación" },
      { id: "4004", nombre: "Instructor" },
    ],
    "403": [
      { id: "4005", nombre: "Especialista en Relaciones Laborales" },
      { id: "4006", nombre: "Analista de Relaciones Laborales" },
    ],
    "501": [
      { id: "5001", nombre: "Líder de Desarrollo" },
      { id: "5002", nombre: "Desarrollador Senior" },
      { id: "5003", nombre: "Desarrollador Junior" },
    ],
    "502": [
      { id: "5004", nombre: "Administrador de Sistemas" },
      { id: "5005", nombre: "Especialista en Redes" },
    ],
    "503": [
      { id: "5006", nombre: "Coordinador de Soporte" },
      { id: "5007", nombre: "Técnico de Soporte" },
    ],
  }

  // Estados para los selectores dependientes
  const [departamentosDisponibles, setDepartamentosDisponibles] = useState<any[]>([])
  const [cargosDisponibles, setCargosDisponibles] = useState<any[]>([])

  // Configuración del formulario
  const form = useForm<EmpleadoFormValues>({
    resolver: zodResolver(empleadoSchema),
    defaultValues: {
      nacionalidad: "",
      estadoCivil: undefined,
      grupoSanguineo: undefined,
      hijos: undefined,
      telefonoEmergencia: "",
      contactoEmergencia: "",
      conyuge: undefined,
      hijosDatos: [],
      licencias: [
        { periodo: 2024, dias: 0 },
        { periodo: 2025, dias: 0 },
        { periodo: 2026, dias: 0 },
      ],
      diaTramite: { periodo: new Date().getFullYear(), dias: 0 },
    },
  })

  // Para hijos dinámicos
  const { fields: hijosFields, append: appendHijo, remove: removeHijo } = useFieldArray({
    control: form.control,
    name: "hijosDatos",
  })

  // Watch para estadoCivil e hijos
  const estadoCivil = form.watch("estadoCivil")
  const tieneHijos = form.watch("hijos")

  // Cargar datos del empleado
  useEffect(() => {
    if (!empleadoId) return
    const cargarDatosEmpleado = async () => {
      try {
        // Simular carga de datos
        await new Promise((resolve) => setTimeout(resolve, 500))

        const empleado = empleadosData[empleadoId]
        if (!empleado) {
          toast({
            title: "Error",
            description: "Empleado no encontrado",
            variant: "destructive",
          })
          router.push("/admin/admin/empleados/listado")
          return
        }

        // Configurar departamentos y cargos disponibles
        const deptos = departamentos[empleado.gerencia as keyof typeof departamentos] || []
        const cargosDisp = cargos[empleado.departamento as keyof typeof cargos] || []
        setDepartamentosDisponibles(deptos)
        setCargosDisponibles(cargosDisp)

        // Precargar datos en el formulario
        form.reset({
          nombre: empleado.nombre,
          apellido: empleado.apellido,
          dni: empleado.dni,
          cuil: empleado.cuil,
          legajo: empleado.legajo,
          fechaIngreso: new Date(empleado.fechaIngreso),
          gerencia: empleado.gerencia,
          departamento: empleado.departamento,
          cargo: empleado.cargo,
          email: empleado.email,
          telefono: empleado.telefono,
          telefonoEmpresa: empleado.telefonoEmpresa || "",
          estado: empleado.estado,
          fechaNacimiento: new Date(empleado.fechaNacimiento),
          sexo: empleado.sexo,
          nacionalidad: empleado.nacionalidad || "",
          estadoCivil: empleado.estadoCivil || undefined,
          grupoSanguineo: empleado.grupoSanguineo || undefined,
          hijos: empleado.hijos || undefined,
          telefonoEmergencia: empleado.telefonoEmergencia || "",
          contactoEmergencia: empleado.contactoEmergencia || "",
          direcciones: empleado.direcciones || [],
          conyuge: empleado.conyuge || undefined,
          hijosDatos: empleado.hijosDatos || [],
          licencias: empleado.licencias || [
            { periodo: 2024, dias: 0 },
            { periodo: 2025, dias: 0 },
            { periodo: 2026, dias: 0 },
          ],
          diaTramite: empleado.diaTramite || { periodo: new Date().getFullYear(), dias: 0 },
        })

        setDirecciones(empleado.direcciones || [])
        setCargandoDatos(false)
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los datos del empleado",
          variant: "destructive",
        })
        router.push("/admin/admin/empleados/listado")
      }
    }

    cargarDatosEmpleado()
  }, [empleadoId, form, router, toast])

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
    setCargosDisponibles(cargos[departamentoId as keyof typeof cargos] || [])
  }

  // Función para verificar si el DNI ya existe (excluyendo el empleado actual)
  const verificarDNIUnico = async (dni: string) => {
    setVerificandoDNI(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simular verificación excluyendo el empleado actual
    const empleadoActual = empleadosData[empleadoId as string]
    if (dni === "12345678" && dni !== empleadoActual?.dni) {
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

    // Simular actualización
    console.log("Datos actualizados del empleado:", data)

    toast({
      title: "Empleado actualizado con éxito",
      description: `Los datos de ${data.nombre} ${data.apellido} han sido actualizados.`,
      duration: 5000,
    })

    // Redirigir al perfil del empleado
    router.push(`/admin/admin/empleados/perfil/${empleadoId}`)
  }

  if (cargandoDatos || !empleadoId) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando datos del empleado...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/admin/admin/empleados/perfil/${empleadoId}`)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al perfil
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Editar Empleado</h1>
            <p className="text-muted-foreground">Modifique los datos del empleado</p>
          </div>
        </div>
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
                      <Select onValueChange={(value) => handleGerenciaChange(value)} value={field.value}>
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
                        value={field.value}
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
                        value={field.value}
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
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  onClick={() => router.push(`/admin/admin/empleados/perfil/${empleadoId}`)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Actualizar Empleado</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

