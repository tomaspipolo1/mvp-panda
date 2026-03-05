"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, FileText, HardDrive } from "lucide-react"
import { RESOURCE_ICON_OPTIONS } from "./icon-options"
import type { ResourceCategoryFormValues, ResourceCategoryItem, ResourceIconKey } from "./types"

interface ResourceCategoryFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: ResourceCategoryFormValues) => void
  editingItem: ResourceCategoryItem | null
}

const EMPTY_FORM: ResourceCategoryFormValues = {
  icon: "dollar-sign",
  title: "",
  description: "",
  fileTitle: "",
  selectedFile: null,
}

const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 KB"
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(2)} MB`
}

const formatFileDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

export function ResourceCategoryFormModal({
  open,
  onOpenChange,
  onSubmit,
  editingItem,
}: ResourceCategoryFormModalProps) {
  const [formValues, setFormValues] = useState<ResourceCategoryFormValues>(EMPTY_FORM)

  useEffect(() => {
    if (!open) return
    if (editingItem) {
      setFormValues({
        icon: editingItem.icon,
        title: editingItem.title,
        description: editingItem.description,
        fileTitle: editingItem.file.title,
        selectedFile: null,
      })
      return
    }
    setFormValues(EMPTY_FORM)
  }, [editingItem, open])

  const fileStats = useMemo(() => {
    if (!formValues.selectedFile) {
      return editingItem
        ? {
            size: editingItem.file.fileSize,
            date: editingItem.file.fileDate,
          }
        : null
    }

    return {
      size: formatFileSize(formValues.selectedFile.size),
      date: formatFileDate(formValues.selectedFile.lastModified),
    }
  }, [editingItem, formValues.selectedFile])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{editingItem ? "Editar card" : "Nueva card de tarifario"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Icono</Label>
              <Select
                value={formValues.icon}
                onValueChange={(value) => setFormValues((prev) => ({ ...prev, icon: value as ResourceIconKey }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar icono" />
                </SelectTrigger>
                <SelectContent>
                  {RESOURCE_ICON_OPTIONS.map((option) => {
                    const Icon = option.icon
                    return (
                      <SelectItem key={option.key} value={option.key}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titulo-card">Titulo de la card</Label>
              <Input
                id="titulo-card"
                placeholder="Ej: Tarifario de servicios generales"
                value={formValues.title}
                onChange={(event) => setFormValues((prev) => ({ ...prev, title: event.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion-card">Descripcion</Label>
            <Textarea
              id="descripcion-card"
              placeholder="Breve descripcion de la categoria"
              rows={3}
              value={formValues.description}
              onChange={(event) => setFormValues((prev) => ({ ...prev, description: event.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-2">
              <Label htmlFor="titulo-archivo">Titulo del archivo</Label>
              <Input
                id="titulo-archivo"
                placeholder="Ej: Tarifario enero 2026"
                value={formValues.fileTitle}
                onChange={(event) => setFormValues((prev) => ({ ...prev, fileTitle: event.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="archivo">Cargar archivo</Label>
              <Input
                id="archivo"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, selectedFile: event.target.files?.[0] ?? null }))
                }
              />
              <p className="text-xs text-gray-500">Formatos permitidos: PDF, DOC, DOCX, XLS, XLSX (maximo 50 MB).</p>
            </div>
          </div>

          {(formValues.selectedFile || fileStats) && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-gray-500" />
                <span className="truncate">
                  {formValues.selectedFile?.name ?? editingItem?.file.fileName ?? "Sin archivo"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="h-3.5 w-3.5 text-gray-500" />
                <span>{fileStats?.size ?? "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-gray-500" />
                <span>{fileStats?.date ?? "N/A"}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onSubmit(formValues)}>{editingItem ? "Guardar cambios" : "Crear card"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
