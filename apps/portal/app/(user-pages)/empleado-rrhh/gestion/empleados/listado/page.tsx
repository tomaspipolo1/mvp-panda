"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  UserX,
  Activity,
} from "lucide-react"
import { ConfirmarBajaEmpleadoModal } from "@/components/empleados/confirmar-baja-empleado-modal"

// Datos de ejemplo - 122 empleados
const empleados = [
  // Administración
  {
    id: 1,
    nombre: "Juan Carlos",
    apellido: "González",
    dni: "12345678",
    legajo: "EMP001",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Contador Senior",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "María Elena",
    apellido: "Rodríguez",
    dni: "23456789",
    legajo: "EMP002",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Analista Financiero",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Carlos Alberto",
    apellido: "Martínez",
    dni: "34567890",
    legajo: "EMP003",
    gerencia: "Administración",
    departamento: "Tesorería",
    cargo: "Tesorero",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Ana Sofía",
    apellido: "López",
    dni: "45678901",
    legajo: "EMP004",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Auxiliar Contable",
    estado: "Licencia",
  },
  {
    id: 5,
    nombre: "Roberto",
    apellido: "Fernández",
    dni: "56789012",
    legajo: "EMP005",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Gerente Financiero",
    estado: "Activo",
  },
  {
    id: 6,
    nombre: "Laura Patricia",
    apellido: "Silva",
    dni: "67890123",
    legajo: "EMP005B",
    gerencia: "Administración",
    departamento: "Auditoría",
    cargo: "Auditor Interno",
    estado: "Vacaciones",
  },
  {
    id: 7,
    nombre: "Diego Alejandro",
    apellido: "Morales",
    dni: "78901234",
    legajo: "EMP006",
    gerencia: "Administración",
    departamento: "Presupuesto",
    cargo: "Analista de Presupuesto",
    estado: "Activo",
  },
  {
    id: 8,
    nombre: "Valentina",
    apellido: "Castro",
    dni: "89012345",
    legajo: "EMP007",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Contador Junior",
    estado: "Activo",
  },
  {
    id: 9,
    nombre: "Andrés Felipe",
    apellido: "Vargas",
    dni: "90123456",
    legajo: "EMP008",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Analista de Costos",
    estado: "Inactivo",
  },
  {
    id: 10,
    nombre: "Camila",
    apellido: "Herrera",
    dni: "01234567",
    legajo: "EMP009",
    gerencia: "Administración",
    departamento: "Tesorería",
    cargo: "Cajero",
    estado: "Activo",
  },

  // RRHH
  {
    id: 11,
    nombre: "Fernando",
    apellido: "Jiménez",
    dni: "11234567",
    legajo: "EMP010",
    gerencia: "RRHH",
    departamento: "Recursos Humanos",
    cargo: "Gerente de RRHH",
    estado: "Activo",
  },
  {
    id: 12,
    nombre: "Sofía",
    apellido: "Ramírez",
    dni: "12234567",
    legajo: "EMP011",
    gerencia: "RRHH",
    departamento: "Selección",
    cargo: "Analista de Selección",
    estado: "Activo",
  },
  {
    id: 13,
    nombre: "Miguel Ángel",
    apellido: "Torres",
    dni: "13234567",
    legajo: "EMP012",
    gerencia: "RRHH",
    departamento: "Capacitación",
    cargo: "Coordinador de Capacitación",
    estado: "Activo",
  },
  {
    id: 14,
    nombre: "Isabella",
    apellido: "Mendoza",
    dni: "14234567",
    legajo: "EMP013",
    gerencia: "RRHH",
    departamento: "Nómina",
    cargo: "Analista de Nómina",
    estado: "Licencia",
  },
  {
    id: 15,
    nombre: "Alejandro",
    apellido: "Ruiz",
    dni: "15234567",
    legajo: "EMP014",
    gerencia: "RRHH",
    departamento: "Bienestar",
    cargo: "Coordinador de Bienestar",
    estado: "Activo",
  },
  {
    id: 16,
    nombre: "Natalia",
    apellido: "Guerrero",
    dni: "16234567",
    legajo: "EMP015",
    gerencia: "RRHH",
    departamento: "Desarrollo",
    cargo: "Analista de Desarrollo",
    estado: "Activo",
  },
  {
    id: 17,
    nombre: "Sebastián",
    apellido: "Peña",
    dni: "17234567",
    legajo: "EMP016",
    gerencia: "RRHH",
    departamento: "Relaciones Laborales",
    cargo: "Especialista en Relaciones",
    estado: "Vacaciones",
  },
  {
    id: 18,
    nombre: "Gabriela",
    apellido: "Ortiz",
    dni: "18234567",
    legajo: "EMP017",
    gerencia: "RRHH",
    departamento: "Seguridad Industrial",
    cargo: "Coordinador de Seguridad",
    estado: "Activo",
  },
  {
    id: 19,
    nombre: "Mateo",
    apellido: "Vásquez",
    dni: "19234567",
    legajo: "EMP018",
    gerencia: "RRHH",
    departamento: "Medicina Laboral",
    cargo: "Médico Laboral",
    estado: "Activo",
  },
  {
    id: 20,
    nombre: "Daniela",
    apellido: "Rojas",
    dni: "20234567",
    legajo: "EMP019",
    gerencia: "RRHH",
    departamento: "Psicología",
    cargo: "Psicólogo Organizacional",
    estado: "Activo",
  },

  // Ingeniería
  {
    id: 21,
    nombre: "Joaquín",
    apellido: "Moreno",
    dni: "21234567",
    legajo: "EMP020",
    gerencia: "Ingeniería",
    departamento: "Desarrollo",
    cargo: "Ingeniero de Software Senior",
    estado: "Activo",
  },
  {
    id: 22,
    nombre: "Valeria",
    apellido: "Sánchez",
    dni: "22234567",
    legajo: "EMP021",
    gerencia: "Ingeniería",
    departamento: "Infraestructura",
    cargo: "Ingeniero de Infraestructura",
    estado: "Activo",
  },
  {
    id: 23,
    nombre: "Nicolás",
    apellido: "Delgado",
    dni: "23234567",
    legajo: "EMP022",
    gerencia: "Ingeniería",
    departamento: "Calidad",
    cargo: "Ingeniero de Calidad",
    estado: "Licencia",
  },
  {
    id: 24,
    nombre: "Mariana",
    apellido: "Cruz",
    dni: "24234567",
    legajo: "EMP023",
    gerencia: "Ingeniería",
    departamento: "Sistemas",
    cargo: "Administrador de Sistemas",
    estado: "Activo",
  },
  {
    id: 25,
    nombre: "Emilio",
    apellido: "Paredes",
    dni: "25234567",
    legajo: "EMP024",
    gerencia: "Ingeniería",
    departamento: "Desarrollo",
    cargo: "Desarrollador Full Stack",
    estado: "Activo",
  },
  {
    id: 26,
    nombre: "Lucía",
    apellido: "Aguilar",
    dni: "26234567",
    legajo: "EMP025",
    gerencia: "Ingeniería",
    departamento: "Testing",
    cargo: "Tester QA",
    estado: "Vacaciones",
  },
  {
    id: 27,
    nombre: "Tomás",
    apellido: "Molina",
    dni: "27234567",
    legajo: "EMP026",
    gerencia: "Ingeniería",
    departamento: "DevOps",
    cargo: "Ingeniero DevOps",
    estado: "Activo",
  },
  {
    id: 28,
    nombre: "Antonella",
    apellido: "Ramos",
    dni: "28234567",
    legajo: "EMP027",
    gerencia: "Ingeniería",
    departamento: "Seguridad",
    cargo: "Especialista en Ciberseguridad",
    estado: "Activo",
  },
  {
    id: 29,
    nombre: "Ignacio",
    apellido: "Flores",
    dni: "29234567",
    legajo: "EMP028",
    gerencia: "Ingeniería",
    departamento: "Datos",
    cargo: "Analista de Datos",
    estado: "Activo",
  },
  {
    id: 30,
    nombre: "Renata",
    apellido: "Cabrera",
    dni: "30234567",
    legajo: "EMP029",
    gerencia: "Ingeniería",
    departamento: "UX/UI",
    cargo: "Diseñador UX/UI",
    estado: "Inactivo",
  },

  // Operaciones
  {
    id: 31,
    nombre: "Maximiliano",
    apellido: "Navarro",
    dni: "31234567",
    legajo: "EMP030",
    gerencia: "Operaciones",
    departamento: "Logística",
    cargo: "Gerente de Operaciones",
    estado: "Activo",
  },
  {
    id: 32,
    nombre: "Constanza",
    apellido: "Espinoza",
    dni: "32234567",
    legajo: "EMP031",
    gerencia: "Operaciones",
    departamento: "Almacén",
    cargo: "Jefe de Almacén",
    estado: "Activo",
  },
  {
    id: 33,
    nombre: "Benjamín",
    apellido: "Medina",
    dni: "33234567",
    legajo: "EMP032",
    gerencia: "Operaciones",
    departamento: "Transporte",
    cargo: "Coordinador de Transporte",
    estado: "Licencia",
  },
  {
    id: 34,
    nombre: "Francisca",
    apellido: "Reyes",
    dni: "34234567",
    legajo: "EMP033",
    gerencia: "Operaciones",
    departamento: "Mantenimiento",
    cargo: "Técnico de Mantenimiento",
    estado: "Activo",
  },
  {
    id: 35,
    nombre: "Santiago",
    apellido: "Campos",
    dni: "35234567",
    legajo: "EMP034",
    gerencia: "Operaciones",
    departamento: "Producción",
    cargo: "Supervisor de Producción",
    estado: "Activo",
  },
  {
    id: 36,
    nombre: "Amparo",
    apellido: "Vargas",
    dni: "36234567",
    legajo: "EMP035",
    gerencia: "Operaciones",
    departamento: "Control de Calidad",
    cargo: "Inspector de Calidad",
    estado: "Vacaciones",
  },
  {
    id: 37,
    nombre: "Rodrigo",
    apellido: "Pinto",
    dni: "37234567",
    legajo: "EMP036",
    gerencia: "Operaciones",
    departamento: "Seguridad",
    cargo: "Guardia de Seguridad",
    estado: "Activo",
  },
  {
    id: 38,
    nombre: "Javiera",
    apellido: "Lara",
    dni: "38234567",
    legajo: "EMP037",
    gerencia: "Operaciones",
    departamento: "Limpieza",
    cargo: "Supervisor de Limpieza",
    estado: "Activo",
  },
  {
    id: 39,
    nombre: "Cristóbal",
    apellido: "Soto",
    dni: "39234567",
    legajo: "EMP038",
    gerencia: "Operaciones",
    departamento: "Recepción",
    cargo: "Recepcionista",
    estado: "Activo",
  },
  {
    id: 40,
    nombre: "Monserrat",
    apellido: "Ibáñez",
    dni: "40234567",
    legajo: "EMP039",
    gerencia: "Operaciones",
    departamento: "Archivo",
    cargo: "Archivista",
    estado: "Inactivo",
  },

  // Legales
  {
    id: 41,
    nombre: "Patricio",
    apellido: "Contreras",
    dni: "41234567",
    legajo: "EMP040",
    gerencia: "Legales",
    departamento: "Asesoría Legal",
    cargo: "Gerente Legal",
    estado: "Activo",
  },
  {
    id: 42,
    nombre: "Esperanza",
    apellido: "Fuentes",
    dni: "42234567",
    legajo: "EMP041",
    gerencia: "Legales",
    departamento: "Contratos",
    cargo: "Abogado de Contratos",
    estado: "Activo",
  },
  {
    id: 43,
    nombre: "Esteban",
    apellido: "Muñoz",
    dni: "43234567",
    legajo: "EMP042",
    gerencia: "Legales",
    departamento: "Litigios",
    cargo: "Abogado Litigante",
    estado: "Licencia",
  },
  {
    id: 44,
    nombre: "Paloma",
    apellido: "Cáceres",
    dni: "44234567",
    legajo: "EMP043",
    gerencia: "Legales",
    departamento: "Cumplimiento",
    cargo: "Oficial de Cumplimiento",
    estado: "Activo",
  },
  {
    id: 45,
    nombre: "Gonzalo",
    apellido: "Valdés",
    dni: "45234567",
    legajo: "EMP044",
    gerencia: "Legales",
    departamento: "Propiedad Intelectual",
    cargo: "Especialista en PI",
    estado: "Activo",
  },
  {
    id: 46,
    nombre: "Isidora",
    apellido: "Bravo",
    dni: "46234567",
    legajo: "EMP045",
    gerencia: "Legales",
    departamento: "Regulatorio",
    cargo: "Analista Regulatorio",
    estado: "Vacaciones",
  },
  {
    id: 47,
    nombre: "Vicente",
    apellido: "Cortés",
    dni: "47234567",
    legajo: "EMP046",
    gerencia: "Legales",
    departamento: "Documentación",
    cargo: "Asistente Legal",
    estado: "Activo",
  },
  {
    id: 48,
    nombre: "Florencia",
    apellido: "Sandoval",
    dni: "48234567",
    legajo: "EMP047",
    gerencia: "Legales",
    departamento: "Notaría",
    cargo: "Notario",
    estado: "Activo",
  },

  // Presidencia
  {
    id: 49,
    nombre: "Augusto",
    apellido: "Henríquez",
    dni: "49234567",
    legajo: "EMP048",
    gerencia: "Presidencia",
    departamento: "Dirección General",
    cargo: "Presidente",
    estado: "Activo",
  },
  {
    id: 50,
    nombre: "Magdalena",
    apellido: "Figueroa",
    dni: "50234567",
    legajo: "EMP049",
    gerencia: "Presidencia",
    departamento: "Secretaría",
    cargo: "Secretaria Ejecutiva",
    estado: "Activo",
  },
  {
    id: 51,
    nombre: "Claudio",
    apellido: "Poblete",
    dni: "51234567",
    legajo: "EMP050",
    gerencia: "Presidencia",
    departamento: "Comunicaciones",
    cargo: "Director de Comunicaciones",
    estado: "Activo",
  },
  {
    id: 52,
    nombre: "Bárbara",
    apellido: "Tapia",
    dni: "52234567",
    legajo: "EMP051",
    gerencia: "Presidencia",
    departamento: "Relaciones Públicas",
    cargo: "Relacionista Público",
    estado: "Licencia",
  },
  {
    id: 53,
    nombre: "Álvaro",
    apellido: "Carrasco",
    dni: "53234567",
    legajo: "EMP052",
    gerencia: "Presidencia",
    departamento: "Protocolo",
    cargo: "Jefe de Protocolo",
    estado: "Activo",
  },
  {
    id: 54,
    nombre: "Antonia",
    apellido: "Vera",
    dni: "54234567",
    legajo: "EMP053",
    gerencia: "Presidencia",
    departamento: "Asuntos Corporativos",
    cargo: "Gerente de Asuntos Corporativos",
    estado: "Activo",
  },

  // Más empleados para llegar a 122...
  {
    id: 55,
    nombre: "Eduardo",
    apellido: "Maldonado",
    dni: "55234567",
    legajo: "EMP054",
    gerencia: "Administración",
    departamento: "Compras",
    cargo: "Analista de Compras",
    estado: "Activo",
  },
  {
    id: 56,
    nombre: "Catalina",
    apellido: "Araya",
    dni: "56234567",
    legajo: "EMP055",
    gerencia: "Administración",
    departamento: "Inventario",
    cargo: "Encargado de Inventario",
    estado: "Vacaciones",
  },
  {
    id: 57,
    nombre: "Óscar",
    apellido: "Gallardo",
    dni: "57234567",
    legajo: "EMP056",
    gerencia: "RRHH",
    departamento: "Evaluación",
    cargo: "Especialista en Evaluación",
    estado: "Activo",
  },
  {
    id: 58,
    nombre: "Emilia",
    apellido: "Salinas",
    dni: "58234567",
    legajo: "EMP057",
    gerencia: "Ingeniería",
    departamento: "Arquitectura",
    cargo: "Arquitecto de Software",
    estado: "Activo",
  },
  {
    id: 59,
    nombre: "Facundo",
    apellido: "Cornejo",
    dni: "59234567",
    legajo: "EMP058",
    gerencia: "Operaciones",
    departamento: "Planificación",
    cargo: "Planificador de Operaciones",
    estado: "Licencia",
  },
  {
    id: 60,
    nombre: "Agustina",
    apellido: "Bustamante",
    dni: "60234567",
    legajo: "EMP059",
    gerencia: "Legales",
    departamento: "Investigación",
    cargo: "Investigador Legal",
    estado: "Activo",
  },

  // Continuando con más empleados...
  {
    id: 61,
    nombre: "Martín",
    apellido: "Acosta",
    dni: "61234567",
    legajo: "EMP060",
    gerencia: "Administración",
    departamento: "Facturación",
    cargo: "Analista de Facturación",
    estado: "Activo",
  },
  {
    id: 62,
    nombre: "Josefina",
    apellido: "Morales",
    dni: "62234567",
    legajo: "EMP061",
    gerencia: "RRHH",
    departamento: "Comunicación Interna",
    cargo: "Comunicador Interno",
    estado: "Activo",
  },
  {
    id: 63,
    nombre: "Cristián",
    apellido: "Villalobos",
    dni: "63234567",
    legajo: "EMP062",
    gerencia: "Ingeniería",
    departamento: "Soporte",
    cargo: "Técnico de Soporte",
    estado: "Vacaciones",
  },
  {
    id: 64,
    nombre: "Macarena",
    apellido: "Escobar",
    dni: "64234567",
    legajo: "EMP063",
    gerencia: "Operaciones",
    departamento: "Distribución",
    cargo: "Coordinador de Distribución",
    estado: "Activo",
  },
  {
    id: 65,
    nombre: "Hernán",
    apellido: "Carvajal",
    dni: "65234567",
    legajo: "EMP064",
    gerencia: "Legales",
    departamento: "Mediación",
    cargo: "Mediador",
    estado: "Activo",
  },
  {
    id: 66,
    nombre: "Rocío",
    apellido: "Alvarado",
    dni: "66234567",
    legajo: "EMP065",
    gerencia: "Presidencia",
    departamento: "Estrategia",
    cargo: "Analista Estratégico",
    estado: "Licencia",
  },
  {
    id: 67,
    nombre: "Iván",
    apellido: "Santander",
    dni: "67234567",
    legajo: "EMP066",
    gerencia: "Administración",
    departamento: "Cobranzas",
    cargo: "Gestor de Cobranzas",
    estado: "Activo",
  },
  {
    id: 68,
    nombre: "Javiera",
    apellido: "Moya",
    dni: "68234567",
    legajo: "EMP067",
    gerencia: "RRHH",
    departamento: "Clima Laboral",
    cargo: "Especialista en Clima",
    estado: "Activo",
  },
  {
    id: 69,
    nombre: "Raúl",
    apellido: "Sepúlveda",
    dni: "69234567",
    legajo: "EMP068",
    gerencia: "Ingeniería",
    departamento: "Redes",
    cargo: "Administrador de Redes",
    estado: "Activo",
  },
  {
    id: 70,
    nombre: "Camila",
    apellido: "Godoy",
    dni: "70234567",
    legajo: "EMP069",
    gerencia: "Operaciones",
    departamento: "Calidad",
    cargo: "Analista de Calidad",
    estado: "Vacaciones",
  },

  // Continuando hasta 122...
  {
    id: 71,
    nombre: "Andrés",
    apellido: "Pacheco",
    dni: "71234567",
    legajo: "EMP070",
    gerencia: "Legales",
    departamento: "Arbitraje",
    cargo: "Especialista en Arbitraje",
    estado: "Activo",
  },
  {
    id: 72,
    nombre: "Belén",
    apellido: "Riveros",
    dni: "72234567",
    legajo: "EMP071",
    gerencia: "Presidencia",
    departamento: "Auditoría Interna",
    cargo: "Auditor Ejecutivo",
    estado: "Activo",
  },
  {
    id: 73,
    nombre: "Felipe",
    apellido: "Zúñiga",
    dni: "73234567",
    legajo: "EMP072",
    gerencia: "Administración",
    departamento: "Patrimonio",
    cargo: "Encargado de Patrimonio",
    estado: "Licencia",
  },
  {
    id: 74,
    nombre: "Constanza",
    apellido: "Leiva",
    dni: "74234567",
    legajo: "EMP073",
    gerencia: "RRHH",
    departamento: "Compensaciones",
    cargo: "Analista de Compensaciones",
    estado: "Activo",
  },
  {
    id: 75,
    nombre: "Javier",
    apellido: "Henríquez",
    dni: "75234567",
    legajo: "EMP074",
    gerencia: "Ingeniería",
    departamento: "Base de Datos",
    cargo: "Administrador de BD",
    estado: "Activo",
  },
  {
    id: 76,
    nombre: "Antonia",
    apellido: "Cuevas",
    dni: "76234567",
    legajo: "EMP075",
    gerencia: "Operaciones",
    departamento: "Servicios",
    cargo: "Coordinador de Servicios",
    estado: "Vacaciones",
  },
  {
    id: 77,
    nombre: "Nicolás",
    apellido: "Barrera",
    dni: "77234567",
    legajo: "EMP076",
    gerencia: "Legales",
    departamento: "Tributario",
    cargo: "Abogado Tributario",
    estado: "Activo",
  },
  {
    id: 78,
    nombre: "Fernanda",
    apellido: "Pizarro",
    dni: "78234567",
    legajo: "EMP077",
    gerencia: "Presidencia",
    departamento: "Innovación",
    cargo: "Gerente de Innovación",
    estado: "Activo",
  },
  {
    id: 79,
    nombre: "Matías",
    apellido: "Donoso",
    dni: "79234567",
    legajo: "EMP078",
    gerencia: "Administración",
    departamento: "Seguros",
    cargo: "Analista de Seguros",
    estado: "Activo",
  },
  {
    id: 80,
    nombre: "Valentina",
    apellido: "Urrutia",
    dni: "80234567",
    legajo: "EMP079",
    gerencia: "RRHH",
    departamento: "Diversidad",
    cargo: "Especialista en Diversidad",
    estado: "Licencia",
  },

  // Más empleados...
  {
    id: 81,
    nombre: "Gabriel",
    apellido: "Montoya",
    dni: "81234567",
    legajo: "EMP080",
    gerencia: "Ingeniería",
    departamento: "Mobile",
    cargo: "Desarrollador Mobile",
    estado: "Activo",
  },
  {
    id: 82,
    nombre: "Isadora",
    apellido: "Pereira",
    dni: "82234567",
    legajo: "EMP081",
    gerencia: "Operaciones",
    departamento: "Eventos",
    cargo: "Coordinador de Eventos",
    estado: "Activo",
  },
  {
    id: 83,
    nombre: "Lucas",
    apellido: "Arancibia",
    dni: "83234567",
    legajo: "EMP082",
    gerencia: "Legales",
    departamento: "Internacional",
    cargo: "Abogado Internacional",
    estado: "Vacaciones",
  },
  {
    id: 84,
    nombre: "Sofía",
    apellido: "Valenzuela",
    dni: "84234567",
    legajo: "EMP083",
    gerencia: "Presidencia",
    departamento: "Sustentabilidad",
    cargo: "Gerente de Sustentabilidad",
    estado: "Activo",
  },
  {
    id: 85,
    nombre: "Diego",
    apellido: "Olivares",
    dni: "85234567",
    legajo: "EMP084",
    gerencia: "Administración",
    departamento: "Viáticos",
    cargo: "Analista de Viáticos",
    estado: "Activo",
  },
  {
    id: 86,
    nombre: "Martina",
    apellido: "Cáceres",
    dni: "86234567",
    legajo: "EMP085",
    gerencia: "RRHH",
    departamento: "Talento",
    cargo: "Cazatalentos",
    estado: "Activo",
  },
  {
    id: 87,
    nombre: "Tomás",
    apellido: "Garrido",
    dni: "87234567",
    legajo: "EMP086",
    gerencia: "Ingeniería",
    departamento: "Cloud",
    cargo: "Especialista en Cloud",
    estado: "Licencia",
  },
  {
    id: 88,
    nombre: "Amanda",
    apellido: "Loyola",
    dni: "88234567",
    legajo: "EMP087",
    gerencia: "Operaciones",
    departamento: "Facilities",
    cargo: "Encargado de Facilities",
    estado: "Activo",
  },
  {
    id: 89,
    nombre: "Ignacio",
    apellido: "Moreno",
    dni: "89234567",
    legajo: "EMP088",
    gerencia: "Legales",
    departamento: "Laboral",
    cargo: "Abogado Laboralista",
    estado: "Activo",
  },
  {
    id: 90,
    nombre: "Catalina",
    apellido: "Herrera",
    dni: "90234567",
    legajo: "EMP089",
    gerencia: "Presidencia",
    departamento: "Gobierno Corporativo",
    cargo: "Especialista en GC",
    estado: "Vacaciones",
  },

  // Últimos empleados hasta 122...
  {
    id: 91,
    nombre: "Sebastián",
    apellido: "Núñez",
    dni: "91234567",
    legajo: "EMP090",
    gerencia: "Administración",
    departamento: "Activos Fijos",
    cargo: "Analista de Activos",
    estado: "Activo",
  },
  {
    id: 92,
    nombre: "Florencia",
    apellido: "Aguirre",
    dni: "92234567",
    legajo: "EMP091",
    gerencia: "RRHH",
    departamento: "Onboarding",
    cargo: "Especialista en Onboarding",
    estado: "Activo",
  },
  {
    id: 93,
    nombre: "Maximiliano",
    apellido: "Rojas",
    dni: "93234567",
    legajo: "EMP092",
    gerencia: "Ingeniería",
    departamento: "AI/ML",
    cargo: "Científico de Datos",
    estado: "Activo",
  },
  {
    id: 94,
    nombre: "Emilia",
    apellido: "Castillo",
    dni: "94234567",
    legajo: "EMP093",
    gerencia: "Operaciones",
    departamento: "Proyectos",
    cargo: "Project Manager",
    estado: "Licencia",
  },
  {
    id: 95,
    nombre: "Joaquín",
    apellido: "Vega",
    dni: "95234567",
    legajo: "EMP094",
    gerencia: "Legales",
    departamento: "Ambiental",
    cargo: "Abogado Ambiental",
    estado: "Activo",
  },
  {
    id: 96,
    nombre: "Renata",
    apellido: "Miranda",
    dni: "96234567",
    legajo: "EMP095",
    gerencia: "Presidencia",
    departamento: "RSE",
    cargo: "Gerente de RSE",
    estado: "Activo",
  },
  {
    id: 97,
    nombre: "Cristóbal",
    apellido: "Palma",
    dni: "97234567",
    legajo: "EMP096",
    gerencia: "Administración",
    departamento: "Riesgo",
    cargo: "Analista de Riesgo",
    estado: "Vacaciones",
  },
  {
    id: 98,
    nombre: "Agustina",
    apellido: "Saavedra",
    dni: "98234567",
    legajo: "EMP097",
    gerencia: "RRHH",
    departamento: "Performance",
    cargo: "Analista de Performance",
    estado: "Activo",
  },
  {
    id: 99,
    nombre: "Benjamín",
    apellido: "Carrasco",
    dni: "99234567",
    legajo: "EMP098",
    gerencia: "Ingeniería",
    departamento: "Blockchain",
    cargo: "Desarrollador Blockchain",
    estado: "Activo",
  },
  {
    id: 100,
    nombre: "Violeta",
    apellido: "Espinoza",
    dni: "00234567",
    legajo: "EMP099",
    gerencia: "Operaciones",
    departamento: "Procesos",
    cargo: "Analista de Procesos",
    estado: "Activo",
  },
  {
    id: 101,
    nombre: "Álvaro",
    apellido: "Mendoza",
    dni: "01234568",
    legajo: "EMP100",
    gerencia: "Legales",
    departamento: "Penal",
    cargo: "Abogado Penalista",
    estado: "Licencia",
  },
  {
    id: 102,
    nombre: "Esperanza",
    apellido: "Riquelme",
    dni: "02234568",
    legajo: "EMP101",
    gerencia: "Presidencia",
    departamento: "Relaciones Institucionales",
    cargo: "Gerente de RRII",
    estado: "Activo",
  },
  {
    id: 103,
    nombre: "Patricio",
    apellido: "Villarroel",
    dni: "03234568",
    legajo: "EMP102",
    gerencia: "Administración",
    departamento: "Control Interno",
    cargo: "Auditor de Control",
    estado: "Activo",
  },
  {
    id: 104,
    nombre: "Monserrat",
    apellido: "Poblete",
    dni: "04234568",
    legajo: "EMP103",
    gerencia: "RRHH",
    departamento: "Engagement",
    cargo: "Especialista en Engagement",
    estado: "Vacaciones",
  },
  {
    id: 105,
    nombre: "Esteban",
    apellido: "Figueroa",
    dni: "05234568",
    legajo: "EMP104",
    gerencia: "Ingeniería",
    departamento: "IoT",
    cargo: "Especialista en IoT",
    estado: "Activo",
  },
  {
    id: 106,
    nombre: "Paloma",
    apellido: "Sandoval",
    dni: "06234568",
    legajo: "EMP105",
    gerencia: "Operaciones",
    departamento: "Mejora Continua",
    cargo: "Analista de Mejora",
    estado: "Activo",
  },
  {
    id: 107,
    nombre: "Vicente",
    apellido: "Tapia",
    dni: "07234568",
    legajo: "EMP106",
    gerencia: "Legales",
    departamento: "Societario",
    cargo: "Abogado Societario",
    estado: "Activo",
  },
  {
    id: 108,
    nombre: "Isidora",
    apellido: "Bravo",
    dni: "08234568",
    legajo: "EMP107",
    gerencia: "Presidencia",
    departamento: "Crisis",
    cargo: "Gerente de Crisis",
    estado: "Licencia",
  },
  {
    id: 109,
    nombre: "Gonzalo",
    apellido: "Cortés",
    dni: "09234568",
    legajo: "EMP108",
    gerencia: "Administración",
    departamento: "Planificación",
    cargo: "Planificador Financiero",
    estado: "Activo",
  },
  {
    id: 110,
    nombre: "Francisca",
    apellido: "Henríquez",
    dni: "10234568",
    legajo: "EMP109",
    gerencia: "RRHH",
    departamento: "Cultura",
    cargo: "Especialista en Cultura",
    estado: "Activo",
  },
  {
    id: 111,
    nombre: "Rodrigo",
    apellido: "Maldonado",
    dni: "11234568",
    legajo: "EMP110",
    gerencia: "Ingeniería",
    departamento: "Automatización",
    cargo: "Ingeniero de Automatización",
    estado: "Vacaciones",
  },
  {
    id: 112,
    nombre: "Javiera",
    apellido: "Araya",
    dni: "12234568",
    legajo: "EMP111",
    gerencia: "Operaciones",
    departamento: "Sostenibilidad",
    cargo: "Coordinador de Sostenibilidad",
    estado: "Activo",
  },
  {
    id: 113,
    nombre: "Cristián",
    apellido: "Gallardo",
    dni: "13234568",
    legajo: "EMP112",
    gerencia: "Legales",
    departamento: "Consumidor",
    cargo: "Abogado del Consumidor",
    estado: "Activo",
  },
  {
    id: 114,
    nombre: "Macarena",
    apellido: "Salinas",
    dni: "14234568",
    legajo: "EMP113",
    gerencia: "Presidencia",
    departamento: "Transformación Digital",
    cargo: "Gerente de TD",
    estado: "Activo",
  },
  {
    id: 115,
    nombre: "Hernán",
    apellido: "Cornejo",
    dni: "15234568",
    legajo: "EMP114",
    gerencia: "Administración",
    departamento: "Inversiones",
    cargo: "Analista de Inversiones",
    estado: "Licencia",
  },
  {
    id: 116,
    nombre: "Rocío",
    apellido: "Bustamante",
    dni: "16234568",
    legajo: "EMP115",
    gerencia: "RRHH",
    departamento: "Wellness",
    cargo: "Coordinador de Wellness",
    estado: "Activo",
  },
  {
    id: 117,
    nombre: "Iván",
    apellido: "Acosta",
    dni: "17234568",
    legajo: "EMP116",
    gerencia: "Ingeniería",
    departamento: "Robótica",
    cargo: "Ingeniero en Robótica",
    estado: "Activo",
  },
  {
    id: 118,
    nombre: "Javiera",
    apellido: "Morales",
    dni: "18234568",
    legajo: "EMP117",
    gerencia: "Operaciones",
    departamento: "Supply Chain",
    cargo: "Analista de Supply Chain",
    estado: "Vacaciones",
  },
  {
    id: 119,
    nombre: "Raúl",
    apellido: "Villalobos",
    dni: "19234568",
    legajo: "EMP118",
    gerencia: "Legales",
    departamento: "Compliance",
    cargo: "Oficial de Compliance",
    estado: "Activo",
  },
  {
    id: 120,
    nombre: "Camila",
    apellido: "Escobar",
    dni: "20234568",
    legajo: "EMP119",
    gerencia: "Presidencia",
    departamento: "Inteligencia de Negocios",
    cargo: "Analista de BI",
    estado: "Activo",
  },
  {
    id: 121,
    nombre: "Andrés",
    apellido: "Carvajal",
    dni: "21234568",
    legajo: "EMP120",
    gerencia: "Administración",
    departamento: "Comercio Exterior",
    cargo: "Especialista en Comercio Exterior",
    estado: "Activo",
  },
  {
    id: 122,
    nombre: "Belén",
    apellido: "Alvarado",
    dni: "22234568",
    legajo: "EMP121",
    gerencia: "RRHH",
    departamento: "Learning",
    cargo: "Especialista en Learning",
    estado: "Licencia",
  },
]

const gerencias = ["Administración", "Presidencia", "Ingeniería", "RRHH", "Legales", "Operaciones"]
const estados = ["Activo", "Inactivo", "Licencia", "Vacaciones"]

export default function ListadoEmpleados() {
  const router = useRouter()
  const [busqueda, setBusqueda] = useState("")
  const [filtroGerencia, setFiltroGerencia] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("")
  const [filtroCargo, setFiltroCargo] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const empleadosPorPagina = 10
  const [ordenPor, setOrdenPor] = useState<string>("")
  const [ordenDireccion, setOrdenDireccion] = useState<"asc" | "desc">("asc")

  // Estados del modal simplificados
  const [empleadoParaBaja, setEmpleadoParaBaja] = useState<(typeof empleados)[0] | null>(null)
  const [isModalBajaOpen, setIsModalBajaOpen] = useState(false)

  // Filtrar empleados
  const empleadosFiltrados = empleados.filter((empleado) => {
    const coincideBusqueda =
      empleado.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.dni?.includes(busqueda) ||
      empleado.cargo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.legajo?.toLowerCase().includes(busqueda.toLowerCase())

    const coincideGerencia = !filtroGerencia || filtroGerencia === "all" || empleado.gerencia === filtroGerencia
    const coincideEstado = !filtroEstado || filtroEstado === "all" || empleado.estado === filtroEstado
    const coincideCargo = !filtroCargo || empleado.cargo?.toLowerCase().includes(filtroCargo.toLowerCase())

    return coincideBusqueda && coincideGerencia && coincideEstado && coincideCargo
  })

  // Ordenar empleados
  const empleadosOrdenados = [...empleadosFiltrados].sort((a, b) => {
    if (!ordenPor) return 0

    let valorA = a[ordenPor as keyof typeof a]
    let valorB = b[ordenPor as keyof typeof b]

    if (typeof valorA === "string") valorA = valorA.toLowerCase()
    if (typeof valorB === "string") valorB = valorB.toLowerCase()

    if (valorA < valorB) return ordenDireccion === "asc" ? -1 : 1
    if (valorA > valorB) return ordenDireccion === "asc" ? 1 : -1
    return 0
  })

  // Paginación
  const totalPaginas = Math.ceil(empleadosOrdenados.length / empleadosPorPagina)
  const indiceInicio = (paginaActual - 1) * empleadosPorPagina
  const empleadosPaginados = empleadosOrdenados.slice(indiceInicio, indiceInicio + empleadosPorPagina)

  const manejarOrden = (campo: string) => {
    if (ordenPor === campo) {
      setOrdenDireccion(ordenDireccion === "asc" ? "desc" : "asc")
    } else {
      setOrdenPor(campo)
      setOrdenDireccion("asc")
    }
  }

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Activo: "default", // azul
      Inactivo: "secondary", // gris
      Licencia: "outline", // gris con borde
      Vacaciones: "destructive", // rojo
    }
    return variants[estado as keyof typeof variants] || "default"
  }

  const limpiarFiltros = () => {
    setBusqueda("")
    setFiltroGerencia("")
    setFiltroEstado("")
    setFiltroCargo("")
    setOrdenPor("")
    setPaginaActual(1)
  }

  const verPerfilEmpleado = (empleadoId: number) => {
    router.push(`/empleado-rrhh/gestion/empleados/perfil/${empleadoId}`)
  }

  const editarEmpleado = (empleadoId: number) => {
    router.push(`/empleado-rrhh/gestion/empleados/editar/${empleadoId}`)
  }

  const verActividadEmpleado = (empleadoId: number) => {
    router.push(`/empleado-rrhh/gestion/empleados/actividad/${empleadoId}`)
  }

  const manejarBajaEmpleado = async (empleadoId: number, motivo: string, observaciones: string) => {
    try {
      console.log("Dando de baja empleado:", { empleadoId, motivo, observaciones })
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // NO cerrar el modal aquí - el modal hijo se encarga de eso
      // cerrarModalBaja() ← REMOVER ESTA LÍNEA

      console.log("Baja procesada exitosamente")
    } catch (error) {
      console.error("Error al dar de baja empleado:", error)
      throw error // Re-lanzar el error para que el modal lo maneje
    }
  }

  const abrirModalBaja = (empleado: (typeof empleados)[0]) => {
    setEmpleadoParaBaja(empleado)
    setIsModalBajaOpen(true)
  }

  const cerrarModalBaja = () => {
    setIsModalBajaOpen(false)
    setEmpleadoParaBaja(null)
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Listado de Empleados</h1>
        <Button onClick={() => router.push("/empleado-rrhh/gestion/empleados/alta")}>Agregar Empleado</Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{empleados.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {empleados.filter((e) => e.estado === "Activo").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Licencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {empleados.filter((e) => e.estado === "Licencia").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {empleados.filter((e) => e.estado === "Inactivo").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, DNI o cargo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroGerencia} onValueChange={setFiltroGerencia}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por gerencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las gerencias</SelectItem>
                {gerencias.map((gerencia) => (
                  <SelectItem key={gerencia} value={gerencia}>
                    {gerencia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {estados.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Filtrar por cargo..."
              value={filtroCargo}
              onChange={(e) => setFiltroCargo(e.target.value)}
            />
            <Button variant="outline" onClick={limpiarFiltros}>
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>
            Empleados ({empleadosOrdenados.length} {empleadosOrdenados.length === 1 ? "resultado" : "resultados"})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Nombre</TableHead>
                  <TableHead className="font-semibold">Apellido</TableHead>
                  <TableHead className="font-semibold">DNI</TableHead>
                  <TableHead className="font-semibold">Gerencia</TableHead>
                  <TableHead className="font-semibold">Departamento</TableHead>
                  <TableHead className="font-semibold">Cargo</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="font-semibold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empleadosPaginados.map((empleado) => (
                  <TableRow key={empleado.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{empleado.nombre}</TableCell>
                    <TableCell>{empleado.apellido}</TableCell>
                    <TableCell>{empleado.dni}</TableCell>
                    <TableCell>{empleado.gerencia}</TableCell>
                    <TableCell>{empleado.departamento}</TableCell>
                    <TableCell>{empleado.cargo}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          empleado.estado === "Activo"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : empleado.estado === "Inactivo"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : empleado.estado === "Licencia"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {empleado.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem onClick={() => verPerfilEmpleado(empleado.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver perfil empleado
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => editarEmpleado(empleado.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar datos
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => verActividadEmpleado(empleado.id)}>
                            <Activity className="mr-2 h-4 w-4" />
                            Ver actividad
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => abrirModalBaja(empleado)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Dar de baja
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-1 py-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
              >
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground mx-4">
                {paginaActual}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de confirmación de baja */}
      <ConfirmarBajaEmpleadoModal
        empleado={empleadoParaBaja}
        isOpen={isModalBajaOpen}
        onClose={cerrarModalBaja}
        onConfirm={manejarBajaEmpleado}
      />
    </div>
  )
}
