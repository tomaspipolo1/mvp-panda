import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircleIcon, FileTextIcon, PhoneIcon, MailIcon } from "lucide-react"

export default function AyudaPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Centro de Ayuda</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircleIcon className="h-5 w-5" />
                Preguntas Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cómo aprobar una visita?</AccordionTrigger>
                  <AccordionContent>
                    Para aprobar una visita, dirígete a la sección "Visitas Pendientes", localiza la visita que deseas
                    aprobar y haz clic en el botón "Ver Detalles". En la ventana emergente, revisa la información y haz
                    clic en "Aprobar".
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Cómo rechazar una solicitud de visita?</AccordionTrigger>
                  <AccordionContent>
                    Para rechazar una solicitud, ve a "Visitas Pendientes", encuentra la solicitud que deseas rechazar y
                    haz clic en "Ver Detalles". En la ventana emergente, revisa la información y haz clic en "Rechazar".
                    Se te pedirá que proporciones un motivo para el rechazo.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Cómo registrar una nueva visita?</AccordionTrigger>
                  <AccordionContent>
                    Para registrar una nueva visita, ve a la sección "Nueva Visita" en el menú de Visitas. Completa el
                    formulario con todos los datos requeridos del visitante y haz clic en "Registrar Visita".
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Cómo actualizar mi información personal?</AccordionTrigger>
                  <AccordionContent>
                    Para actualizar tu información personal, ve a "Perfil" &gt; "Datos Personales". Allí podrás
                    modificar tus datos y guardar los cambios haciendo clic en "Actualizar Información".
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>¿Cómo cambiar mi contraseña?</AccordionTrigger>
                  <AccordionContent>
                    Para cambiar tu contraseña, ve a "Perfil" > "Seguridad". Ingresa tu contraseña actual y la nueva
                    contraseña (dos veces para confirmar). Haz clic en "Cambiar Contraseña" para guardar los cambios.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Manuales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Manual de Usuario
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Procedimientos de Seguridad
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Guía Rápida
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5" />
                Contacto
              </CardTitle>
              <CardDescription>¿Necesitas ayuda adicional? Contáctanos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                <span>+54 221 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4" />
                <span>soporte@puertolaplata.com</span>
              </div>
              <Button className="w-full mt-2">Enviar Mensaje</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
