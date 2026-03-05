"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { showValidationError, showDraftSaved, showEmpresaServiciosPortuariosCreated } from "@/lib/sweetalert"
import DatosGeneralesEmpresaServiciosPortuarios from "./datos-generales-empresa-servicios-portuarios"
import DireccionesEmpresaServiciosPortuarios from "./direcciones-empresa-servicios-portuarios"
import InformacionComercialEmpresa from "./informacion-comercial-empresa"

interface AltaEmpresaServiciosPortuariosProps {
  draftId?: string
  readOnly?: boolean
  defaultData?: any
  backUrl?: string
}

export default function AltaEmpresaServiciosPortuarios({ draftId, readOnly, defaultData, backUrl = "/usuario-basico/gestion/mis-entidades" }: AltaEmpresaServiciosPortuariosProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<any>(readOnly ? defaultData ?? {} : {})
  const [isLoading, setIsLoading] = useState(!readOnly)
  const [validationErrors, setValidationErrors] = useState({
    datosGenerales: false,
    direcciones: false,
    informacionComercial: false
  })
  const readOnlyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!readOnly || !readOnlyRef.current) return
    const el = readOnlyRef.current
    el.querySelectorAll("input, select, textarea").forEach((node) => {
      const n = node as HTMLInputElement
      n.disabled = true
      n.classList.add("bg-gray-100", "cursor-not-allowed", "opacity-90")
    })
  }, [readOnly, step])

  // Cargar datos del borrador si existe (solo cuando no es readOnly)
  useEffect(() => {
    if (readOnly) {
      setIsLoading(false)
      return
    }
    if (draftId) {
      const savedDrafts = JSON.parse(localStorage.getItem("empresaServiciosPortuariosDrafts") || "{}")
      const draftData = savedDrafts[draftId]

      if (draftData) {
        setFormData(draftData.data || {})
        if (draftData.lastStep) {
          setStep(draftData.lastStep)
        }
      }
    }
    setIsLoading(false)
  }, [draftId, readOnly])

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleStepChange = (newStep: number) => {
    setStep(newStep)
    setValidationErrors(prev => ({
      ...prev,
      [newStep === 1 ? 'datosGenerales' : newStep === 2 ? 'direcciones' : 'informacionComercial']: false
    }))
  }

  const handleSaveData = (data: any) => {
    setFormData((prev: any) => {
      const mergedData = { ...prev }
      
      if (data.direcciones) {
        mergedData.direcciones = data.direcciones
      }
      
      if (data.documentos) {
        mergedData.documentos = { ...prev.documentos, ...data.documentos }
      }
      
      Object.keys(data).forEach(key => {
        if (key !== 'direcciones' && key !== 'documentos') {
          mergedData[key] = data[key]
        }
      })
      
      return mergedData
    })
  }

  const validateAndShowErrors = (currentFormData?: any) => {
    const dataToValidate = currentFormData ? { ...formData, ...currentFormData } : formData
    
    const datosGeneralesError = validateDatosGenerales(dataToValidate)
    const direccionesError = validateDirecciones(dataToValidate)
    const informacionComercialError = validateInformacionComercial(dataToValidate)
    
    setValidationErrors({
      datosGenerales: !!datosGeneralesError,
      direcciones: !!direccionesError,
      informacionComercial: !!informacionComercialError
    })

    if (datosGeneralesError || direccionesError || informacionComercialError) {
      let tabsWithErrors = []
      
      if (datosGeneralesError) tabsWithErrors.push(datosGeneralesError)
      if (direccionesError) tabsWithErrors.push(direccionesError)
      if (informacionComercialError) tabsWithErrors.push(informacionComercialError)
      
      showValidationError(tabsWithErrors)
      
      if (datosGeneralesError) {
        setStep(1)
      } else if (direccionesError) {
        setStep(2)
      } else if (informacionComercialError) {
        setStep(3)
      }
      
      return false
    }

    return true
  }

  const validateDatosGenerales = (data: any) => {
    const requiredFields = [
      'naturalezaOrganizacion',
      'tipoSocietario',
      'razonSocial',
      'cuitCuil',
      'ultimaActividad',
      'convenioMultilateral',
      'exencionesImpositivas'
    ]
    
    const missingFields = requiredFields.filter(field => {
      const value = data[field]
      return !value || (typeof value === 'string' && value.trim() === '')
    })
    
    // Validar que al menos una categoría de servicios portuarios esté seleccionada
    if (!data.categoriasServiciosPortuarios || data.categoriasServiciosPortuarios.length === 0) {
      return 'Datos Generales'
    }
    
    return missingFields.length > 0 ? 'Datos Generales' : null
  }

  const validateDirecciones = (data: any) => {
    if (!data.direcciones || data.direcciones.length === 0) {
      return 'Direcciones'
    }
    
    const hasValidAddress = data.direcciones.some((dir: any) => {
      return dir.calle && dir.calle.trim() !== ''
    })
    
    return hasValidAddress ? null : 'Direcciones'
  }

  const validateInformacionComercial = (data: any) => {
    const requiredFields = [
      'nombreContacto',
      'cargoContacto',
      'telefonoContacto',
      'emailContacto'
    ]
    
    const missingFields = requiredFields.filter(field => {
      const value = data[field]
      return !value || (typeof value === 'string' && value.trim() === '')
    })
    
    return missingFields.length > 0 ? 'Información Comercial' : null
  }

  const validateAndSubmit = (currentFormData?: any) => {
    if (!validateAndShowErrors(currentFormData)) {
      return false
    }

    if (draftId) {
      const savedDrafts = JSON.parse(localStorage.getItem("empresaServiciosPortuariosDrafts") || "{}")
      delete savedDrafts[draftId]
      localStorage.setItem("empresaServiciosPortuariosDrafts", JSON.stringify(savedDrafts))
    }

    showEmpresaServiciosPortuariosCreated()
    router.push("/usuario-basico/gestion/mis-entidades")
    return true
  }

  const handleSaveDraft = () => {
    const draftKey = draftId || `draft_${Date.now()}`
    const savedDrafts = JSON.parse(localStorage.getItem("empresaServiciosPortuariosDrafts") || "{}")

    savedDrafts[draftKey] = {
      id: draftKey,
      data: formData,
      lastStep: step,
      timestamp: Date.now(),
      nombre: formData.razonSocial || "Empresa sin nombre",
      cuit: formData.cuit || "Sin CUIT",
      tipo: "Empresa Servicios Portuarios",
      estado: "Borrador",
    }

    localStorage.setItem("empresaServiciosPortuariosDrafts", JSON.stringify(savedDrafts))
    showDraftSaved()
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Cargando datos...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="w-full flex space-x-2">
            <StepButton 
              step={1} 
              currentStep={step} 
              label="Datos Generales" 
              onClick={() => handleStepChange(1)} 
              hasError={validationErrors.datosGenerales}
            />
            <StepButton 
              step={2} 
              currentStep={step} 
              label="Direcciones" 
              onClick={() => handleStepChange(2)} 
              hasError={validationErrors.direcciones}
            />
            <StepButton
              step={3}
              currentStep={step}
              label="Información Comercial"
              onClick={() => handleStepChange(3)}
              hasError={validationErrors.informacionComercial}
            />
          </div>
        </div>
      </div>

      <div ref={readOnlyRef} className="mt-6">
        {step === 1 && (
          <DatosGeneralesEmpresaServiciosPortuarios
            onSave={handleSaveData}
            onNext={handleNext}
            onSaveDraft={handleSaveDraft}
            onSubmit={validateAndShowErrors}
            initialData={formData}
            onCancel={() => router.push(backUrl)}
            readOnly={readOnly}
          />
        )}
        {step === 2 && (
          <DireccionesEmpresaServiciosPortuarios
            onSave={handleSaveData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
            initialData={formData}
            onCancel={() => router.push(backUrl)}
            readOnly={readOnly}
          />
        )}
        {step === 3 && (
          <InformacionComercialEmpresa
            onSave={handleSaveData}
            onSubmit={validateAndSubmit}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
            initialData={formData}
            onCancel={() => router.push(backUrl)}
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  )
}

interface StepButtonProps {
  step: number
  currentStep: number
  label: string
  onClick: () => void
  hasError?: boolean
}

function StepButton({ step, currentStep, label, onClick, hasError = false }: StepButtonProps) {
  const isActive = step === currentStep

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 py-3 px-4 text-center rounded-md border transition-all relative
        ${
          isActive
            ? "border-[#002169] bg-white text-[#002169] font-medium shadow-sm"
            : hasError
            ? "border-red-300 bg-red-50 text-red-600 cursor-pointer hover:bg-red-100"
            : "border-gray-200 bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100"
        }
      `}
    >
      {label}
      {hasError && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      )}
    </button>
  )
}