"use client"

import type React from "react"

import { useState } from "react"
import { MoreVertical, Building, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GuardarBorradorModal } from "./guardar-borrador-modal"

interface Direccion {
  id: string
  tipo: string
  calle: string
  sinNumero: boolean
  numero?: string
  piso?: string
  departamento?: string
  codigoPostal: string
  pais: string
  provincia: string
  ciudad: string
  comentarios?: string
}

interface DireccionesFormProps {
  onSave: (data: any) => void
  onSaveDraft: () => void
  onSubmit?: (data?: any) => boolean
  onNext?: () => void
  onCancel: () => void
  initialData?: any
  readOnly?: boolean
}

export default function DireccionesForm({
  onSave,
  onSaveDraft,
  onSubmit,
  onNext,
  onCancel,
  initialData = {},
  readOnly,
}: DireccionesFormProps) {
  const [direcciones, setDirecciones] = useState<Direccion[]>(initialData.direcciones || [])
  const [formData, setFormData] = useState<Omit<Direccion, "id">>({
    tipo: "",
    calle: "",
    sinNumero: false,
    numero: "",
    piso: "",
    departamento: "",
    codigoPostal: "",
    pais: "Argentina",
    provincia: "",
    ciudad: "",
    comentarios: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showBorradorModal, setShowBorradorModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newFormData = {
      ...formData,
      [name]: value,
    }
    setFormData(newFormData)
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleAddDireccion = (e: React.FormEvent) => {
    e.preventDefault()

    let newDirecciones: Direccion[]
    
    if (editingId) {
      // Actualizar dirección existente
      newDirecciones = direcciones.map((dir) => (dir.id === editingId ? { ...formData, id: editingId } : dir))
      setDirecciones(newDirecciones)
      setEditingId(null)
    } else {
      // Agregar nueva dirección
      const newDireccion: Direccion = {
        ...formData,
        id: Date.now().toString(),
      }
      newDirecciones = [...direcciones, newDireccion]
      setDirecciones(newDirecciones)
    }

    // Guardar automáticamente los datos cuando se agrega/edita una dirección
    onSave({ direcciones: newDirecciones })

    // Limpiar formulario
    setFormData({
      tipo: "",
      calle: "",
      sinNumero: false,
      numero: "",
      piso: "",
      departamento: "",
      codigoPostal: "",
      pais: "Argentina",
      provincia: "",
      ciudad: "",
      comentarios: "",
    })
  }

  const handleEditDireccion = (direccion: Direccion) => {
    setFormData({
      tipo: direccion.tipo,
      calle: direccion.calle,
      sinNumero: direccion.sinNumero,
      numero: direccion.numero,
      piso: direccion.piso,
      departamento: direccion.departamento,
      codigoPostal: direccion.codigoPostal,
      pais: direccion.pais,
      provincia: direccion.provincia,
      ciudad: direccion.ciudad,
      comentarios: direccion.comentarios,
    })
    setEditingId(direccion.id)
  }

  const handleDeleteDireccion = (id: string) => {
    const newDirecciones = direcciones.filter((dir) => dir.id !== id)
    setDirecciones(newDirecciones)
    
    // Guardar automáticamente los datos cuando se elimina una dirección
    onSave({ direcciones: newDirecciones })
    
    if (editingId === id) {
      setEditingId(null)
      setFormData({
        tipo: "",
        calle: "",
        sinNumero: false,
        numero: "",
        piso: "",
        departamento: "",
        codigoPostal: "",
        pais: "Argentina",
        provincia: "",
        ciudad: "",
        comentarios: "",
      })
    }
  }

  const handleSubmit = () => {
    onSave({ direcciones })
    
    // Si hay función de validación, ejecutarla con los datos actuales
    if (onSubmit) {
      return onSubmit({ direcciones })
    }
    return true
  }

  const handleNext = () => {
    onSave({ direcciones })
    
    // Si hay función de next, ejecutarla para avanzar
    if (onNext) {
      onNext()
    }
  }

  const handleSaveDraftClick = () => {
    onSave({ direcciones })
    onSaveDraft()
    setShowBorradorModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg">
        <div>
          <h2 className="text-xl font-semibold mb-4">Domicilios</h2>

          {direcciones.length > 0 && (
            <div className="mb-6 space-y-4">
              {direcciones.map((direccion) => (
                <div key={direccion.id} className="border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <Building className="h-5 w-5 mt-0.5 text-gray-500" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {direccion.calle} {!direccion.sinNumero && direccion.numero}
                            </span>
                            <span className="text-sm font-medium px-2 py-0.5 bg-gray-100 rounded">
                              {direccion.tipo}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Cod. Postal: {direccion.codigoPostal} - {direccion.ciudad} - {direccion.provincia}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditDireccion(direccion)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteDireccion(direccion.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleAddDireccion} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Domicilio <span className="text-red-500">*</span>
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Legal">Legal</option>
                  <option value="Fiscal">Fiscal</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>

              <div>
                <label htmlFor="calle" className="block text-sm font-medium text-gray-700 mb-1">
                  Calle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="calle"
                  name="calle"
                  value={formData.calle}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                  placeholder="Ingrese la calle"
                  required
                />
              </div>

              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">
                    Número
                  </label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                    placeholder="Número"
                    disabled={formData.sinNumero}
                  />
                </div>
                <div className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sinNumero"
                      checked={formData.sinNumero}
                      onChange={handleCheckboxChange}
                      className="rounded border-gray-300 text-plp-primary focus:ring-plp-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Sin número</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="piso" className="block text-sm font-medium text-gray-700 mb-1">
                    Piso
                  </label>
                  <input
                    type="text"
                    id="piso"
                    name="piso"
                    value={formData.piso}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                    placeholder="Piso"
                  />
                </div>
                <div>
                  <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-1">
                    Departamento
                  </label>
                  <input
                    type="text"
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                    placeholder="Depto."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="codigoPostal"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                  placeholder="Código Postal"
                  required
                />
              </div>

              <div>
                <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-1">
                  País <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="pais"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary bg-gray-100"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-1">
                  Provincia <span className="text-red-500">*</span>
                </label>
                <select
                  id="provincia"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                  required
                >
                  <option value="">Seleccione una provincia</option>
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                  <option value="Catamarca">Catamarca</option>
                  <option value="Chaco">Chaco</option>
                  <option value="Chubut">Chubut</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Corrientes">Corrientes</option>
                  <option value="Entre Ríos">Entre Ríos</option>
                  <option value="Formosa">Formosa</option>
                  <option value="Jujuy">Jujuy</option>
                  <option value="La Pampa">La Pampa</option>
                  <option value="La Rioja">La Rioja</option>
                  <option value="Mendoza">Mendoza</option>
                  <option value="Misiones">Misiones</option>
                  <option value="Neuquén">Neuquén</option>
                  <option value="Río Negro">Río Negro</option>
                  <option value="Salta">Salta</option>
                  <option value="San Juan">San Juan</option>
                  <option value="San Luis">San Luis</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="Santa Fe">Santa Fe</option>
                  <option value="Santiago del Estero">Santiago del Estero</option>
                  <option value="Tierra del Fuego">Tierra del Fuego</option>
                  <option value="Tucumán">Tucumán</option>
                </select>
              </div>

              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad <span className="text-red-500">*</span>
                </label>
                <select
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                  required
                  disabled={!formData.provincia}
                >
                  <option value="">Seleccione una ciudad</option>
                  {formData.provincia === "Buenos Aires" && (
                    <>
                      <option value="La Plata">La Plata</option>
                      <option value="Mar del Plata">Mar del Plata</option>
                      <option value="Bahía Blanca">Bahía Blanca</option>
                      <option value="Tandil">Tandil</option>
                      <option value="San Nicolás">San Nicolás</option>
                      <option value="Ensenada">Ensenada</option>
                    </>
                  )}
                  {formData.provincia === "CABA" && (
                    <option value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
                  )}
                  {/* Agregar más ciudades para otras provincias según sea necesario */}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-1">
                Comentarios
              </label>
              <textarea
                id="comentarios"
                name="comentarios"
                value={formData.comentarios}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                placeholder="Ingrese comentarios adicionales sobre este domicilio"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#002169] text-white rounded-md hover:bg-blue-900 font-medium"
              >
                {editingId ? "Actualizar Domicilio" : "Agregar Domicilio"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
        >
          {readOnly ? "Volver" : "Cancelar"}
        </button>
        {!readOnly && (
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleSaveDraftClick}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Guardar Borrador
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-[#002169] text-white rounded-md hover:bg-blue-900 font-medium"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Modal de borrador guardado */}
      <GuardarBorradorModal isOpen={showBorradorModal} onClose={() => setShowBorradorModal(false)} />
    </div>
  )
}
