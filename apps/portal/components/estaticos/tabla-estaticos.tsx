"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react"
import type { TipoCampoEstatico } from "./filtros-estaticos"

export interface CampoEstatico {
  id: number
  nombre: string
  tipo: TipoCampoEstatico
  uso: number
  estado: "Activo" | "Inactivo"
  formulario: string
  ultimaModificacion: string
  valores: { valor: string; activo: boolean; roles: string[] }[]
  descripcion?: string
}

interface TablaEstaticosProps {
  campos: CampoEstatico[]
  onVer: (campo: CampoEstatico) => void
  onEditar: (campo: CampoEstatico) => void
  onEliminar: (campo: CampoEstatico) => void
}

const tipoLabels: Record<TipoCampoEstatico, string> = {
  select: "Select",
  multiselect: "Multiselect",
  radiobutton: "Radio button",
  checkbox: "Checkbox",
}

export function TablaEstaticos({ campos, onVer, onEditar, onEliminar }: TablaEstaticosProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const closeMenu = () => setOpenMenuId(null)

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Campos estáticos</h2>
        <p className="text-sm text-gray-500">Configuración de campos seleccionables que se reutilizan en formularios.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Campo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Formulario</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Ult. modificación</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {campos.length > 0 ? (
              campos.map((campo) => (
                <tr key={campo.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="font-medium">{campo.nombre}</div>
                    <div className="text-xs text-gray-500">
                      Valores activos: {campo.valores.filter((v) => v.activo).length} / {campo.valores.length}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{tipoLabels[campo.tipo]}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{campo.formulario}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{campo.ultimaModificacion}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    <DropdownMenu open={openMenuId === campo.id} onOpenChange={(open) => setOpenMenuId(open ? campo.id : null)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            closeMenu()
                            onVer(campo)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            closeMenu()
                            onEditar(campo)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Modificar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => {
                            closeMenu()
                            onEliminar(campo)
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
                <td colSpan={6} className="px-4 py-8 text-sm text-center text-gray-500 italic">
                  No se encontraron campos con los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200">
        <div>Mostrando {campos.length} registro{campos.length !== 1 ? "s" : ""}</div>
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
