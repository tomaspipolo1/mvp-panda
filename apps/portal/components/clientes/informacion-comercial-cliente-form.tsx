"use client"

import type React from "react"
import { useState } from "react"


interface InformacionComercialClienteFormProps {
  onSave: (data: any) => void
  onSubmit: (data?: any) => boolean
  onPrevious: () => void
  onSaveDraft?: () => void
  initialData?: any
  onCancel?: () => void
  readOnly?: boolean
}

export default function InformacionComercialClienteForm({
  onSave,
  onSubmit,
  onPrevious,
  onSaveDraft,
  initialData = {},
  onCancel,
  readOnly,
}: InformacionComercialClienteFormProps) {
  const [formData, setFormData] = useState({
    nombreContacto: initialData.nombreContacto || "",
    cargoContacto: initialData.cargoContacto || "",
    telefonoContacto: initialData.telefonoContacto || "",
    emailContacto: initialData.emailContacto || "",
    sitioWeb: initialData.sitioWeb || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }



  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmitForm} className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Información de Contacto</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label htmlFor="nombreContacto" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Contacto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nombreContacto"
            name="nombreContacto"
            value={formData.nombreContacto}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el nombre del contacto"
            required
          />
        </div>

        <div>
          <label htmlFor="cargoContacto" className="block text-sm font-medium text-gray-700 mb-1">
            Cargo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cargoContacto"
            name="cargoContacto"
            value={formData.cargoContacto}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el cargo"
            required
          />
        </div>

        <div>
          <label htmlFor="telefonoContacto" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telefonoContacto"
            name="telefonoContacto"
            value={formData.telefonoContacto}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el teléfono"
            required
          />
        </div>

        <div>
          <label htmlFor="emailContacto" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="emailContacto"
            name="emailContacto"
            value={formData.emailContacto}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el email"
            required
          />
        </div>

        <div>
          <label htmlFor="sitioWeb" className="block text-sm font-medium text-gray-700 mb-1">
            Sitio Web
          </label>
          <input
            type="url"
            id="sitioWeb"
            name="sitioWeb"
            value={formData.sitioWeb}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el sitio web"
          />
        </div>
      </div>



      <div className="flex justify-between space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel || onPrevious}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          {readOnly ? "Volver" : "Cancelar"}
        </button>
        {!readOnly && (
          <div className="flex space-x-4">
            {onSaveDraft && (
              <button
                type="button"
                onClick={onSaveDraft}
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
            )}
            <button type="submit" className="px-4 py-2 bg-[#002169] text-white rounded-md hover:bg-blue-900 font-medium">
              Enviar solicitud
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
