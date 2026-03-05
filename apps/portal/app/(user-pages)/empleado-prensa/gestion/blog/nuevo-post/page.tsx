"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, X, Plus, ImageIcon } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ImageWithEpigraph {
  id: string
  file: File | null
  preview: string
  epigraph: string
}

export default function NuevoPostPage() {
  const router = useRouter()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishingStatus, setPublishingStatus] = useState<"loading" | "success" | null>(null)
  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const galleryImageInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toTimeString().slice(0, 5),
    cuerpo: "",
    categoria: "noticias",
  })

  const [mainImage, setMainImage] = useState<{
    file: File | null
    preview: string
  }>({
    file: null,
    preview: "",
  })

  const [galleryImages, setGalleryImages] = useState<ImageWithEpigraph[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMainImage({
        file,
        preview: URL.createObjectURL(file),
      })
    }
  }

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: ImageWithEpigraph[] = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        epigraph: "",
      }))

      setGalleryImages((prev) => [...prev, ...newImages])
    }
  }

  const handleEpigraphChange = (id: string, value: string) => {
    setGalleryImages((prev) => prev.map((img) => (img.id === id ? { ...img, epigraph: value } : img)))
  }

  const removeGalleryImage = (id: string) => {
    setGalleryImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)
      return filtered
    })
  }

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()

    if (isDraft) {
      // Para borradores, mantener el comportamiento actual
      console.log("Guardando como borrador:", {
        ...formData,
        mainImage: mainImage.file,
        galleryImages: galleryImages.map((img) => ({
          file: img.file,
          epigraph: img.epigraph,
        })),
        isDraft,
      })

      // Redirigir a la página de posts
      router.push("/empleado-prensa/gestion/blog/mis-post")
    } else {
      // Para publicación, mostrar el modal de carga
      setIsPublishing(true)
      setPublishingStatus("loading")

      // Simular el proceso de carga
      setTimeout(() => {
        console.log("Publicando post:", {
          ...formData,
          mainImage: mainImage.file,
          galleryImages: galleryImages.map((img) => ({
            file: img.file,
            epigraph: img.epigraph,
          })),
          isDraft: false,
        })

        // Cambiar a estado de éxito
        setPublishingStatus("success")

        // Redirigir después de mostrar el mensaje de éxito
        setTimeout(() => {
          setIsPublishing(false)
          setPublishingStatus(null)
          router.push("/empleado-prensa/gestion/blog/mis-post")
        }, 2000)
      }, 2000)
    }
  }

  const handleSaveDraft = () => {
    setShowConfirmModal(true)
  }

  const confirmSaveDraft = () => {
    setShowConfirmModal(false)
    handleSubmit({ preventDefault: () => {} } as React.FormEvent, true)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          className="flex items-center text-gray-600"
          onClick={() => router.push("/empleado-prensa/gestion/blog/mis-post")}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Volver a Mis Posts
        </Button>
        <h1 className="text-3xl font-bold">Nuevo Post</h1>
        <div className="w-[100px]"></div> {/* Espaciador para centrar el título */}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo" className="text-base font-medium">
              Título
            </Label>
            <Input
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ingrese el título del post"
              className="text-lg"
              required
            />
          </div>

          {/* Subtítulo */}
          <div className="space-y-2">
            <Label htmlFor="subtitulo" className="text-base font-medium">
              Subtítulo
            </Label>
            <Input
              id="subtitulo"
              name="subtitulo"
              value={formData.subtitulo}
              onChange={handleChange}
              placeholder="Ingrese el subtítulo del post"
              required
            />
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha" className="text-base font-medium">
                Fecha
              </Label>
              <Input id="fecha" name="fecha" type="date" value={formData.fecha} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hora" className="text-base font-medium">
                Hora
              </Label>
              <Input id="hora" name="hora" type="time" value={formData.hora} onChange={handleChange} required />
            </div>
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="categoria" className="text-base font-medium">
              Categoría
            </Label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="noticias">Noticias</option>
              <option value="eventos">Eventos</option>
              <option value="comunicados">Comunicados</option>
              <option value="entrevistas">Entrevistas</option>
              <option value="proyectos">Proyectos</option>
            </select>
          </div>

          {/* Imagen Principal */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Imagen Principal</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              {mainImage.preview ? (
                <div className="relative w-full">
                  <div className="relative h-64 w-full">
                    <Image
                      src={mainImage.preview || "/placeholder.svg"}
                      alt="Vista previa"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setMainImage({ file: null, preview: "" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center cursor-pointer py-6"
                  onClick={() => mainImageInputRef.current?.click()}
                >
                  <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-1">Haga clic para seleccionar una imagen</p>
                  <p className="text-xs text-gray-400">PNG, JPG o JPEG (máx. 5MB)</p>
                </div>
              )}
              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleMainImageChange}
              />
            </div>
          </div>

          {/* Cuerpo del Post */}
          <div className="space-y-2">
            <Label htmlFor="cuerpo" className="text-base font-medium">
              Cuerpo del Post
            </Label>
            <Textarea
              id="cuerpo"
              name="cuerpo"
              value={formData.cuerpo}
              onChange={handleChange}
              placeholder="Escriba el contenido completo del post"
              className="min-h-[200px]"
              required
            />
          </div>

          {/* Galería de Imágenes */}
          <div className="space-y-4">
            <Label className="text-xl font-bold">Galería de imágenes</Label>

            {/* Botón para agregar imágenes */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer"
              onClick={() => galleryImageInputRef.current?.click()}
            >
              <Plus className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-500">Agregar imágenes</span>
              <input
                ref={galleryImageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleGalleryImageChange}
              />
            </div>

            {/* Imágenes de la galería */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {galleryImages.map((image) => (
                  <div key={image.id} className="border rounded-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={image.preview || "/placeholder.svg"}
                        alt="Imagen de galería"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => removeGalleryImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-3">
                      <Label htmlFor={`epigraph-${image.id}`} className="text-sm font-medium">
                        Epígrafe
                      </Label>
                      <Textarea
                        id={`epigraph-${image.id}`}
                        value={image.epigraph}
                        onChange={(e) => handleEpigraphChange(image.id, e.target.value)}
                        placeholder="Añada un epígrafe a esta imagen..."
                        className="mt-1 text-sm resize-none h-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              Guardar como borrador
            </Button>
            <Button type="submit">Publicar</Button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación para guardar como borrador */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>¿Guardar como borrador?</DialogTitle>
            <DialogDescription>
              El post se guardará como borrador y podrá editarlo más tarde antes de publicarlo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button type="button" variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={confirmSaveDraft}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Modal de publicación */}
      <Dialog
        open={isPublishing}
        onOpenChange={(open) => {
          // Solo permitir cerrar el modal si no está en proceso de carga
          if (!open && publishingStatus !== "loading") {
            setIsPublishing(false)
            setPublishingStatus(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{publishingStatus === "loading" ? "Publicando post..." : "Post publicado"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            {publishingStatus === "loading" ? (
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-center text-sm text-gray-500">
                  Estamos publicando su post, por favor espere...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">¡Su post ha sido publicado exitosamente!</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
