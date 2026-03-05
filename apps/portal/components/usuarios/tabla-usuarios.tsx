"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, MoreVertical, Pencil, Trash2, KeyRound, ShieldCheck } from "lucide-react"

export interface Usuario {
  id: number
  email: string
  nombre: string
  apellido: string
  dni: string
  telefono: string
  fechaNacimiento: string
  estado: "Activo" | "Inactivo" | "Bloqueado"
  roles: string[]
}

interface TablaUsuariosProps {
  usuarios: Usuario[]
  onVer: (usuario: Usuario) => void
  onEditar: (usuario: Usuario) => void
  onEliminar: (usuario: Usuario) => void
  onResetPassword: (usuario: Usuario) => void
  onGestionarRoles: (usuario: Usuario) => void
}

const estadoClasses: Record<Usuario["estado"], string> = {
  Activo: "bg-green-100 text-green-800 hover:bg-green-100",
  Inactivo: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  Bloqueado: "bg-red-100 text-red-800 hover:bg-red-100",
}

export function TablaUsuarios({
  usuarios,
  onVer,
  onEditar,
  onEliminar,
  onResetPassword,
  onGestionarRoles,
}: TablaUsuariosProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const closeMenu = () => setOpenMenuId(null)

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Usuarios</h2>
        <p className="text-sm text-gray-500">Administrá datos, roles y acceso de los usuarios.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Apellido</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">DNI</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Teléfono</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha nacimiento</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Roles</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-900">{usuario.email}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{usuario.nombre}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{usuario.apellido}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{usuario.dni}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{usuario.telefono}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{usuario.fechaNacimiento}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <Badge variant="outline" className={estadoClasses[usuario.estado]}>
                      {usuario.estado}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {usuario.roles.length > 0 ? (
                      <div className="flex items-center gap-1">
                        <span>{usuario.roles[0]}</span>
                        {usuario.roles.length > 1 && (
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-xs text-gray-500 underline cursor-default">
                                  +{usuario.roles.length - 1}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs text-gray-100 bg-gray-900 rounded px-2 py-1">
                                  {usuario.roles.slice(1).join(", ")}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">Sin roles</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    <DropdownMenu open={openMenuId === usuario.id} onOpenChange={(open) => setOpenMenuId(open ? usuario.id : null)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            closeMenu()
                            onVer(usuario)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            closeMenu()
                            onEditar(usuario)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            closeMenu()
                            onGestionarRoles(usuario)
                          }}
                        >
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Roles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            closeMenu()
                            onResetPassword(usuario)
                          }}
                        >
                          <KeyRound className="mr-2 h-4 w-4" />
                          Reset password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => {
                            closeMenu()
                            onEliminar(usuario)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-sm text-center text-gray-500 italic">
                  No se encontraron usuarios con los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200">
        <div>Mostrando {usuarios.length} registro{usuarios.length !== 1 ? "s" : ""}</div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
