"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Info, Save } from "lucide-react"
import { GuardarBorradorModal } from "../proveedores/guardar-borrador-modal"

interface Props {
  onSave: (data: any) => void
  onPrevious: () => void
  onSubmit?: (data?: any) => boolean
  onSaveDraft?: () => void
  initialData?: any
  onCancel?: () => void
  readOnly?: boolean
}

export default function InformacionComercialEmpresa({
  onSave,
  onPrevious,
  onSubmit,
  onSaveDraft,
  onCancel,
  initialData = {},
  readOnly,
}: Props) {
  const [formData, setFormData] = useState({
    nombreContacto: "",
    cargoContacto: "",
    telefonoContacto: "",
    emailContacto: "",
    sitioWeb: "",
    cuentaBancaria: "",
    cbu: "",
    alias: "",
    banco: "",
    brochureComercial: null as File | null,
    cartaPresentacion: null as File | null,
    ...initialData,
  })

  const [showBorradorModal, setShowBorradorModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const newFormData = {
      ...formData,
      [name]: value,
    }
    setFormData(newFormData)
    
    // Guardar automáticamente los datos cuando cambian
    onSave(newFormData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      const newFormData = {
        ...formData,
        [fieldName]: e.target.files![0],
      }
      setFormData(newFormData)
      
      // Guardar automáticamente los datos cuando cambian
      onSave(newFormData)
    }
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    
    // Ejecutar la función de validación con los datos actuales
    if (onSubmit) {
      const result = onSubmit(formData)
      console.log("Resultado de validación:", result)
      return result
    }
  }

  const handleSaveDraftClick = () => {
    onSave(formData)
    if (onSaveDraft) {
      onSaveDraft()
    }
    setShowBorradorModal(true)
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

      <h3 className="text-lg font-medium text-gray-700 mb-4 mt-8">Documentación Comercial</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="brochureComercial" className="block text-sm font-medium text-gray-700">
              Brochure Comercial
            </label>
            <div className="relative ml-2 group">
              <Info className="h-4 w-4 text-gray-500" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                Documento que presenta los productos y servicios de la empresa
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="brochureComercial"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">
                {formData.brochureComercial ? formData.brochureComercial.name : "Seleccionar archivo"}
              </span>
              <input
                type="file"
                id="brochureComercial"
                onChange={(e) => handleFileChange(e, "brochureComercial")}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
            </label>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="cartaPresentacion" className="block text-sm font-medium text-gray-700">
              Carta de Presentación
            </label>
            <div className="relative ml-2 group">
              <Info className="h-4 w-4 text-gray-500" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                Documento formal que presenta a la empresa y sus intenciones comerciales
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="cartaPresentacion"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">
                {formData.cartaPresentacion ? formData.cartaPresentacion.name : "Seleccionar archivo"}
              </span>
              <input
                type="file"
                id="cartaPresentacion"
                onChange={(e) => handleFileChange(e, "cartaPresentacion")}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
            </label>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-700 mb-4 mt-8">Información Bancaria</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label htmlFor="cuentaBancaria" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Cuenta
          </label>
          <input
            type="text"
            id="cuentaBancaria"
            name="cuentaBancaria"
            value={formData.cuentaBancaria}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el número de cuenta"
          />
        </div>

        <div>
          <label htmlFor="banco" className="block text-sm font-medium text-gray-700 mb-1">
            Banco
          </label>
          <select
            id="banco"
            name="banco"
            value={formData.banco}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
          >
            <option value="">Seleccione un banco</option>
            <option value="Banco Nación">Banco Nación</option>
            <option value="Banco Provincia">Banco Provincia</option>
            <option value="Banco Ciudad">Banco Ciudad</option>
            <option value="Banco Santander">Banco Santander</option>
            <option value="Banco Galicia">Banco Galicia</option>
            <option value="Banco BBVA">Banco BBVA</option>
            <option value="Banco HSBC">Banco HSBC</option>
            <option value="Banco Macro">Banco Macro</option>
            <option value="Banco Credicoop">Banco Credicoop</option>
          </select>
        </div>

        <div>
          <label htmlFor="cbu" className="block text-sm font-medium text-gray-700 mb-1">
            CBU
          </label>
          <input
            type="text"
            id="cbu"
            name="cbu"
            value={formData.cbu}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el CBU"
          />
        </div>

        <div>
          <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
            Alias
          </label>
          <input
            type="text"
            id="alias"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el alias"
          />
        </div>
      </div>

      <div className="flex justify-between space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel || onPrevious}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
        >
          {readOnly ? "Volver" : "Cancelar"}
        </button>
        {!readOnly && (
          <div className="flex space-x-3">
            {onSaveDraft && (
              <button
                type="button"
                onClick={handleSaveDraftClick}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Borrador
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-[#002169] text-white rounded-md hover:bg-blue-900 font-medium"
            >
              Enviar solicitud
            </button>
          </div>
        )}
      </div>

      {/* Modal de borrador guardado */}
      <GuardarBorradorModal isOpen={showBorradorModal} onClose={() => setShowBorradorModal(false)} />
    </form>
  )
}