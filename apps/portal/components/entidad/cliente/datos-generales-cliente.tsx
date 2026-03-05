"use client"

import { useState } from "react"
import { User, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function DatosGeneralesCliente() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { toast } = useToast()

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios
    setIsEditModalOpen(false)
    toast({
      title: "Cambios guardados",
      description: "Los datos generales han sido actualizados correctamente.",
    })
  }

  return (
    <>
      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-semibold">Datos Generales</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
              <PenLine className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Contraer" : "Expandir"}
              <svg
                className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Razón Social</p>
              <p className="font-medium">Y.P.F. S.A.</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CUIT/CUIL</p>
              <p className="font-medium">30-54.668.997-9</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo de Cliente</p>
              <p className="font-medium">Petroquimica</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Activo</Badge>
            </div>
          </div>

          {isExpanded && (
            <>
              <Separator className="my-4" />
              <h3 className="text-md font-semibold mb-3">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Nombre de Contacto</p>
                  <p className="font-medium">Rodolfo Chaves</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cargo</p>
                  <p className="font-medium">Gerente Comercial</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">rchaves@puertolaplata.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">+54 9 221 456 1244</p>
                </div>
              </div>

              <Separator className="my-4" />
              <h3 className="text-md font-semibold mb-3">Información Bancaria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Banco</p>
                  <p className="font-medium">Banco Nacional</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipo de Cuenta</p>
                  <p className="font-medium">Corriente</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Número de Cuenta</p>
                  <p className="font-medium">0012345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Titular</p>
                  <p className="font-medium">Y.P.F. S.A.</p>
                </div>
              </div>

              <Separator className="my-4" />
              <h3 className="text-md font-semibold mb-3">Información Fiscal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Régimen Fiscal</p>
                  <p className="font-medium">General</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Condición IVA</p>
                  <p className="font-medium">Responsable Inscripto</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de Edición de Datos Generales */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Editar Datos Generales</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="razonSocial">Razón Social</Label>
                <Input id="razonSocial" defaultValue="Y.P.F. S.A." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cuit">CUIT/CUIL</Label>
                <Input id="cuit" defaultValue="30-54.668.997-9" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoProveedor">Tipo de Cliente</Label>
                <Input id="tipoProveedor" defaultValue="Petroquimica" />
              </div>
            </div>

            <Separator className="my-2" />
            <h3 className="text-md font-semibold">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombreContacto">Nombre de Contacto</Label>
                <Input id="nombreContacto" defaultValue="Rodolfo Chaves" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input id="cargo" defaultValue="Gerente Comercial" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="rchaves@puertolaplata.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" defaultValue="+54 9 221 632 8712" />
              </div>
            </div>

            <Separator className="my-2" />
            <h3 className="text-md font-semibold">Información Bancaria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="banco">Banco</Label>
                <Input id="banco" defaultValue="Banco Nacional" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoCuenta">Tipo de Cuenta</Label>
                <Input id="tipoCuenta" defaultValue="Corriente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroCuenta">Número de Cuenta</Label>
                <Input id="numeroCuenta" defaultValue="0012345678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titular">Titular</Label>
                <Input id="titular" defaultValue="Y.P.F. S.A." />
              </div>
            </div>

            <Separator className="my-2" />
            <h3 className="text-md font-semibold">Información Fiscal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regimenFiscal">Régimen Fiscal</Label>
                <Input id="regimenFiscal" defaultValue="General" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condicionIVA">Condición IVA</Label>
                <Input id="condicionIVA" defaultValue="Responsable Inscripto" />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
