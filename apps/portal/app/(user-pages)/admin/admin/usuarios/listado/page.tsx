"use client"

import { useMemo, useState } from "react"
import Swal from "sweetalert2"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosUsuarios, type FiltrosUsuarios as FiltrosUsuariosType } from "@/components/usuarios/filtros-usuarios"
import { TablaUsuarios, type Usuario } from "@/components/usuarios/tabla-usuarios"
import { UsuarioModal } from "@/components/usuarios/modal-usuario"
import { RolesUsuarioModal } from "@/components/usuarios/modal-roles-usuario"
import { ModalNuevoUsuario } from "@/components/usuarios/modal-nuevo-usuario"
import { showDeleteConfirm, showSuccess } from "@/lib/sweetalert"

const swalBaseConfig = {
  confirmButtonColor: "#002169",
  cancelButtonColor: "#6B7280",
  background: "#FFFFFF",
  color: "#374151",
  customClass: {
    popup: "rounded-lg shadow-xl",
    title: "text-lg font-semibold",
    content: "text-sm",
    confirmButton: "rounded-md px-4 py-2 font-medium",
    cancelButton: "rounded-md px-4 py-2 font-medium",
    denyButton: "rounded-md px-4 py-2 font-medium",
  },
}

const rolesDisponiblesBase = ["Admin", "Compras", "RRHH", "Seguridad", "Legal", "Prensa"]

const usuariosIniciales: Usuario[] = [
  {
    id: 1,
    email: "maria.garcia@plp.com",
    nombre: "María",
    apellido: "García",
    dni: "30123456",
    telefono: "+54 9 11 5555-1111",
    fechaNacimiento: "1990-04-15",
    estado: "Activo",
    roles: ["Admin", "Compras"],
  },
  {
    id: 2,
    email: "juan.perez@plp.com",
    nombre: "Juan",
    apellido: "Pérez",
    dni: "28987654",
    telefono: "+54 9 11 4444-2222",
    fechaNacimiento: "1987-11-02",
    estado: "Inactivo",
    roles: ["RRHH"],
  },
  {
    id: 3,
    email: "ana.lopez@plp.com",
    nombre: "Ana",
    apellido: "López",
    dni: "31222333",
    telefono: "+54 9 261 333-4444",
    fechaNacimiento: "1995-07-28",
    estado: "Activo",
    roles: ["Seguridad", "Legal"],
  },
  {
    id: 4,
    email: "carlos.suarez@plp.com",
    nombre: "Carlos",
    apellido: "Suárez",
    dni: "27777888",
    telefono: "+54 9 223 777-8888",
    fechaNacimiento: "1985-02-10",
    estado: "Bloqueado",
    roles: ["Prensa"],
  },
  {
    id: 5,
    email: "lucia.mendez@plp.com",
    nombre: "Lucía",
    apellido: "Méndez",
    dni: "30555111",
    telefono: "+54 9 299 555-1111",
    fechaNacimiento: "1992-09-19",
    estado: "Activo",
    roles: ["Compras"],
  },
]

type ModalMode = "view" | "edit"

const filtrarUsuarios = (usuarios: Usuario[], filtros: FiltrosUsuariosType) => {
  let resultado = [...usuarios]

  if (filtros.busqueda) {
    const term = filtros.busqueda.toLowerCase()
    resultado = resultado.filter(
      (u) =>
        u.email.toLowerCase().includes(term) ||
        u.nombre.toLowerCase().includes(term) ||
        u.apellido.toLowerCase().includes(term) ||
        u.dni.toLowerCase().includes(term)
    )
  }

  if (filtros.rol !== "Todos") {
    resultado = resultado.filter((u) => u.roles.includes(filtros.rol))
  }

  if (filtros.estado !== "Todos") {
    resultado = resultado.filter((u) => u.estado === filtros.estado)
  }

  return resultado
}

export default function ListadoUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciales)
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>(usuariosIniciales)
  const [filtros, setFiltros] = useState<FiltrosUsuariosType>({ busqueda: "", rol: "Todos", estado: "Todos" })
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null)
  const [modoModal, setModoModal] = useState<ModalMode>("view")
  const [modalUsuarioAbierto, setModalUsuarioAbierto] = useState(false)
  const [modalRolesAbierto, setModalRolesAbierto] = useState(false)
  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false)

  const totalActivos = useMemo(() => usuarios.filter((u) => u.estado === "Activo").length, [usuarios])

  const handleFiltrar = (filtrosNuevos: FiltrosUsuariosType) => {
    setFiltros(filtrosNuevos)
    setUsuariosFiltrados(filtrarUsuarios(usuarios, filtrosNuevos))
  }

  const handleVer = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario)
    setModoModal("view")
    setModalUsuarioAbierto(true)
  }

  const handleEditar = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario)
    setModoModal("edit")
    setModalUsuarioAbierto(true)
  }

  const handleEliminar = async (usuario: Usuario) => {
    const confirmacion = await showDeleteConfirm(usuario.email)
    if (confirmacion.isConfirmed) {
      const lista = usuarios.filter((u) => u.id !== usuario.id)
      setUsuarios(lista)
      setUsuariosFiltrados(filtrarUsuarios(lista, filtros))
      showSuccess("Usuario eliminado", `${usuario.email} fue eliminado.`)
    }
  }

  const handleResetPassword = async (usuario: Usuario) => {
    const eleccion = await Swal.fire({
      ...swalBaseConfig,
      icon: "question",
      title: "Resetear contraseña",
      text: `¿Cómo querés resetear la contraseña de ${usuario.email}?`,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Enviar mail de reseteo",
      denyButtonText: "Ingresar manualmente",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    })

    if (eleccion.isDismissed) return

    if (eleccion.isConfirmed) {
      showSuccess("Contraseña reseteada", "Se envió un correo al usuario con instrucciones.")
      return
    }

    if (eleccion.isDenied) {
      const manual = await Swal.fire({
        ...swalBaseConfig,
        icon: "info",
        title: "Ingresar nueva contraseña",
        html: `
          <input type="password" id="swal-pass-1" class="swal2-input" placeholder="Nueva contraseña" />
          <input type="password" id="swal-pass-2" class="swal2-input" placeholder="Confirmar contraseña" />
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        preConfirm: () => {
          const pass1 = (document.getElementById("swal-pass-1") as HTMLInputElement | null)?.value.trim() || ""
          const pass2 = (document.getElementById("swal-pass-2") as HTMLInputElement | null)?.value.trim() || ""
          if (!pass1 || !pass2) {
            Swal.showValidationMessage("Completá ambos campos.")
            return false
          }
          if (pass1.length < 8) {
            Swal.showValidationMessage("La contraseña debe tener al menos 8 caracteres.")
            return false
          }
          if (pass1 !== pass2) {
            Swal.showValidationMessage("Las contraseñas no coinciden.")
            return false
          }
          return pass1
        },
      })

      if (manual.isConfirmed && manual.value) {
        showSuccess("Contraseña actualizada", "La contraseña fue reseteada manualmente.")
      }
    }
  }

  const handleGestionarRoles = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario)
    setModalRolesAbierto(true)
  }

  const handleCrearUsuario = (nuevo: Omit<Usuario, "id" | "estado" | "roles"> & { roles?: string[] }) => {
    const nuevoId = (usuarios.length ? Math.max(...usuarios.map((u) => u.id)) : 0) + 1
    const usuarioFinal: Usuario = {
      id: nuevoId,
      estado: "Activo",
      roles: nuevo.roles || [],
      ...nuevo,
    }
    const lista = [...usuarios, usuarioFinal]
    setUsuarios(lista)
    setUsuariosFiltrados(filtrarUsuarios(lista, filtros))
    setModalNuevoAbierto(false)
    showSuccess("Usuario creado", "El usuario fue creado correctamente.")
  }

  const handleGuardarUsuario = (usuarioActualizado: Usuario) => {
    const lista = usuarios.map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
    setUsuarios(lista)
    setUsuariosFiltrados(filtrarUsuarios(lista, filtros))
    setModalUsuarioAbierto(false)
    setUsuarioSeleccionado(null)
    showSuccess("Usuario actualizado", "Los cambios fueron guardados.")
  }

  const handleGuardarRoles = (roles: string[]) => {
    if (!usuarioSeleccionado) return
    const lista = usuarios.map((u) =>
      u.id === usuarioSeleccionado.id ? { ...u, roles } : u
    )
    setUsuarios(lista)
    setUsuariosFiltrados(filtrarUsuarios(lista, filtros))
    setModalRolesAbierto(false)
    setUsuarioSeleccionado(null)
    showSuccess("Roles actualizados", "Se guardaron los roles del usuario.")
  }

  const cerrarModalUsuario = () => {
    setModalUsuarioAbierto(false)
    setUsuarioSeleccionado(null)
  }

  const cerrarModalRoles = () => {
    setModalRolesAbierto(false)
    setUsuarioSeleccionado(null)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p className="text-sm text-gray-500">Activos: {totalActivos} | Total: {usuarios.length}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setModalNuevoAbierto(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo usuario
        </Button>
      </div>

      <FiltrosUsuarios onFilter={handleFiltrar} rolesDisponibles={rolesDisponiblesBase} />

      <TablaUsuarios
        usuarios={usuariosFiltrados}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onResetPassword={handleResetPassword}
        onGestionarRoles={handleGestionarRoles}
      />

      <UsuarioModal
        isOpen={modalUsuarioAbierto}
        mode={modoModal}
        usuario={usuarioSeleccionado}
        onClose={cerrarModalUsuario}
        onGuardar={handleGuardarUsuario}
      />

      <RolesUsuarioModal
        isOpen={modalRolesAbierto}
        usuario={usuarioSeleccionado}
        rolesDisponibles={rolesDisponiblesBase}
        onClose={cerrarModalRoles}
        onGuardar={handleGuardarRoles}
      />

      <ModalNuevoUsuario
        isOpen={modalNuevoAbierto}
        onClose={() => setModalNuevoAbierto(false)}
        onCrear={handleCrearUsuario}
      />
    </div>
  )
}
