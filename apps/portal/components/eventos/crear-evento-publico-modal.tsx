import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface CrearEventoPublicoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: any) => void;
}

export default function CrearEventoPublicoModal({ open, onOpenChange, onConfirm }: CrearEventoPublicoModalProps) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState("");

  // Limpiar el estado al cerrar el modal
  useEffect(() => {
    if (!open) {
      setTitulo("");
      setDescripcion("");
      setUbicacion("");
      setFechaInicio("");
      setHoraInicio("");
      setFechaFin("");
      setHoraFin("");
      setImagen(null);
      setError("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Crear Evento Público</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda: Datos del evento */}
          <div className="flex flex-col gap-4 justify-between h-full">
            <div>
              <label className="block text-sm font-medium mb-1">Título del evento</label>
              <Input placeholder="Título del evento" value={titulo} onChange={e => setTitulo(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ubicación</label>
              <Input placeholder="Ubicación" value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Fecha inicio</label>
                <Input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Hora inicio</label>
                <Input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Fecha fin</label>
                <Input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Hora fin</label>
                <Input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} />
              </div>
            </div>
          </div>
          {/* Columna derecha: Descripción e imagen */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <Textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                className="w-full min-h-[180px] flex-1 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Imagen</label>
              <Input type="file" accept="image/*" onChange={e => setImagen(e.target.files?.[0] || null)} />
            </div>
            <div className="flex-1 flex items-center justify-center mt-2">
              {imagen ? (
                <img
                  src={URL.createObjectURL(imagen)}
                  alt="Vista previa"
                  className="max-h-48 rounded border shadow"
                />
              ) : (
                <div className="text-gray-400 text-sm italic">Vista previa de la imagen</div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => {
            // Validación de campos obligatorios
            if (!titulo.trim() || !descripcion.trim() || !ubicacion.trim() || !fechaInicio || !horaInicio || !fechaFin || !horaFin) {
              setError("Por favor, completa todos los campos obligatorios.");
              return;
            }
            setError("");
            onConfirm({
              titulo,
              descripcion,
              ubicacion,
              fechaInicio,
              horaInicio,
              fechaFin,
              horaFin,
              imagen
            });
            onOpenChange(false);
          }}>Crear</Button>
        </DialogFooter>
        {error && (
          <div className="text-red-600 text-sm mt-2 text-center w-full">{error}</div>
        )}
      </DialogContent>
    </Dialog>
  );
} 