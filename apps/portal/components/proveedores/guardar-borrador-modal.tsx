"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface GuardarBorradorModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GuardarBorradorModal({ isOpen, onClose }: GuardarBorradorModalProps) {
  const router = useRouter()

  const handleContinueEditing = () => {
    onClose()
  }

  const handleGoToEntidades = () => {
    router.push("/usuario-basico/gestion/mis-entidades")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <DialogTitle className="text-center text-xl">Borrador guardado</DialogTitle>
          <DialogDescription className="text-center">
            Los datos han sido guardados como borrador correctamente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 mt-4">
          <Button type="button" variant="outline" onClick={handleContinueEditing}>
            Continuar editando
          </Button>
          <Button type="button" onClick={handleGoToEntidades}>
            Ir a Mis Entidades
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
