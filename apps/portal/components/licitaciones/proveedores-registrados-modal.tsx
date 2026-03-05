"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"

interface ProveedorRegistrado {
  id: string
  razonSocial: string
  cuit: string
  email: string
  personaContacto: string
  estado: "Participa" | "No participa" | "Invitado"
}

interface ProveedoresRegistradosModalProps {
  isOpen: boolean
  onClose: () => void
  licitacionId: string
  licitacionTitulo: string
  licitacionNumero: string
}

export function ProveedoresRegistradosModal({
  isOpen,
  onClose,
  licitacionId,
  licitacionTitulo,
  licitacionNumero,
}: ProveedoresRegistradosModalProps) {
  // Función para obtener el color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Participa":
        return "bg-green-100 text-green-800"
      case "No participa":
        return "bg-red-100 text-red-800"
      case "Invitado":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Datos de ejemplo de proveedores registrados
  const proveedoresRegistrados: ProveedorRegistrado[] = [
    {
      id: "1",
      razonSocial: "Constructora ABC S.A.",
      cuit: "30-12345678-9",
      email: "contacto@constructoraabc.com",
      personaContacto: "Juan Pérez",
      estado: "Participa",
    },
    {
      id: "2",
      razonSocial: "Servicios Portuarios XYZ S.R.L.",
      cuit: "30-23456789-0",
      email: "info@serviciosxyz.com",
      personaContacto: "María López",
      estado: "Invitado",
    },
    {
      id: "3",
      razonSocial: "Ingeniería Marítima del Sur",
      cuit: "30-34567890-1",
      email: "ventas@ingenieriasur.com",
      personaContacto: "Roberto García",
      estado: "Participa",
    },
    {
      id: "4",
      razonSocial: "TecnoSupply Argentina S.A.",
      cuit: "30-45678901-2",
      email: "contacto@tecnosupply.com.ar",
      personaContacto: "Ana González",
      estado: "No participa",
    },
    {
      id: "5",
      razonSocial: "Logística Portuaria S.R.L.",
      cuit: "30-56789012-3",
      email: "info@logisticaportuaria.com",
      personaContacto: "Carlos Rodríguez",
      estado: "Invitado",
    },
  ]

  const handleExportarListado = () => {
    console.log("Exportando listado de proveedores registrados")
    // Aquí iría la lógica para exportar a Excel o PDF
    alert("Exportando listado de proveedores...")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Proveedores Registrados - {licitacionNumero}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{licitacionTitulo}</p>
        </DialogHeader>

        <div className="mt-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">
                Total de proveedores registrados: {proveedoresRegistrados.length}
              </h3>
              <p className="text-sm text-gray-500">Listado de proveedores inscritos a esta licitación</p>
            </div>
            <Button variant="outline" onClick={handleExportarListado}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Razón Social
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CUIT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Correo Electrónico
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Persona Contacto
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proveedoresRegistrados.map((proveedor) => (
                    <tr key={proveedor.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{proveedor.razonSocial}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{proveedor.cuit}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{proveedor.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{proveedor.personaContacto}</td>
                      <td className="px-4 py-4 text-sm">
                        <Badge className={getEstadoColor(proveedor.estado)}>
                          {proveedor.estado}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {proveedoresRegistrados.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay proveedores registrados para esta licitación</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

