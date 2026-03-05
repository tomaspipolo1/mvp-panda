import { useState } from "react"

// Definición de tipos
export type FileItem = {
  id: string
  name: string
  type: "pdf" | "doc" | "xls" | "other"
  size: string
  updatedAt: string
}

export type FolderItem = {
  id: string
  name: string
  files: FileItem[]
  subfolders: FolderItem[]
  expanded?: boolean
}

// Datos iniciales de ejemplo
const initialFolders: FolderItem[] = [
  {
    id: "1",
    name: "Certificación de Calidad",
    files: [],
    subfolders: [
      {
        id: "1-1",
        name: "Normas ISO",
        files: [
          {
            id: "f1",
            name: "ISO-9001-2023.pdf",
            type: "pdf",
            size: "2.4 MB",
            updatedAt: "15/03/2023",
          },
          {
            id: "f2",
            name: "Manual-Calidad.pdf",
            type: "pdf",
            size: "3.7 MB",
            updatedAt: "10/01/2023",
          },
        ],
        subfolders: [],
      },
    ],
    expanded: false,
  },
  {
    id: "2",
    name: "Tarifario",
    files: [],
    subfolders: [
      {
        id: "2-1",
        name: "Terrestre",
        files: [
          {
            id: "f3",
            name: "Tarifas-Nacionales-2023.pdf",
            type: "pdf",
            size: "1.8 MB",
            updatedAt: "05/02/2023",
          },
          {
            id: "f4",
            name: "Tarifas-Internacionales-2023.pdf",
            type: "pdf",
            size: "2.1 MB",
            updatedAt: "05/02/2023",
          },
        ],
        subfolders: [],
        expanded: false,
      },
      {
        id: "2-2",
        name: "Nautica",
        files: [
          {
            id: "f5",
            name: "Tarifas-Maritimas-2023.pdf",
            type: "pdf",
            size: "1.5 MB",
            updatedAt: "10/02/2023",
          },
        ],
        subfolders: [],
        expanded: false,
      },
    ],
    expanded: false,
  },
  {
    id: "3",
    name: "Manuales Operativos",
    files: [
      {
        id: "f6",
        name: "Manual-Procedimientos.pdf",
        type: "pdf",
        size: "4.2 MB",
        updatedAt: "20/01/2023",
      },
    ],
    subfolders: [],
    expanded: false,
  },
  {
    id: "4",
    name: "Presentaciones Corporativas",
    files: [
      {
        id: "f7",
        name: "Presentacion-Institucional.pdf",
        type: "pdf",
        size: "5.8 MB",
        updatedAt: "15/12/2022",
      },
    ],
    subfolders: [],
    expanded: false,
  },
  {
    id: "5",
    name: "Comunicados de Prensa",
    files: [],
    subfolders: [],
    expanded: false,
  },
]

export function useDocumentacion() {
  const [folders, setFolders] = useState<FolderItem[]>(initialFolders)
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Función para expandir/colapsar carpetas
  const toggleFolder = (folderId: string) => {
    const updateFolders = (items: FolderItem[]): FolderItem[] => {
      return items.map((folder) => {
        if (folder.id === folderId) {
          return { ...folder, expanded: !folder.expanded }
        }

        if (folder.subfolders.length > 0) {
          return {
            ...folder,
            subfolders: updateFolders(folder.subfolders),
          }
        }

        return folder
      })
    }

    setFolders(updateFolders(folders))
  }

  // Función para navegar a una carpeta
  const navigateToFolder = (folder: FolderItem, path: string[]) => {
    setSelectedFolder(folder)
    setCurrentPath(path)
  }

  // Función para volver atrás en la navegación
  const goBack = () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath]
      newPath.pop()

      // Encontrar la carpeta correspondiente a la nueva ruta
      let targetFolder: FolderItem | null = null
      let tempFolders = folders

      for (const folderName of newPath) {
        const found = tempFolders.find((f) => f.name === folderName)
        if (found) {
          targetFolder = found
          tempFolders = found.subfolders
        }
      }

      setSelectedFolder(targetFolder)
      setCurrentPath(newPath)
    } else {
      setSelectedFolder(null)
      setCurrentPath([])
    }
  }

  return {
    folders,
    selectedFolder,
    currentPath,
    searchTerm,
    setSearchTerm,
    navigateToFolder,
    goBack,
    toggleFolder,
  }
}

