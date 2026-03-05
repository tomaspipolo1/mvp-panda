"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import type { CampoEstatico } from "./tabla-estaticos"
import type { TipoCampoEstatico } from "./filtros-estaticos"

type ModalMode = "view" | "edit"

interface CampoEstaticoModalProps {
  isOpen: boolean
  mode: ModalMode
  campo: CampoEstatico | null
  onClose: () => void
  onGuardar?: (campo: CampoEstatico) => void
}

const tipoOptions: { value: TipoCampoEstatico; label: string }[] = [
  { value: "select", label: "Select" },
  { value: "multiselect", label: "Multiselect" },
  { value: "radiobutton", label: "Radio button" },
  { value: "checkbox", label: "Checkbox" },
]

export function CampoEstaticoModal({ isOpen, mode, campo, onClose, onGuardar }: CampoEstaticoModalProps) {
  const [valorNuevo, setValorNuevo] = useState("")
  const [rolesNuevo, setRolesNuevo] = useState<string[]>([])
  const [localCampo, setLocalCampo] = useState<CampoEstatico | null>(campo)
  const rolesDisponibles = ["Admin", "Compras", "Seguridad", "RRHH", "Legal", "Prensa", "Contable", "Mesa de Entradas", "Guardia"]

  useEffect(() => {
    setLocalCampo(campo)
    setValorNuevo("")
    setRolesNuevo([])
  }, [campo, isOpen])

  const isReadOnly = mode === "view"
  const titulo = mode === "view" ? "Detalle del campo" : "Editar campo"

  const valoresDisponibles = useMemo(() => localCampo?.valores || [], [localCampo])

  const handleAgregarValor = () => {
    if (!localCampo || !valorNuevo.trim()) return
    if (localCampo.valores.some((v) => v.valor.toLowerCase() === valorNuevo.trim().toLowerCase())) return

    setLocalCampo({
      ...localCampo,
      valores: [...localCampo.valores, { valor: valorNuevo.trim(), activo: true, roles: rolesNuevo }],
    })
    setValorNuevo("")
    setRolesNuevo([])
  }

  const handleGuardar = () => {
    if (!localCampo || !onGuardar) return
    onGuardar(localCampo)
  }

  if (!isOpen || !campo) return null

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{titulo}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Consulta los valores asociados y el estado del campo estático.
          </DialogDescription>
        </DialogHeader>

        {localCampo && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre del campo</Label>
                <Input
                  id="nombre"
                  value={localCampo.nombre}
                  onChange={(e) => setLocalCampo({ ...localCampo, nombre: e.target.value })}
                  disabled={isReadOnly}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select
                  value={localCampo.tipo}
                  onValueChange={(value: TipoCampoEstatico) => setLocalCampo({ ...localCampo, tipo: value })}
                  disabled={isReadOnly}
                >
                  <SelectTrigger id="tipo" className="mt-1">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipoOptions.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Label>Valores</Label>
                  <p className="text-xs text-gray-500">
                    {valoresDisponibles.length} opciones disponibles. Activá o desactivá sin eliminarlas.
                  </p>
                </div>
                {!isReadOnly && (
                  <div className="flex gap-2 items-center flex-nowrap">
                    <Input
                      placeholder="Agregar valor"
                      value={valorNuevo}
                      onChange={(e) => setValorNuevo(e.target.value)}
                      className="w-48 flex-shrink-0"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" type="button" className="flex-shrink-0">
                          Roles
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Roles permitidos</p>
                          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                            {rolesDisponibles.map((rol) => (
                              <label key={rol} className="flex items-center space-x-2 text-sm">
                                <Checkbox
                                  checked={rolesNuevo.includes(rol)}
                                  onCheckedChange={(checked) =>
                                    setRolesNuevo((prev) =>
                                      checked ? [...prev, rol] : prev.filter((r) => r !== rol)
                                    )
                                  }
                                />
                                <span>{rol}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button
                      type="button"
                      onClick={handleAgregarValor}
                      className="bg-plp-dark hover:bg-plp-medium flex-shrink-0"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar
                    </Button>
                  </div>
                )}
              </div>

              {valoresDisponibles.length > 0 ? (
                <div className="space-y-2">
                  {valoresDisponibles.map((item, idx) => (
                    <div
                      key={`${item.valor}-${idx}`}
                      className="flex items-center justify-between rounded-md border px-3 py-2 bg-gray-50"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800">{item.valor}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.roles.length > 0 ? (
                            item.roles.map((rol) => (
                              <Badge key={rol} variant="secondary" className="text-xs">
                                {rol}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs text-gray-500">Sin roles asignados</span>
                          )}
                        </div>
                        
                      </div>
                      <div className="flex items-center gap-2">
                        {!isReadOnly && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">Roles</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Roles permitidos</p>
                                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                                  {rolesDisponibles.map((rol) => (
                                    <label key={rol} className="flex items-center space-x-2 text-sm">
                                      <Checkbox
                                        checked={item.roles.includes(rol)}
                                        onCheckedChange={(checked) => {
                                          if (!localCampo) return
                                          setLocalCampo({
                                            ...localCampo,
                                            valores: localCampo.valores.map((v, i) =>
                                              i === idx
                                                ? {
                                                    ...v,
                                                    roles: checked
                                                      ? [...v.roles, rol]
                                                      : v.roles.filter((r) => r !== rol),
                                                  }
                                                : v
                                            ),
                                          })
                                        }}
                                      />
                                      <span>{rol}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">Visible</span>
                          <Switch
                            checked={item.activo}
                            disabled={isReadOnly}
                            onCheckedChange={(checked) =>
                              setLocalCampo({
                                ...localCampo,
                                valores: localCampo.valores.map((v, i) =>
                                  i === idx ? { ...v, activo: checked } : v
                                ),
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-500">Sin valores configurados.</span>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {mode === "edit" && (
            <Button
              onClick={handleGuardar}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!localCampo?.nombre.trim() || valoresDisponibles.length === 0}
            >
              Guardar cambios
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
