"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Datos de ejemplo para usuarios (sugerencias)
const usuariosEjemplo = [
  "Ana García - Compras",
  "Juan Pérez - Logística",
  "María Rodríguez - Finanzas",
  "Carlos López - Compras",
  "Laura Martínez - Administración",
  "Pedro Sánchez - Compras",
  "Sofía Fernández - Logística",
  "Diego Ramírez - Finanzas",
]

// Criterios de evaluación
const criteriosEvaluacion = [
  { id: "respuesta", nombre: "Respuesta a sus Requerimientos" },
  { id: "calidad", nombre: "Calidad de los materiales/servicios provistos" },
  { id: "plazos", nombre: "Cumplimiento de los plazos de entrega" },
  { id: "competitividad", nombre: "Competitividad de la oferta" },
  { id: "reclamos", nombre: "Atención de reclamos" },
]

// Función para determinar la clasificación del proveedor según el promedio
const obtenerClasificacion = (promedio: number): string => {
  if (promedio >= 4) return "Proveedor A"
  if (promedio >= 3.5) return "Proveedor B"
  if (promedio >= 3) return "Proveedor C"
  return "NO APROBADO"
}

// Función para obtener el color de la clasificación
const obtenerColorClasificacion = (clasificacion: string): string => {
  switch (clasificacion) {
    case "Proveedor A":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Proveedor B":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Proveedor C":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100"
    case "NO APROBADO":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

interface Proveedor {
  id: number
  razonSocial: string
  cuit: string
  calificacion?: string
}

interface CalificarProveedorModalProps {
  isOpen: boolean
  onClose: () => void
  proveedor: Proveedor | null
  onGuardar?: (data: {
    proveedorId: number
    evaluaciones: Record<string, number>
    promedio: number
    clasificacion: string
    observaciones: string
  }) => void
}

export function CalificarProveedorModal({ isOpen, onClose, proveedor, onGuardar }: CalificarProveedorModalProps) {
  const [observaciones, setObservaciones] = useState("")
  const [enviarACalificar, setEnviarACalificar] = useState(false)
  const [usuarioCalificador, setUsuarioCalificador] = useState("")
  const [usuariosSugeridos, setUsuariosSugeridos] = useState<string[]>([])
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const [erroresValidacion, setErroresValidacion] = useState<Record<string, string>>({})

  // Estado para criterios seleccionados para enviar a calificar
  const [criteriosSeleccionados, setCriteriosSeleccionados] = useState<Record<string, boolean>>({
    respuesta: true,
    calidad: true,
    plazos: true,
    competitividad: true,
    reclamos: true,
  })

  // Estado para los valores de evaluación
  const [evaluaciones, setEvaluaciones] = useState<Record<string, number>>({
    respuesta: 0,
    calidad: 0,
    plazos: 0,
    competitividad: 0,
    reclamos: 0,
  })

  // Estado para el promedio calculado
  const [promedio, setPromedio] = useState<number>(0)
  const [clasificacion, setClasificacion] = useState<string>("")

  // Calcular promedio y clasificación cuando cambian las evaluaciones
  useEffect(() => {
    // Solo considerar los criterios que no están seleccionados para enviar a otro usuario
    // cuando el modo "enviar a calificar" está activo
    const valoresAConsiderar = Object.entries(evaluaciones)
      .filter(([criterioId, _]) => !enviarACalificar || !criteriosSeleccionados[criterioId])
      .map(([_, valor]) => valor)

    const suma = valoresAConsiderar.reduce((acc, val) => acc + val, 0)
    const nuevoPromedio = valoresAConsiderar.length > 0 ? suma / valoresAConsiderar.length : 0
    setPromedio(nuevoPromedio)
    setClasificacion(obtenerClasificacion(nuevoPromedio))
  }, [evaluaciones, criteriosSeleccionados, enviarACalificar])

  // Resetear estados cuando se abre el modal
  useEffect(() => {
    if (isOpen && proveedor) {
      setEvaluaciones({
        respuesta: 0,
        calidad: 0,
        plazos: 0,
        competitividad: 0,
        reclamos: 0,
      })
      setCriteriosSeleccionados({
        respuesta: true,
        calidad: true,
        plazos: true,
        competitividad: true,
        reclamos: true,
      })
      setObservaciones("")
      setEnviarACalificar(false)
      setUsuarioCalificador("")
      setErroresValidacion({})
    }
  }, [isOpen, proveedor])

  // Función para actualizar una evaluación individual
  const actualizarEvaluacion = (criterio: string, valor: string) => {
    const valorNumerico = Number.parseFloat(valor)

    // Validar que sea un número y esté en el rango correcto
    if (isNaN(valorNumerico)) {
      setErroresValidacion((prev) => ({
        ...prev,
        [criterio]: "Ingrese un valor numérico",
      }))
      return
    }

    if (valorNumerico < 0 || valorNumerico > 5) {
      setErroresValidacion((prev) => ({
        ...prev,
        [criterio]: "El valor debe estar entre 0 y 5",
      }))
      return
    }

    // Si pasa la validación, limpiar el error y actualizar el valor
    setErroresValidacion((prev) => {
      const newErrors = { ...prev }
      delete newErrors[criterio]
      return newErrors
    })

    setEvaluaciones((prev) => ({
      ...prev,
      [criterio]: valorNumerico,
    }))
  }

  // Función para guardar la calificación
  const handleGuardarCalificacion = () => {
    if (proveedor && onGuardar) {
      onGuardar({
        proveedorId: proveedor.id,
        evaluaciones,
        promedio,
        clasificacion,
        observaciones,
      })
    }

    onClose()
  }

  // Función para filtrar usuarios según lo que se escribe
  const filtrarUsuarios = (texto: string) => {
    const filtrados = usuariosEjemplo.filter((usuario) => usuario.toLowerCase().includes(texto.toLowerCase()))
    setUsuariosSugeridos(filtrados)
    setMostrarSugerencias(true)
  }

  // Función para seleccionar un usuario de las sugerencias
  const seleccionarUsuario = (usuario: string) => {
    setUsuarioCalificador(usuario)
    setMostrarSugerencias(false)
  }

  // Función para enviar solicitud de calificación
  const enviarSolicitudCalificacion = () => {
    // Verificar que al menos un criterio esté seleccionado
    const hayCriteriosSeleccionados = Object.values(criteriosSeleccionados).some((value) => value)

    if (!hayCriteriosSeleccionados) {
      alert("Debe seleccionar al menos un criterio para calificar")
      return
    }

    // Verificar si hay errores de validación en los criterios que califica el usuario actual
    const hayErroresEnCriteriosUsuarioActual = Object.entries(erroresValidacion).some(
      ([criterioId, _]) => !criteriosSeleccionados[criterioId],
    )

    if (hayErroresEnCriteriosUsuarioActual) {
      alert("Hay errores en los criterios que está calificando. Por favor, corríjalos antes de continuar.")
      return
    }

    // Obtener los criterios seleccionados para el otro usuario
    const criteriosParaOtroUsuario = Object.entries(criteriosSeleccionados)
      .filter(([_, selected]) => selected)
      .map(([criterioId, _]) => {
        const criterio = criteriosEvaluacion.find((c) => c.id === criterioId)
        return criterio ? criterio.nombre : criterioId
      })

    // Obtener los criterios calificados por el usuario actual
    const criteriosCalificadosPorUsuarioActual = Object.entries(criteriosSeleccionados)
      .filter(([criterioId, selected]) => !selected)
      .map(([criterioId, _]) => {
        const criterio = criteriosEvaluacion.find((c) => c.id === criterioId)
        return {
          nombre: criterio ? criterio.nombre : criterioId,
          valor: evaluaciones[criterioId],
        }
      })

    console.log("Solicitud de calificación enviada a:", usuarioCalificador)
    console.log("Criterios a calificar por otro usuario:", criteriosParaOtroUsuario)
    console.log("Criterios calificados por usuario actual:", criteriosCalificadosPorUsuarioActual)

    // Aquí iría la lógica para enviar la notificación al usuario
    let mensaje = `Solicitud de calificación enviada a ${usuarioCalificador} para los criterios: ${criteriosParaOtroUsuario.join(", ")}`

    if (criteriosCalificadosPorUsuarioActual.length > 0) {
      mensaje += `\n\nCriterios calificados por usted: ${criteriosCalificadosPorUsuarioActual.map((c) => `${c.nombre} (${c.valor})`).join(", ")}`
    }

    alert(mensaje)

    // Cerrar el modal
    onClose()
  }

  // Verificar si hay criterios no seleccionados para enviar a otro usuario
  const hayCriteriosParaUsuarioActual =
    enviarACalificar && Object.values(criteriosSeleccionados).some((value) => !value)

  // Verificar si hay errores en los criterios que califica el usuario actual
  const hayErroresEnCriteriosUsuarioActual = Object.entries(erroresValidacion).some(
    ([criterioId, _]) => !criteriosSeleccionados[criterioId],
  )

  if (!proveedor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Calificar Proveedor</DialogTitle>
          <DialogDescription>
            {proveedor.razonSocial} - {proveedor.cuit}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 overflow-y-auto pr-1">
          <div className="flex items-center space-x-2 mb-6">
            <Switch id="enviar-a-calificar" checked={enviarACalificar} onCheckedChange={setEnviarACalificar} />
            <Label htmlFor="enviar-a-calificar">Enviar a calificar por otro usuario</Label>
          </div>

          {enviarACalificar ? (
            <div className="space-y-6">
              <div>
                <Label htmlFor="usuario-calificador" className="block mb-2">
                  Nombre Completo
                </Label>
                <div className="relative">
                  <div className="flex gap-2">
                    <Input
                      id="usuario-calificador"
                      value={usuarioCalificador}
                      onChange={(e) => {
                        setUsuarioCalificador(e.target.value)
                        filtrarUsuarios(e.target.value)
                      }}
                      onFocus={() => filtrarUsuarios(usuarioCalificador)}
                      placeholder="Buscar usuario..."
                      className="flex-1"
                    />
                  </div>

                  {mostrarSugerencias && usuariosSugeridos.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {usuariosSugeridos.map((usuario, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => seleccionarUsuario(usuario)}
                        >
                          {usuario}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Criterios a calificar por otro usuario</h3>
                <div className="space-y-2 border rounded-md p-3 bg-gray-50">
                  {criteriosEvaluacion.map((criterio) => (
                    <div key={criterio.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`criterio-${criterio.id}`}
                        checked={criteriosSeleccionados[criterio.id]}
                        onCheckedChange={(checked) => {
                          setCriteriosSeleccionados({
                            ...criteriosSeleccionados,
                            [criterio.id]: !!checked,
                          })
                        }}
                      />
                      <label
                        htmlFor={`criterio-${criterio.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {criterio.nombre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Criterios a calificar por el usuario actual */}
              {hayCriteriosParaUsuarioActual && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Criterios a calificar por usted</h3>
                  <div className="mb-6 border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-2 px-4 text-left font-medium w-1/2">Criterio</th>
                          <th className="py-2 px-4 text-left font-medium">Calificación (0-5)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {criteriosEvaluacion
                          .filter((criterio) => !criteriosSeleccionados[criterio.id])
                          .map((criterio) => (
                            <tr key={criterio.id} className="border-b">
                              <td className="py-3 px-4">{criterio.nombre}</td>
                              <td className="py-3 px-4">
                                <div className="space-y-1">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    value={evaluaciones[criterio.id].toString()}
                                    onChange={(e) => actualizarEvaluacion(criterio.id, e.target.value)}
                                    className={erroresValidacion[criterio.id] ? "border-red-500" : ""}
                                  />
                                  {erroresValidacion[criterio.id] && (
                                    <p className="text-xs text-red-500">{erroresValidacion[criterio.id]}</p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Resultado de la evaluación para criterios del usuario actual */}
                  {hayCriteriosParaUsuarioActual && (
                    <div className="mb-6 p-4 border rounded-md bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Promedio de su evaluación:</p>
                          <p className="text-2xl font-bold">{promedio.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="font-medium">Clasificación parcial:</p>
                          <Badge
                            variant="outline"
                            className={`text-lg px-3 py-1 ${obtenerColorClasificacion(clasificacion)}`}
                          >
                            {clasificacion}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Nota: Esta clasificación es parcial y se basa solo en los criterios que usted está calificando.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <Separator className="my-4" />

              {/* Campo de observaciones */}
              <div className="mb-4">
                <Label htmlFor="observaciones" className="block mb-2">
                  Observaciones
                </Label>
                <textarea
                  id="observaciones"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Ingrese observaciones sobre el proveedor..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={enviarSolicitudCalificacion}
                  disabled={
                    !usuarioCalificador ||
                    !Object.values(criteriosSeleccionados).some((v) => v) ||
                    hayErroresEnCriteriosUsuarioActual
                  }
                  className="bg-plp-dark hover:bg-plp-medium"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar solicitud
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Tabla de criterios de evaluación */}
              <div className="mb-6 border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-2 px-4 text-left font-medium w-1/2">Criterio</th>
                      <th className="py-2 px-4 text-left font-medium">Calificación (0-5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteriosEvaluacion.map((criterio) => (
                      <tr key={criterio.id} className="border-b">
                        <td className="py-3 px-4">{criterio.nombre}</td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              value={evaluaciones[criterio.id].toString()}
                              onChange={(e) => actualizarEvaluacion(criterio.id, e.target.value)}
                              className={erroresValidacion[criterio.id] ? "border-red-500" : ""}
                            />
                            {erroresValidacion[criterio.id] && (
                              <p className="text-xs text-red-500">{erroresValidacion[criterio.id]}</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resultado de la evaluación */}
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Promedio de evaluación:</p>
                    <p className="text-2xl font-bold">{promedio.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="font-medium">Clasificación:</p>
                    <Badge variant="outline" className={`text-lg px-3 py-1 ${obtenerColorClasificacion(clasificacion)}`}>
                      {clasificacion}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Campo de observaciones */}
              <div className="mb-4">
                <Label htmlFor="observaciones" className="block mb-2">
                  Observaciones
                </Label>
                <textarea
                  id="observaciones"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Ingrese observaciones sobre el proveedor..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {!enviarACalificar && (
            <Button
              className="bg-plp-dark hover:bg-plp-medium"
              onClick={handleGuardarCalificacion}
              disabled={Object.keys(erroresValidacion).length > 0}
            >
              Guardar calificación
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

