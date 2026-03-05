"use client"
import { useState, useEffect } from "react"
import { MoreVertical, Building, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
  latitud?: string
  longitud?: string
  comentarios?: string
}

interface DireccionesEmpleadoFormProps {
  direcciones: Direccion[]
  onDireccionesChange: (direcciones: Direccion[]) => void
}

export default function DireccionesEmpleadoForm({ direcciones, onDireccionesChange }: DireccionesEmpleadoFormProps) {
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
    latitud: "",
    longitud: "",
    comentarios: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  // Sincronizar formData con direcciones cuando cambien las coordenadas
  useEffect(() => {
    if (direcciones.length > 0 && !editingId) {
      const primeraDireccion = direcciones[0]
      console.log("DireccionesEmpleadoForm - Sincronizando coordenadas:", {
        latitud: primeraDireccion.latitud,
        longitud: primeraDireccion.longitud
      })
      setFormData(prev => ({
        ...prev,
        latitud: primeraDireccion.latitud || "",
        longitud: primeraDireccion.longitud || ""
      }))
    }
  }, [direcciones, editingId])

  // Inicializar formulario con la primera dirección si existe
  useEffect(() => {
    if (direcciones.length > 0 && !editingId) {
      const primeraDireccion = direcciones[0]
      setFormData({
        tipo: primeraDireccion.tipo || "",
        calle: primeraDireccion.calle || "",
        sinNumero: primeraDireccion.sinNumero || false,
        numero: primeraDireccion.numero || "",
        piso: primeraDireccion.piso || "",
        departamento: primeraDireccion.departamento || "",
        codigoPostal: primeraDireccion.codigoPostal || "",
        pais: primeraDireccion.pais || "Argentina",
        provincia: primeraDireccion.provincia || "",
        ciudad: primeraDireccion.ciudad || "",
        latitud: primeraDireccion.latitud || "",
        longitud: primeraDireccion.longitud || "",
        comentarios: primeraDireccion.comentarios || "",
      })
    }
  }, []) // Solo se ejecuta al montar el componente

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sinNumero: checked,
      numero: checked ? "" : prev.numero,
    }))
  }

  const handleAddDireccion = () => {
    // Validar campos requeridos
    if (!formData.tipo || !formData.calle || !formData.codigoPostal || !formData.provincia || !formData.ciudad) {
      return
    }

    if (editingId) {
      // Actualizar dirección existente
      const updatedDirecciones = direcciones.map((dir) => (dir.id === editingId ? { ...formData, id: editingId } : dir))
      onDireccionesChange(updatedDirecciones)
      setEditingId(null)
    } else {
      // Agregar nueva dirección
      const newDireccion: Direccion = {
        ...formData,
        id: Date.now().toString(),
      }
      onDireccionesChange([...direcciones, newDireccion])
    }

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
      latitud: "",
      longitud: "",
      comentarios: "",
    })
  }

  const handleEditDireccion = (direccion: Direccion) => {
    setFormData({
      tipo: direccion.tipo || "",
      calle: direccion.calle || "",
      sinNumero: direccion.sinNumero || false,
      numero: direccion.numero || "",
      piso: direccion.piso || "",
      departamento: direccion.departamento || "",
      codigoPostal: direccion.codigoPostal || "",
      pais: direccion.pais || "Argentina",
      provincia: direccion.provincia || "",
      ciudad: direccion.ciudad || "",
      latitud: direccion.latitud || "",
      longitud: direccion.longitud || "",
      comentarios: direccion.comentarios || "",
    })
    setEditingId(direccion.id)
  }

  const handleDeleteDireccion = (id: string) => {
    const updatedDirecciones = direcciones.filter((dir) => dir.id !== id)
    onDireccionesChange(updatedDirecciones)

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
        latitud: "",
        longitud: "",
        comentarios: "",
      })
    }
  }

  return (
    <div className="space-y-6">
      {direcciones.length > 0 && (
        <div className="space-y-4">
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
                        <span className="text-sm font-medium px-2 py-0.5 bg-gray-100 rounded">{direccion.tipo}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Cod. Postal: {direccion.codigoPostal} - {direccion.ciudad} - {direccion.provincia}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
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

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tipo">Tipo de Domicilio *</Label>
            <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Familiar">Familiar</SelectItem>
                <SelectItem value="Temporal">Temporal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="calle">Calle *</Label>
            <Input
              id="calle"
              value={formData.calle}
              onChange={(e) => handleChange("calle", e.target.value)}
              placeholder="Ingrese la calle"
            />
          </div>

          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                value={formData.numero || ""}
                onChange={(e) => handleChange("numero", e.target.value)}
                placeholder="Número"
                disabled={formData.sinNumero}
              />
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="sinNumero" checked={formData.sinNumero} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="sinNumero" className="text-sm">
                Sin número
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="piso">Piso</Label>
              <Input
                id="piso"
                value={formData.piso || ""}
                onChange={(e) => handleChange("piso", e.target.value)}
                placeholder="Piso"
              />
            </div>
            <div>
              <Label htmlFor="departamento">Departamento</Label>
              <Input
                id="departamento"
                value={formData.departamento || ""}
                onChange={(e) => handleChange("departamento", e.target.value)}
                placeholder="Depto."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="codigoPostal">Código Postal *</Label>
            <Input
              id="codigoPostal"
              value={formData.codigoPostal}
              onChange={(e) => handleChange("codigoPostal", e.target.value)}
              placeholder="Código Postal"
            />
          </div>

          <div>
            <Label htmlFor="pais">País *</Label>
            <Input
              id="pais"
              value={formData.pais}
              onChange={(e) => handleChange("pais", e.target.value)}
              className="bg-gray-100"
              readOnly
            />
          </div>

          <div>
            <Label htmlFor="provincia">Provincia *</Label>
            <Select value={formData.provincia} onValueChange={(value) => handleChange("provincia", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una provincia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                <SelectItem value="CABA">Ciudad Autónoma de Buenos Aires</SelectItem>
                <SelectItem value="Catamarca">Catamarca</SelectItem>
                <SelectItem value="Chaco">Chaco</SelectItem>
                <SelectItem value="Chubut">Chubut</SelectItem>
                <SelectItem value="Córdoba">Córdoba</SelectItem>
                <SelectItem value="Corrientes">Corrientes</SelectItem>
                <SelectItem value="Entre Ríos">Entre Ríos</SelectItem>
                <SelectItem value="Formosa">Formosa</SelectItem>
                <SelectItem value="Jujuy">Jujuy</SelectItem>
                <SelectItem value="La Pampa">La Pampa</SelectItem>
                <SelectItem value="La Rioja">La Rioja</SelectItem>
                <SelectItem value="Mendoza">Mendoza</SelectItem>
                <SelectItem value="Misiones">Misiones</SelectItem>
                <SelectItem value="Neuquén">Neuquén</SelectItem>
                <SelectItem value="Río Negro">Río Negro</SelectItem>
                <SelectItem value="Salta">Salta</SelectItem>
                <SelectItem value="San Juan">San Juan</SelectItem>
                <SelectItem value="San Luis">San Luis</SelectItem>
                <SelectItem value="Santa Cruz">Santa Cruz</SelectItem>
                <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                <SelectItem value="Santiago del Estero">Santiago del Estero</SelectItem>
                <SelectItem value="Tierra del Fuego">Tierra del Fuego</SelectItem>
                <SelectItem value="Tucumán">Tucumán</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ciudad">Ciudad *</Label>
            <Select
              value={formData.ciudad}
              onValueChange={(value) => handleChange("ciudad", value)}
              disabled={!formData.provincia}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una ciudad" />
              </SelectTrigger>
              <SelectContent>
                {formData.provincia === "Buenos Aires" && (
                  <>
                    <SelectItem value="La Plata">La Plata</SelectItem>
                    <SelectItem value="Mar del Plata">Mar del Plata</SelectItem>
                    <SelectItem value="Bahía Blanca">Bahía Blanca</SelectItem>
                    <SelectItem value="Tandil">Tandil</SelectItem>
                    <SelectItem value="San Nicolás">San Nicolás</SelectItem>
                    <SelectItem value="Ensenada">Ensenada</SelectItem>
                  </>
                )}
                {formData.provincia === "CABA" && (
                  <SelectItem value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="comentarios">Comentarios</Label>
          <Textarea
            id="comentarios"
            value={formData.comentarios || ""}
            onChange={(e) => handleChange("comentarios", e.target.value)}
            placeholder="Comentarios adicionales"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitud">Latitud</Label>
            <Input
              id="latitud"
              value={formData.latitud || ""}
              onChange={(e) => handleChange("latitud", e.target.value)}
              placeholder="Ej: -34.6037"
            />
          </div>

          <div>
            <Label htmlFor="longitud">Longitud</Label>
            <Input
              id="longitud"
              value={formData.longitud || ""}
              onChange={(e) => handleChange("longitud", e.target.value)}
              placeholder="Ej: -58.3816"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleAddDireccion}
            disabled={
              !formData.tipo || !formData.calle || !formData.codigoPostal || !formData.provincia || !formData.ciudad
            }
          >
            {editingId ? "Actualizar Domicilio" : "Agregar Domicilio"}
          </Button>
        </div>
      </div>
    </div>
  )
}
