import { Button } from "@/components/ui/button"
import { Folder, ArrowLeft, FileIcon as FilePdf } from "lucide-react"
import { FolderItem } from "@/hooks/use-documentacion"

interface FolderContentProps {
  folder: FolderItem
  currentPath: string[]
  onGoBack: () => void
  onNavigateToFolder: (folder: FolderItem, path: string[]) => void
}

export function FolderContent({ folder, currentPath, onGoBack, onNavigateToFolder }: FolderContentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onGoBack} disabled={currentPath.length === 0}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
        <span className="text-sm text-gray-500">{currentPath.join(" / ")}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {folder.subfolders.map((subfolder) => (
          <div
            key={subfolder.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigateToFolder(subfolder, [...currentPath, subfolder.name])}
          >
            <div className="flex flex-col items-center justify-center">
              <Folder className="h-16 w-16 text-yellow-400 mb-2" />
              <h3 className="font-medium text-center">{subfolder.name}</h3>
              <p className="text-xs text-gray-500">{subfolder.files.length} archivos</p>
            </div>
          </div>
        ))}

        {folder.files.map((file) => (
          <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center justify-center">
              <FilePdf className="h-16 w-16 text-red-500 mb-2" />
              <h3 className="font-medium text-center text-sm">{file.name}</h3>
              <p className="text-xs text-gray-500">
                {file.size} • {file.updatedAt}
              </p>
              <div className="mt-2">
                <Button variant="outline" size="sm">
                  Ver documento
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

