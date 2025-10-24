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
import { PlusIcon } from "lucide-react"

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
      <DialogContent className="bg-white shadow-2xl border-2 border-[--color-border]">
        <DialogHeader className="space-y-3 pb-2 text-center">
          <DialogTitle className="text-2xl text-center font-bold text-black">Add Event</DialogTitle>
          <DialogDescription className="text-base text-center">Fill in your event details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 py-6">
            <div className="grid gap-2.5">
              <Label htmlFor="title" className="text-sm font-semibold text-[--color-foreground]">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Team meeting"
                required
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="date" className="text-sm font-semibold text-[--color-foreground]">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="time" className="text-sm font-semibold text-[--color-foreground]">Time</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="description" className="text-sm font-semibold text-[--color-foreground]">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Additional event details"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-3 pt-4 items-center justify-center flex-col sm:flex-row">
            <Button type="submit" className="w-full sm:w-auto">Save Event
              <PlusIcon className="w-4 h-4 ml-2" />
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
