"use client"
import { cn } from "@/lib/utils"

interface TabsDocumentosClienteProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabsDocumentosCliente({ activeTab, onTabChange }: TabsDocumentosClienteProps) {
  const tabs = [
    { id: "facturas", label: "Facturas" },
    { id: "notasCredito", label: "Notas de Crédito" },
    { id: "notasDebito", label: "Notas de Débito" },
  ]

  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "py-3 px-6 text-center font-medium focus:outline-none",
            activeTab === tab.id
              ? "border-b-2 border-plp-dark text-plp-darkest"
              : "text-gray-500 hover:text-plp-dark hover:border-b-2 hover:border-gray-300",
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
