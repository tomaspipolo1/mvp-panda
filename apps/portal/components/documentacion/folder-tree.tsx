import { Folder, ChevronRight, ChevronDown } from "lucide-react"
import { FolderItem } from "@/hooks/use-documentacion"

interface FolderTreeProps {
  folders: FolderItem[]
  searchTerm: string
  onToggleFolder: (folderId: string) => void
  onNavigateToFolder: (folder: FolderItem, path: string[]) => void
}

export function FolderTree({ folders, searchTerm, onToggleFolder, onNavigateToFolder }: FolderTreeProps) {
  const renderFolderTree = (folder: FolderItem, depth = 0, parentPath: string[] = []) => {
    const currentPath = [...parentPath, folder.name]

    return (
      <div key={folder.id} className="select-none">
        <div
          className={`flex items-center py-1 px-2 rounded hover:bg-gray-100 cursor-pointer ${depth > 0 ? "ml-" + (depth * 4) : ""}`}
          onClick={() => onToggleFolder(folder.id)}
        >
          {folder.expanded ? (
            <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
          )}
          <Folder className="h-5 w-5 mr-2 text-yellow-400" />
          <span
            className="text-sm"
            onClick={(e) => {
              e.stopPropagation()
              onNavigateToFolder(folder, currentPath)
            }}
          >
            {folder.name}
          </span>
        </div>

        {folder.expanded && (
          <div>{folder.subfolders.map((subfolder) => renderFolderTree(subfolder, depth + 1, currentPath))}</div>
        )}
      </div>
    )
  }

  const filteredFolders = folders.filter(
    (folder) => searchTerm === "" || folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-1">
      {filteredFolders.map((folder) => renderFolderTree(folder))}
    </div>
  )
}

