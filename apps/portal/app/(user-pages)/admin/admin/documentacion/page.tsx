"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Folder, Plus, Search } from "lucide-react"
import { SubirDocumentosModal } from "@/components/documentacion/subir-documentos-modal"
import { FolderTree } from "@/components/documentacion/folder-tree"
import { FolderContent } from "@/components/documentacion/folder-content"
import { NewFolderDialog } from "@/components/documentacion/new-folder-dialog"
import { useDocumentacion } from "@/hooks/use-documentacion"

export default function DocumentacionPage() {
  const { folders, selectedFolder, currentPath, searchTerm, setSearchTerm, navigateToFolder, goBack, toggleFolder } =
    useDocumentacion()

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Documentación</h1>
        <div className="flex space-x-2">
          <NewFolderDialog folders={folders} />
          <SubirDocumentosModal />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-start gap-6 p-6">
          {/* Panel izquierdo - Árbol de carpetas */}
          <div className="w-full md:w-1/4 border rounded-lg p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar carpetas..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <FolderTree
              folders={folders}
              searchTerm={searchTerm}
              onToggleFolder={toggleFolder}
              onNavigateToFolder={navigateToFolder}
            />
          </div>

          {/* Panel derecho - Contenido de la carpeta */}
          <div className="w-full md:w-3/4 border rounded-lg p-4">
            {selectedFolder ? (
              <FolderContent
                folder={selectedFolder}
                currentPath={currentPath}
                onGoBack={goBack}
                onNavigateToFolder={navigateToFolder}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigateToFolder(folder, [folder.name])}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Folder className="h-16 w-16 text-yellow-400 mb-2" />
                      <h3 className="font-medium text-center">{folder.name}</h3>
                      <p className="text-xs text-gray-500">
                        {folder.subfolders.length} subcarpetas • {folder.files.length} archivos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

