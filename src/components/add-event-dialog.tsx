import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CalendarEvent } from "@/components/calendar"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEvent: (event: Omit<CalendarEvent, "id">) => void
  selectedDate: Date | null
}

export function AddEventDialog({ open, onOpenChange, onAddEvent, selectedDate }: AddEventDialogProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const day = String(selectedDate.getDate()).padStart(2, "0")
      setDate(`${year}-${month}-${day}`)
    }
  }, [selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && date && time) {
      onAddEvent({
        title,
        date: new Date(date),
        time,
        description,
      })
      // Reset form
      setTitle("")
      setDate("")
      setTime("")
      setDescription("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Agregar Evento</DialogTitle>
          <DialogDescription>Completa los detalles de tu evento</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Reunión de equipo"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Hora</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalles adicionales del evento"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Evento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
