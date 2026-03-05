"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown, ChevronUp, Pencil, Plus, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ExpandablePanelProps {
  icon: ReactNode
  title: string
  children: ReactNode
  previewContent?: ReactNode
  defaultExpanded?: boolean
  actionButton?: "edit" | "add" | "upload" | "none"
  onActionClick?: () => void
  className?: string
}

export function ExpandablePanel({
  icon,
  title,
  children,
  previewContent,
  defaultExpanded = false,
  actionButton = "none",
  onActionClick,
  className,
}: ExpandablePanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const renderActionButton = () => {
    switch (actionButton) {
      case "edit":
        return (
          <Button variant="ghost" size="sm" onClick={onActionClick} className="mr-2">
            <Pencil className="h-4 w-4 mr-1" />
            Editar
          </Button>
        )
      case "add":
        return (
          <Button variant="ghost" size="sm" onClick={onActionClick} className="mr-2">
            <Plus className="h-4 w-4 mr-1" />
            Agregar
          </Button>
        )
      case "upload":
        return (
          <Button variant="ghost" size="sm" onClick={onActionClick} className="mr-2">
            <Upload className="h-4 w-4 mr-1" />
            Subir
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden", className)}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-plp-dark mr-3">{icon}</div>
          <h2 className="text-xl font-bold text-plp-darkest">{title}</h2>
        </div>
        <div className="flex items-center">
          {renderActionButton()}
          <Button variant="outline" size="sm" onClick={toggleExpand} className="flex items-center border-gray-300">
            {isExpanded ? "Contraer" : "Expandir"}
            {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Preview content - always visible */}
      {previewContent && !isExpanded && <div className="px-4 pb-4 border-t border-gray-200">{previewContent}</div>}

      {/* Full content - visible when expanded */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="p-4 pt-0 border-t border-gray-200">{children}</div>
      </div>
    </div>
  )
}
