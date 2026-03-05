"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { showValidationError, showClientCreated, showDraftSaved } from "@/lib/sweetalert"
import DatosGeneralesClienteForm from "./datos-generales-cliente-form"
import DireccionesForm from "../proveedores/direcciones-form" // Reutilizamos el componente de direcciones
import InformacionComercialClienteForm from "./informacion-comercial-cliente-form"
import { GuardarBorradorModal } from "../proveedores/guardar-borrador-modal"

interface AltaClienteFormProps {
  draftId?: string
  readOnly?: boolean
  defaultData?: any
  backUrl?: string
}

export default function AltaClienteForm({ draftId, readOnly, defaultData, backUrl = "/usuario-basico/gestion/mis-entidades" }: AltaClienteFormProps) {
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
      const savedDrafts = JSON.parse(localStorage.getItem("clienteDrafts") || "{}")
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
    // Guardar los datos del tab actual antes de navegar
    if (step === 1) {
      // Los datos de Datos Generales se guardan automáticamente en handleChange
    } else if (step === 2) {
      // Los datos de Direcciones se guardan automáticamente en handleChange
    } else if (step === 3) {
      // Los datos de Información Comercial se guardan automáticamente en handleChange
    }
    
    setStep(newStep)
    // Limpiar el error de validación del tab al que se navega
    setValidationErrors(prev => ({
      ...prev,
      [newStep === 1 ? 'datosGenerales' : newStep === 2 ? 'direcciones' : 'informacionComercial']: false
    }))
  }

  const handleSaveData = (data: any) => {
    setFormData((prev: any) => {
      // Deep merge for nested objects like documentos and direcciones
      const mergedData = { ...prev }
      
      // Handle direcciones array specifically
      if (data.direcciones) {
        mergedData.direcciones = data.direcciones
      }
      
      // Handle documentos object specifically
      if (data.documentos) {
        mergedData.documentos = { ...prev.documentos, ...data.documentos }
      }
      
      // Handle other fields
      Object.keys(data).forEach(key => {
        if (key !== 'direcciones' && key !== 'documentos') {
          mergedData[key] = data[key]
        }
      })
      
      console.log("Guardando datos:", mergedData)
      return mergedData
    })
  }

  // Función para validar y mostrar errores desde cualquier tab
  const validateAndShowErrors = (currentFormData?: any) => {
    // Usar los datos pasados como parámetro o los del estado
    const dataToValidate = currentFormData ? { ...formData, ...currentFormData } : formData
    
    console.log("Validando datos:", dataToValidate)
    
    // Validar todos los tabs
    const datosGeneralesError = validateDatosGenerales(dataToValidate)
    const direccionesError = validateDirecciones(dataToValidate)
    const informacionComercialError = validateInformacionComercial(dataToValidate)
    
    console.log("Errores encontrados:", {
      datosGenerales: datosGeneralesError,
      direcciones: direccionesError,
      informacionComercial: informacionComercialError
    })

    // Actualizar estado de errores de validación
    setValidationErrors({
      datosGenerales: !!datosGeneralesError,
      direcciones: !!direccionesError,
      informacionComercial: !!informacionComercialError
    })

    // Si hay errores, mostrar mensaje y navegar al primer tab con error
    if (datosGeneralesError || direccionesError || informacionComercialError) {
      let tabsWithErrors = []
      
      if (datosGeneralesError) tabsWithErrors.push(datosGeneralesError)
      if (direccionesError) tabsWithErrors.push(direccionesError)
      if (informacionComercialError) tabsWithErrors.push(informacionComercialError)
      
      showValidationError(tabsWithErrors)
      
      // Navegar al primer tab con error
      if (datosGeneralesError) {
        setStep(1)
      } else if (direccionesError) {
        setStep(2)
      } else if (informacionComercialError) {
        setStep(3)
      }
      
      return false // Indicar que hay errores
    }

    return true // Indicar que no hay errores
  }

  // Función para validar campos obligatorios de Datos Generales
  const validateDatosGenerales = (data: any) => {
    const requiredFields = [
      'razonSocial',
      'cuit',
      'naturalezaOrganizacion',
      'tipoSocietario',
      'ultimaActividad',
      'convenioMultilateral',
      'exencionesImpositivas'
    ]
    
    const missingFields = requiredFields.filter(field => {
      const value = data[field]
      return !value || (typeof value === 'string' && value.trim() === '')
    })
    
    // Validar documentos obligatorios según las selecciones
    if (data.convenioMultilateral === 'Sí' && (!data.documentos?.convenioMultilateral?.archivo)) {
      missingFields.push('Documento Convenio Multilateral')
    }
    if (data.convenioMultilateral === 'No' && (!data.documentos?.constanciaARBA?.archivo)) {
      missingFields.push('Documento Constancia ARBA')
    }
    if (data.exencionesImpositivas === 'Sí' && (!data.documentos?.exencionesImpositivas?.archivo)) {
      missingFields.push('Documento Exenciones Impositivas')
    }
    
    console.log("Validación Datos Generales - datos:", data)
    console.log("Validación Datos Generales - campos faltantes:", missingFields)
    return missingFields.length > 0 ? 'Datos Generales' : null
  }

  // Función para validar campos obligatorios de Direcciones
  const validateDirecciones = (data: any) => {
    if (!data.direcciones || data.direcciones.length === 0) {
      console.log("Validación Direcciones - no hay direcciones")
      return 'Direcciones'
    }
    
    // Verificar que al menos una dirección tenga los campos obligatorios
    const hasValidAddress = data.direcciones.some((dir: any) => {
      const isValid = dir.calle && dir.calle.trim() !== '' &&
        dir.ciudad && dir.ciudad.trim() !== '' &&
        dir.provincia && dir.provincia.trim() !== '' &&
        dir.codigoPostal && dir.codigoPostal.trim() !== '' &&
        (dir.sinNumero || (dir.numero && dir.numero.trim() !== ''))
      
      console.log("Validando dirección:", dir, "válida:", isValid)
      return isValid
    })
    
    console.log("Validación Direcciones - direcciones:", data.direcciones, "válida:", hasValidAddress)
    return hasValidAddress ? null : 'Direcciones'
  }

  // Función para validar campos obligatorios de Información Comercial
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
    
    console.log("Validación Información Comercial - datos:", data)
    console.log("Validación Información Comercial - campos faltantes:", missingFields)
    return missingFields.length > 0 ? 'Información Comercial' : null
  }

  const handleSubmit = () => {
    console.log("Formulario completo:", formData)

    // Validar todos los campos obligatorios
    if (!validateAndShowErrors()) {
      return // Si hay errores, la función ya mostró el mensaje y navegó al tab correspondiente
    }

    // Si no hay errores, continuar con el envío
    // Si hay un borrador, eliminarlo al finalizar
    if (draftId) {
      const savedDrafts = JSON.parse(localStorage.getItem("clienteDrafts") || "{}")
      delete savedDrafts[draftId]
      localStorage.setItem("clienteDrafts", JSON.stringify(savedDrafts))
    }

    alert("Cliente creado correctamente")
    router.push("/cliente/gestion/entidad")
  }

  // Función para validar y luego enviar el formulario completo
  const validateAndSubmit = (currentFormData?: any) => {
    console.log("Iniciando validateAndSubmit con datos:", currentFormData)
    
    // Primero validar
    if (!validateAndShowErrors(currentFormData)) {
      console.log("Validación falló, retornando false")
      return false // Si hay errores, la función ya mostró el mensaje y navegó al tab correspondiente
    }

    // Si no hay errores, continuar con el envío
    console.log("Formulario completo:", formData)
    console.log("Mostrando alerta de éxito...")

    // Si hay un borrador, eliminarlo al finalizar
    if (draftId) {
      const savedDrafts = JSON.parse(localStorage.getItem("clienteDrafts") || "{}")
      delete savedDrafts[draftId]
      localStorage.setItem("clienteDrafts", JSON.stringify(savedDrafts))
    }

    showClientCreated()
    console.log("Redirigiendo a entidad...")
    router.push("/usuario-basico/gestion/mis-entidades")
    return true
  }

  const handleSaveDraft = () => {
    // Generar un ID único para el borrador si no existe
    const draftKey = draftId || `draft_${Date.now()}`

    // Obtener borradores existentes
    const savedDrafts = JSON.parse(localStorage.getItem("clienteDrafts") || "{}")

    // Guardar el borrador actual
    savedDrafts[draftKey] = {
      id: draftKey,
      data: formData,
      lastStep: step,
      timestamp: Date.now(),
      nombre: formData.razonSocial || "Cliente sin nombre",
      cuit: formData.cuitCuil || "Sin CUIT",
      tipo: "Cliente",
      estado: "Borrador",
    }

    localStorage.setItem("clienteDrafts", JSON.stringify(savedDrafts))
    
    // Mostrar confirmación de borrador guardado
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
          <DatosGeneralesClienteForm
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
          <DireccionesForm
            onSave={handleSaveData}
            onSaveDraft={handleSaveDraft}
            onNext={handleNext}
            initialData={formData}
            onCancel={() => router.push(backUrl)}
            readOnly={readOnly}
          />
        )}
        {step === 3 && (
          <InformacionComercialClienteForm
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
