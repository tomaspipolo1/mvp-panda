import { HelpCircle, Mail, Phone } from "lucide-react"

export default function AyudaPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-plp-darkest">Centro de Ayuda</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="h-6 w-6 text-plp-primary mr-2" />
            <h2 className="text-xl font-semibold text-plp-darkest">Preguntas Frecuentes</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Encuentra respuestas a las preguntas más comunes sobre el uso del portal.
          </p>
          <a href="#faq" className="text-plp-primary hover:text-plp-dark font-medium">
            Ver preguntas frecuentes →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 text-plp-primary mr-2" />
            <h2 className="text-xl font-semibold text-plp-darkest">Contacto por Email</h2>
          </div>
          <p className="text-gray-600 mb-4">Envíanos un correo electrónico y te responderemos a la brevedad.</p>
          <a href="mailto:soporte@plp.com" className="text-plp-primary hover:text-plp-dark font-medium">
            soporte@plp.com
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-6 w-6 text-plp-primary mr-2" />
            <h2 className="text-xl font-semibold text-plp-darkest">Soporte Telefónico</h2>
          </div>
          <p className="text-gray-600 mb-4">Llámanos para recibir asistencia inmediata de nuestro equipo de soporte.</p>
          <a href="tel:+541112345678" className="text-plp-primary hover:text-plp-dark font-medium">
            +54 11 1234-5678
          </a>
        </div>
      </div>

      <div id="faq" className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6 text-plp-darkest">Preguntas Frecuentes</h2>

        <div className="space-y-6">
          {preguntas.map((pregunta, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
              <h3 className="text-lg font-medium mb-2 text-plp-darkest">{pregunta.pregunta}</h3>
              <p className="text-gray-600">{pregunta.respuesta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Datos de ejemplo para las preguntas frecuentes
const preguntas = [
  {
    pregunta: "¿Cómo puedo registrar una nueva entidad?",
    respuesta:
      "Para registrar una nueva entidad, debes ir a la sección 'Mis Entidades' y hacer clic en el botón 'Nueva Entidad'. Completa el formulario con los datos requeridos y haz clic en 'Guardar'.",
  },
  {
    pregunta: "¿Cómo programo una visita?",
    respuesta:
      "Para programar una visita, ve a la sección 'Visitas' y haz clic en 'Nueva Visita'. Selecciona el tipo de visita, la entidad, la fecha y hora, y agrega las personas y vehículos que participarán en la visita.",
  },
  {
    pregunta: "¿Puedo cancelar una visita programada?",
    respuesta:
      "Sí, puedes cancelar una visita programada. Ve a la sección 'Mis Visitas', busca la visita que deseas cancelar y haz clic en el botón 'Cancelar'. Deberás confirmar la cancelación.",
  },
  {
    pregunta: "¿Cómo actualizo mi información personal?",
    respuesta:
      "Para actualizar tu información personal, ve a la sección 'Perfil' y selecciona 'Datos Personales'. Allí podrás modificar tus datos y guardar los cambios.",
  },
  {
    pregunta: "¿Cómo cambio mi contraseña?",
    respuesta:
      "Para cambiar tu contraseña, ve a la sección 'Perfil' y selecciona 'Seguridad'. Ingresa tu contraseña actual y la nueva contraseña, confirma la nueva contraseña y haz clic en 'Guardar'.",
  },
]
