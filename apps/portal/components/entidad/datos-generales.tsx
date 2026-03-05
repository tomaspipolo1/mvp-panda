import { User } from "lucide-react"
import { ExpandablePanel } from "@/components/expandable-panel"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ContactoInfo {
  nombre: string
  cargo: string
  email: string
  telefono: string
}

interface BancoInfo {
  numeroCuenta: string
  banco: string
  cbu: string
  alias: string
}

interface InfoFiscal {
  convenioMultilateral: string
  exencionesImpositivas: string
  condicionIVA: string
}

interface DatosGeneralesProps {
  naturalezaOrganizacion: string
  tipoSocietario: string
  razonSocial: string
  cuitCuil: string
  nombreFantasia: string
  estado: "Activo" | "Inactivo" | "Pendiente"
  contacto: ContactoInfo
  banco: BancoInfo
  fiscal: InfoFiscal
  onEdit?: () => void
}

export function DatosGenerales({
  naturalezaOrganizacion,
  tipoSocietario,
  razonSocial,
  cuitCuil,
  nombreFantasia,
  estado,
  contacto,
  banco,
  fiscal,
  onEdit,
}: DatosGeneralesProps) {
  // Preview content - shown when panel is not expanded
  const previewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
      <div>
        <p className="text-sm text-gray-500 mb-1">Razón Social</p>
        <p className="font-medium text-plp-darkest">{razonSocial}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">CUIT/CUIL</p>
        <p className="font-medium text-plp-darkest">{cuitCuil}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Nombre Fantasía</p>
        <p className="font-medium text-plp-darkest">{nombreFantasia}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Estado</p>
        <Badge
          className={
            estado === "Activo"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : estado === "Inactivo"
                ? "bg-red-100 text-red-800 hover:bg-red-100"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          }
        >
          {estado}
        </Badge>
      </div>
    </div>
  )

  return (
    <ExpandablePanel
      icon={<User size={24} />}
      title="Datos Generales"
      actionButton="edit"
      onActionClick={onEdit}
      previewContent={previewContent}
    >
      <div className="space-y-6">
        {/* Datos básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Naturaleza de la organización</p>
            <p className="font-medium text-plp-darkest">{naturalezaOrganizacion}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Tipo societario</p>
            <p className="font-medium text-plp-darkest">{tipoSocietario}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Razón Social</p>
            <p className="font-medium text-plp-darkest">{razonSocial}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">CUIT/CUIL</p>
            <p className="font-medium text-plp-darkest">{cuitCuil}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Nombre fantasía</p>
            <p className="font-medium text-plp-darkest">{nombreFantasia}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Estado</p>
            <Badge
              className={
                estado === "Activo"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : estado === "Inactivo"
                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
              }
            >
              {estado}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Información de contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-plp-darkest">Información de Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Nombre de Contacto</p>
              <p className="font-medium text-plp-darkest">{contacto.nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Cargo</p>
              <p className="font-medium text-plp-darkest">{contacto.cargo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-plp-darkest">{contacto.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Teléfono</p>
              <p className="font-medium text-plp-darkest">{contacto.telefono}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Información bancaria */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-plp-darkest">Información Bancaria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Número de cuenta</p>
              <p className="font-medium text-plp-darkest">{banco.numeroCuenta}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Banco</p>
              <p className="font-medium text-plp-darkest">{banco.banco}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">CBU</p>
              <p className="font-medium text-plp-darkest">{banco.cbu}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Alias</p>
              <p className="font-medium text-plp-darkest">{banco.alias}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Información fiscal */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-plp-darkest">Información Fiscal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Convenio multilateral</p>
              <p className="font-medium text-plp-darkest">{fiscal.convenioMultilateral}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Exenciones impositivas</p>
              <p className="font-medium text-plp-darkest">{fiscal.exencionesImpositivas}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Condición IVA</p>
              <p className="font-medium text-plp-darkest">{fiscal.condicionIVA}</p>
            </div>
          </div>
        </div>
      </div>
    </ExpandablePanel>
  )
}
