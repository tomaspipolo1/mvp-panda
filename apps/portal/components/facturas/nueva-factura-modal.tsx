"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Upload, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface NuevaFacturaModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NuevaFacturaModal({ isOpen, onClose }: NuevaFacturaModalProps) {
  const [fechaEmision, setFechaEmision] = useState<string>("")
  const [fechaVencimiento, setFechaVencimiento] = useState<string>("")
  const [tipoComprobante, setTipoComprobante] = useState<string>("")
  const [letra, setLetra] = useState<string>("")
  const [ordenCompra, setOrdenCompra] = useState<string>("")
  const [archivo, setArchivo] = useState<File | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    // Validación manual
    const cuitValue = (document.getElementById("cuit") as HTMLInputElement)?.value
    const digitosValue = (document.getElementById("digitosVerificadores") as HTMLInputElement)?.value
    const numeroValue = (document.getElementById("numeroFactura") as HTMLInputElement)?.value
    const montoNetoValue = (document.getElementById("montoNeto") as HTMLInputElement)?.value
    const montoTotalValue = (document.getElementById("montoTotal") as HTMLInputElement)?.value

    if (
      !cuitValue ||
      !fechaEmision ||
      !fechaVencimiento ||
      !tipoComprobante ||
      (tipoComprobante === "factura" && !letra) ||
      !digitosValue ||
      !numeroValue ||
      !montoNetoValue ||
      !montoTotalValue ||
      !archivo
    ) {
      console.log("Faltan campos por completar")
      return
    }

    // Aquí iría la lógica para enviar los datos del formulario
    console.log("Formulario enviado")
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-plp-600">Nueva Factura</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4" noValidate>
          <div className="grid grid-cols-2 gap-8">
            {/* Columna 1 */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cuit">CUIT</Label>
                <Input
                  id="cuit"
                  placeholder="XX-XXXXXXXX-X"
                  className={cn(
                    "w-full",
                    formSubmitted && !(document.getElementById("cuit") as HTMLInputElement)?.value && "border-red-500",
                  )}
                />
                {formSubmitted && !(document.getElementById("cuit") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fechaEmision">Fecha Emisión</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fechaEmision"
                      type="date"
                      value={fechaEmision || ""}
                      onChange={(e) => setFechaEmision(e.target.value)}
                      className={cn("w-full pl-10", formSubmitted && !fechaEmision && "border-red-500")}
                    />
                  </div>
                  {formSubmitted && !fechaEmision && <p className="text-red-500 text-sm">Este campo es requerido</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fechaVencimiento">Fecha Vencimiento</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fechaVencimiento"
                      type="date"
                      value={fechaVencimiento || ""}
                      onChange={(e) => setFechaVencimiento(e.target.value)}
                      className={cn("w-full pl-10", formSubmitted && !fechaVencimiento && "border-red-500")}
                    />
                  </div>
                  {formSubmitted && !fechaVencimiento && <p className="text-red-500 text-sm">Este campo es requerido</p>}
                </div>
              </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tipoComprobante">Tipo Comprobante</Label>
                <Select onValueChange={setTipoComprobante} value={tipoComprobante}>
                  <SelectTrigger className={cn("w-full", formSubmitted && !tipoComprobante && "border-red-500")}>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="factura">Factura</SelectItem>
                    <SelectItem value="ticket">Ticket</SelectItem>
                    <SelectItem value="recibo">Recibo</SelectItem>
                  </SelectContent>
                </Select>
                {formSubmitted && !tipoComprobante && <p className="text-red-500 text-sm">Este campo es requerido</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="letra">Letra</Label>
                <Select onValueChange={setLetra} value={letra} disabled={tipoComprobante !== "factura"}>
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      formSubmitted && tipoComprobante === "factura" && !letra && "border-red-500",
                    )}
                  >
                    <SelectValue placeholder="Seleccionar letra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
                {formSubmitted && tipoComprobante === "factura" && !letra && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ordenCompra">Orden de Compra</Label>
              <Input
                id="ordenCompra"
                type="number"
                placeholder="0000000"
                value={ordenCompra}
                onChange={(e) => {
                  const value = e.target.value
                  // Limitar a 7 dígitos
                  if (value.length <= 7) {
                    setOrdenCompra(value)
                  }
                }}
                onBlur={(e) => {
                  // Al perder el foco, formatear con ceros a la izquierda
                  if (e.target.value) {
                    const formatted = e.target.value.padStart(7, '0')
                    setOrdenCompra(formatted)
                  }
                }}
                className="w-full"
                maxLength={7}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="archivo">Seleccionar archivo (PDF)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="archivo"
                  type="file"
                  accept=".pdf"
                  className={cn("w-full", formSubmitted && !archivo && "border-red-500")}
                  onChange={handleFileChange}
                />
              </div>
              {archivo && (
                <div className="text-sm text-green-600 flex items-center">
                  <Upload className="h-4 w-4 mr-1" />
                  {archivo.name}
                </div>
              )}
              {formSubmitted && !archivo && <p className="text-red-500 text-sm">Este campo es requerido</p>}
            </div>
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="digitosVerificadores">Punto de venta</Label>
                <Input
                  id="digitosVerificadores"
                  placeholder="0000"
                  className={cn(
                    "w-full",
                    formSubmitted &&
                      !(document.getElementById("digitosVerificadores") as HTMLInputElement)?.value &&
                      "border-red-500",
                  )}
                  maxLength={4}
                />
                {formSubmitted && !(document.getElementById("digitosVerificadores") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="numeroFactura">Número</Label>
                <Input
                  id="numeroFactura"
                  placeholder="00000000"
                  className={cn(
                    "w-full",
                    formSubmitted &&
                      !(document.getElementById("numeroFactura") as HTMLInputElement)?.value &&
                      "border-red-500",
                  )}
                  maxLength={8}
                />
                {formSubmitted && !(document.getElementById("numeroFactura") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="montoNeto">Monto Neto</Label>
                <Input
                  id="montoNeto"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={cn(
                    "w-full",
                    formSubmitted &&
                      !(document.getElementById("montoNeto") as HTMLInputElement)?.value &&
                      "border-red-500",
                  )}
                />
                {formSubmitted && !(document.getElementById("montoNeto") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="montoTotal">Monto Total</Label>
                <Input
                  id="montoTotal"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={cn(
                    "w-full",
                    formSubmitted &&
                      !(document.getElementById("montoTotal") as HTMLInputElement)?.value &&
                      "border-red-500",
                  )}
                />
                {formSubmitted && !(document.getElementById("montoTotal") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <Label htmlFor="detalle" className="mb-2">Detalle</Label>
              <textarea
                id="detalle"
                placeholder="Ingrese el detalle o concepto de la factura"
                className="w-full flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
            </div>
          </div>
          <DialogFooter className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#0a2472] hover:bg-[#061a54] text-white font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Cargar Factura
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
