"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Download, FileText, MoreVertical } from "lucide-react"
import { RESOURCE_ICON_MAP } from "./icon-options"
import type { ResourceCategoryItem } from "./types"

interface ResourceCategoryCardProps {
  item: ResourceCategoryItem
  onEdit: (item: ResourceCategoryItem) => void
  onDelete: (item: ResourceCategoryItem) => void
}

export function ResourceCategoryCard({ item, onEdit, onDelete }: ResourceCategoryCardProps) {
  const Icon = RESOURCE_ICON_MAP[item.icon]

  return (
    <Card className="p-5 border border-gray-200 shadow-sm bg-white flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-semibold text-plp-darkest truncate">{item.title}</h3>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(item)} className="text-red-600 focus:text-red-600">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">{item.description}</p>

      <Card className="p-4 border border-gray-200 mt-auto">
        <div className="flex items-start gap-2 mb-2">
          <FileText className="h-4 w-4 text-plp-primary mt-0.5 shrink-0" />
          <h4 className="font-semibold text-plp-darkest leading-snug">{item.file.title}</h4>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>{item.file.fileSize}</span>
          <span>{item.file.fileDate}</span>
        </div>
        <Button asChild className="w-full bg-[#002060] hover:bg-[#001a4d] text-white">
          <a href={item.file.fileUrl} download={item.file.fileName}>
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </a>
        </Button>
      </Card>
    </Card>
  )
}
