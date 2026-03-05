import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { FolderItem } from "@/hooks/use-documentacion"

interface NewFolderDialogProps {
  folders: FolderItem[]
}

export function NewFolderDialog({ folders }: NewFolderDialogProps) {
  const [folderName, setFolderName] = useState("")
  const [parentFolder, setParentFolder] = useState("")

  const handleCreate = () => {
    console.log("Crear carpeta:", { folderName, parentFolder })
    // Aquí iría la lógica para crear la carpeta
    setFolderName("")
    setParentFolder("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Nueva carpeta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nueva carpeta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre de la carpeta</label>
            <Input
              placeholder="Ingrese el nombre de la carpeta"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Carpeta padre (opcional)</label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={parentFolder}
              onChange={(e) => setParentFolder(e.target.value)}
            >
              <option value="">Carpeta raíz</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => {
                setFolderName("")
                setParentFolder("")
              }}>
                Cancelar
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button onClick={handleCreate} disabled={!folderName.trim()}>
                Crear carpeta
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

