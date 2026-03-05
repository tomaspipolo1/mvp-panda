"use client"

import { useState } from "react"
import DireccionesForm from "../proveedores/direcciones-form"

interface Props {
  onSave: (data: any) => void
  onNext: () => void
  onPrevious: () => void
  onSaveDraft?: () => void
  initialData?: any
  onCancel?: () => void
  readOnly?: boolean
}

export default function DireccionesEmpresaServiciosPortuarios({ 
  onSave, 
  onNext, 
  onPrevious, 
  onSaveDraft, 
  initialData = {}, 
  onCancel,
  readOnly,
}: Props) {
  return (
    <DireccionesForm
      onSave={onSave}
      onNext={onNext}
      onSaveDraft={onSaveDraft}
      initialData={initialData}
      onCancel={onCancel || onPrevious}
      readOnly={readOnly}
    />
  )
}