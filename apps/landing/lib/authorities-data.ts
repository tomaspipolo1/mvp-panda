export type AuthorityItem = {
  name: string
  position: string
  image: string
}

// Directorio: representantes del consorcio (gobierno, municipios, empresariales, sindicales)
export const directorio: AuthorityItem[] = [
  { name: "Dra. Susana Gonzalez", position: "Presidente del Consorcio de Gestión del Puerto La Plata", image: "/autoridades/susana.jpg" },
  { name: "Alejandro Sandez", position: "Municipalidad de Ensenada", image: "/autoridades/gerente.jpg" },
  { name: "Rodolfo Chavez", position: "Representante de YPF", image: "/autoridades/gerente.jpg" },
  { name: "Martin Fernandez", position: "Municipalidad de Berisso", image: "/autoridades/gerente.jpg" },
  { name: "Facundo Pennacchioni", position: "Representante TecPlata", image: "/autoridades/gerente.jpg" },
  { name: "Dardo Rodriguez", position: "Municipalidad de La Plata", image: "/autoridades/gerente.jpg" },
  { name: "Susana Giuletti", position: "Municipalidad de Ensenada", image: "/autoridades/gerenta.jpg" },
]

// Gerencias: equipo de gestión ejecutiva
export const gerentes: AuthorityItem[] = [
  { name: "Gerente de Administración", position: "Gerencia de Administración", image: "/autoridades/gerente.jpg" },
  { name: "Gerente de Obras", position: "Gerencia de Obras y Mantenimiento", image: "/autoridades/gerente.jpg" },
  { name: "Gerente Legal", position: "Gerencia de Legales", image: "/autoridades/gerente.jpg" },
  { name: "Gerente de Operaciones", position: "Gerencia de Operaciones", image: "/autoridades/gerente.jpg" },
  { name: "Gerente de RRII", position: "Gerencia de Relaciones Institucionales", image: "/autoridades/gerente.jpg" },
  { name: "Presidente", position: "Presidencia", image: "/autoridades/susana.jpg" },
]
