"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { showDeleteConfirm, showError, showSuccess } from "@/lib/sweetalert"
import { ResourceCategoryCard } from "./resource-category-card"
import { ResourceCategoryFormModal } from "./resource-category-form-modal"
import type { ResourceCategoryFormValues, ResourceCategoryItem } from "./types"

interface ResourceCatalogBoardProps {
  title: string
  description: string
  initialItems: ResourceCategoryItem[]
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

export function ResourceCatalogBoard({ title, description, initialItems }: ResourceCatalogBoardProps) {
  const [items, setItems] = useState<ResourceCategoryItem[]>(initialItems)
  const [openModal, setOpenModal] = useState(false)
  const [editingItem, setEditingItem] = useState<ResourceCategoryItem | null>(null)

  const createFileUrl = (file: File) => URL.createObjectURL(file)

  const handleCreate = (values: ResourceCategoryFormValues) => {
    if (!values.title.trim() || !values.description.trim() || !values.fileTitle.trim()) {
      showError("Campos incompletos", "Completa todos los campos antes de guardar.")
      return
    }

    if (!values.selectedFile) {
      showError("Archivo requerido", "Debes seleccionar un archivo para crear la card.")
      return
    }

    const newItem: ResourceCategoryItem = {
      id: crypto.randomUUID(),
      icon: values.icon,
      title: values.title.trim(),
      description: values.description.trim(),
      file: {
        title: values.fileTitle.trim(),
        fileName: values.selectedFile.name,
        fileSize: formatFileSize(values.selectedFile.size),
        fileDate: formatFileDate(values.selectedFile.lastModified),
        fileUrl: createFileUrl(values.selectedFile),
      },
    }

    setItems((prev) => [newItem, ...prev])
    setOpenModal(false)
    setEditingItem(null)
    showSuccess("Card creada")
  }

  const handleUpdate = (currentItem: ResourceCategoryItem, values: ResourceCategoryFormValues) => {
    if (!values.title.trim() || !values.description.trim() || !values.fileTitle.trim()) {
      showError("Campos incompletos", "Completa todos los campos antes de guardar.")
      return
    }

    const nextItem: ResourceCategoryItem = {
      ...currentItem,
      icon: values.icon,
      title: values.title.trim(),
      description: values.description.trim(),
      file: values.selectedFile
        ? {
            title: values.fileTitle.trim(),
            fileName: values.selectedFile.name,
            fileSize: formatFileSize(values.selectedFile.size),
            fileDate: formatFileDate(values.selectedFile.lastModified),
            fileUrl: createFileUrl(values.selectedFile),
          }
        : {
            ...currentItem.file,
            title: values.fileTitle.trim(),
          },
    }

    setItems((prev) => prev.map((item) => (item.id === currentItem.id ? nextItem : item)))
    setOpenModal(false)
    setEditingItem(null)
    showSuccess("Card actualizada")
  }

  const handleSubmitModal = (values: ResourceCategoryFormValues) => {
    if (!editingItem) {
      handleCreate(values)
      return
    }
    handleUpdate(editingItem, values)
  }

  const handleDelete = async (item: ResourceCategoryItem) => {
    const result = await showDeleteConfirm(item.title)
    if (!result.isConfirmed) return
    setItems((prev) => prev.filter((currentItem) => currentItem.id !== item.id))
    showSuccess("Card eliminada")
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-plp-darkest">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>

        <Button
          onClick={() => {
            setEditingItem(null)
            setOpenModal(true)
          }}
          className="bg-[#002060] hover:bg-[#001a4d] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva card
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <ResourceCategoryCard
            key={item.id}
            item={item}
            onEdit={(itemToEdit) => {
              setEditingItem(itemToEdit)
              setOpenModal(true)
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ResourceCategoryFormModal
        open={openModal}
        onOpenChange={(open) => {
          setOpenModal(open)
          if (!open) setEditingItem(null)
        }}
        editingItem={editingItem}
        onSubmit={handleSubmitModal}
      />
    </div>
  )
}
