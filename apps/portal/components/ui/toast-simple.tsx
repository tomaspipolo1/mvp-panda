"use client"

import { X } from "lucide-react"
import { useToast } from "./use-toast"

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            min-w-[300px] max-w-[400px] p-4 rounded-lg shadow-lg border
            ${
              toast.type === "error" ? "bg-red-500 text-white border-red-600" : "bg-white text-gray-900 border-gray-200"
            }
            animate-in slide-in-from-top-2 duration-300
          `}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{toast.title}</h4>
              {toast.description && <p className="text-sm opacity-90 mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className={`
                ml-2 p-1 rounded-md transition-colors
                ${toast.type === "error" ? "hover:bg-red-600 text-red-100" : "hover:bg-gray-100 text-gray-500"}
              `}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
