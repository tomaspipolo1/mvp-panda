"use client"

import { cn } from "@/lib/utils"

interface TabsDocumentosProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabsDocumentos({ activeTab, onTabChange }: TabsDocumentosProps) {
  const tabs = [
    { id: "facturas", label: "Facturas" },
    { id: "notasCredito", label: "Notas de Crédito" },
    { id: "notasDebito", label: "Notas de Débito" },
  ]

  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-4 px-1 border-b-2 font-semibold text-xl",
              activeTab === tab.id
                ? "border-plp-primary text-plp-darkest"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
