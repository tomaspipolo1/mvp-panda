"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Briefcase,
  Phone,
  Home,
  FileText,
  UserX,
  ChevronLeft,
  Edit,
  Mail,
  Calendar,
  Hash,
  Building,
  MapPin,
  Clock,
} from "lucide-react";
import { MapaSelector } from "@/components/ui/mapa-selector";

// Datos de ejemplo para empleado compras
const empleado = {
  id: 1,
  nombre: "Carlos",
  apellido: "Martínez",
  dni: "28456789",
  cuil: "20-28456789-3",
  fechaNacimiento: "1980-05-15",
  sexo: "Masculino",
  nacionalidad: "Argentina",
  estadoCivil: "Soltero",
  grupoSanguineo: "A+",
  hijos: false,
  conyuge: undefined,
  hijosDatos: [],
  legajo: "LEG-9210",
  fechaIngreso: "2018-04-10",
  gerencia: "Gerencia de Administración",
  departamento: "Compras y Abastecimiento",
  cargo: "Profesional Medio",
  estado: "Activo",
  email: "carlos.martinez@plp.gob.ar",
  telefono: "01147896543",
  telefonoEmpresa: "",
  telefonoEmergencia: "",
  contactoEmergencia: "",
  avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EVU9GehPyuD5GBqZU3luu3IoA9YrlK.png",
  direcciones: [
    {
      id: 1,
      tipo: "Personal",
      calle: "Av. Corrientes",
      numero: "1234",
      piso: "5",
      departamento: "A",
      codigoPostal: "1043",
      localidad: "Buenos Aires",
      provincia: "CABA",
      comentarios: "Portero eléctrico",
    },
  ],
};

function calcularEdad(fechaNacimiento: string): number {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }
  return edad;
}

function formatearFecha(fecha: string): string {
  const opciones: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-AR", opciones);
}

function calcularAntiguedad(fechaIngreso: string): number {
  const hoy = new Date();
  const ingreso = new Date(fechaIngreso);
  let antiguedad = hoy.getFullYear() - ingreso.getFullYear();
  const mes = hoy.getMonth() - ingreso.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < ingreso.getDate())) {
    antiguedad--;
  }
  return antiguedad;
}

export default function PerfilEmpleadoCompras() {
  const router = useRouter();
  const [vacacionesAbierto, setVacacionesAbierto] = useState(false);
  const edad = calcularEdad(empleado.fechaNacimiento);
  const antiguedad = calcularAntiguedad(empleado.fechaIngreso);
  const iniciales = `${empleado.nombre.charAt(0)}${empleado.apellido.charAt(0)}`;
  const estadoBadge = { variant: "default" as const, className: "bg-green-600 hover:bg-green-700" };
  const licenciaOrdinaria = [
    { periodo: 2024, dias: 2 },
    { periodo: 2025, dias: 12 },
    { periodo: 2026, dias: 20 },
  ];
  const diaTramite = { dias: 1 };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">Perfil de Empleado</h1>
              <Separator orientation="vertical" className="h-6" />
              <p className="text-sm text-gray-500 mt-1">Información completa del empleado</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => router.push("/empleado-compras/perfil/datos-personales/editar")}
              >
                <Edit className="h-4 w-4" />
                Editar datos
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ver legajo PDF
              </Button>
              <Button variant="destructive" size="sm" className="flex items-center gap-2">
                <UserX className="h-4 w-4" />
                Dar de baja
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={empleado.avatar || "/placeholder.svg"} alt={`${empleado.nombre} ${empleado.apellido}`} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {iniciales}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {empleado.nombre} {empleado.apellido}
                </h2>
                <Badge variant={estadoBadge.variant} className={estadoBadge.className}>
                  {empleado.estado}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Legajo:</span>
                  <span className="font-medium">{empleado.legajo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Departamento:</span>
                  <span className="font-medium">{empleado.departamento}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Cargo:</span>
                  <span className="font-medium">{empleado.cargo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Antigüedad:</span>
                  <span className="font-medium">{antiguedad} años</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Licencias y días disponibles */}
        <div className="mb-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
                Licencias y días disponibles
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={vacacionesAbierto ? "Ocultar" : "Mostrar"}
                onClick={() => setVacacionesAbierto((v) => !v)}
              >
                {vacacionesAbierto ? (
                  <ChevronLeft className="h-5 w-5 transform rotate-90 transition-transform" />
                ) : (
                  <ChevronLeft className="h-5 w-5 transform -rotate-90 transition-transform" />
                )}
              </Button>
            </CardHeader>
            {vacacionesAbierto && (
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                  <span className="text-base font-semibold text-gray-700 text-center col-span-3 md:col-span-3">Licencia ordinaria Anual</span>
                  <span className="text-base font-semibold text-gray-700 text-center">Día de trámite</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {licenciaOrdinaria.map(({ periodo, dias }) => (
                    <div
                      key={"anual-" + periodo}
                      className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-green-100 py-8 px-4"
                    >
                      <span className="text-lg text-gray-500 mb-2">Periodo</span>
                      <span className="text-2xl font-semibold text-gray-800 mb-2">{periodo}</span>
                      <span className="text-4xl font-bold text-green-700 mb-1">{dias}</span>
                      <span className="text-base text-gray-600">Días hábiles</span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-blue-100 py-8 px-4">
                    <span className="text-lg text-gray-500 mb-2">Período</span>
                    <span className="text-2xl font-semibold text-gray-800 mb-2">2025</span>
                    <span className="text-4xl font-bold text-blue-700 mb-1">{diaTramite.dias}</span>
                    <span className="text-base text-gray-600">Días disponibles</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
        {/* Grid: Datos personales - Datos de contacto */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 grid gap-6">
            {/* Datos Personales */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Datos Personales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">DNI</p>
                      <p className="font-medium text-gray-900">{empleado.dni}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">CUIL</p>
                      <p className="font-medium text-gray-900">{empleado.cuil}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Fecha de nacimiento</p>
                      <p className="font-medium text-gray-900">{formatearFecha(empleado.fechaNacimiento)}</p>
                      <p className="text-sm text-gray-500">{edad} años</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Sexo</p>
                      <p className="font-medium text-gray-900">{empleado.sexo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Nacionalidad</p>
                      <p className="font-medium text-gray-900">{empleado.nacionalidad || '-'} </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Estado civil</p>
                      <p className="font-medium text-gray-900">{empleado.estadoCivil || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Grupo sanguíneo</p>
                      <p className="font-medium text-gray-900">{empleado.grupoSanguineo || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Hijo/s</p>
                      <p className="font-medium text-gray-900">{empleado.hijos ? 'Sí' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 grid gap-6">
            {/* Datos de Contacto */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  Datos de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="space-y-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{empleado.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Teléfono</p>
                      <p className="font-medium text-gray-900">{empleado.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Teléfono Empresa</p>
                      <p className="font-medium text-gray-900">{empleado.telefonoEmpresa || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Teléfono de emergencia</p>
                      <p className="font-medium text-gray-900">{empleado.telefonoEmergencia || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Persona a contactar</p>
                      <p className="font-medium text-gray-900">{empleado.contactoEmergencia || '-'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Datos familiares a todo el ancho */}
        <div className="max-w-7xl mx-auto py-6 mb-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <User className="h-5 w-5 text-yellow-600" />
                </div>
                Datos familiares
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 space-y-6">
              {/* No hay cónyuge ni hijos en este ejemplo */}
              <div className="text-gray-500 italic">No hay datos familiares cargados.</div>
            </CardContent>
          </Card>
        </div>
        {/* Grid: Datos laborales - Direcciones */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 grid gap-6">
            {/* Datos Laborales */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  Datos Laborales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Fecha de ingreso</p>
                      <p className="font-medium text-gray-900">{formatearFecha(empleado.fechaIngreso)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Gerencia</p>
                      <p className="font-medium text-gray-900">{empleado.gerencia}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Departamento</p>
                      <p className="font-medium text-gray-900">{empleado.departamento}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Cargo</p>
                      <p className="font-medium text-gray-900">{empleado.cargo}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 grid gap-6">
            {/* Direcciones */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Home className="h-5 w-5 text-orange-600" />
                  </div>
                  Direcciones
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                {empleado.direcciones.length > 0 ? (
                  <div className="space-y-4 h-full overflow-y-auto">
                    {empleado.direcciones.map((direccion) => (
                      <div key={direccion.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline" className="text-xs">
                            {direccion.tipo}
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="font-medium text-gray-900">
                            {direccion.calle} {direccion.numero}
                            {direccion.piso && `, Piso ${direccion.piso}`}
                            {direccion.departamento && `, Depto ${direccion.departamento}`}
                          </p>
                          <p className="text-gray-600">
                            CP {direccion.codigoPostal}, {direccion.localidad}
                          </p>
                          <p className="text-gray-600">{direccion.provincia}</p>
                          {direccion.comentarios && (
                            <p className="text-gray-500 italic text-xs mt-2">{direccion.comentarios}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 h-full flex flex-col justify-center">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Este empleado no tiene direcciones cargadas.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 mb-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                Ubicación en el mapa
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <p className="mb-2 text-gray-600">Selecciona la ubicación exacta de la casa o dirección haciendo click en el mapa.</p>
              <MapaSelector
                initialPosition={[-34.6037, -58.3816]}
                onChange={(coords) => {
                  // Aquí puedes guardar las coordenadas en el estado o enviarlas a la API
                  console.log("Coordenadas seleccionadas:", coords);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
