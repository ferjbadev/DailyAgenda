import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CalendarIcon, Clock, Edit, Trash2 } from "lucide-react"
import type { CalendarEvent } from "@/components/calendar"

interface EventDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: CalendarEvent | null
  onEdit: (event: CalendarEvent) => void
  onDelete: (id: string) => void
}

export function EventDetailsDialog({ open, onOpenChange, event, onEdit, onDelete }: EventDetailsDialogProps) {
  if (!event) return null

  const handleEdit = () => {
    onEdit(event)
    onOpenChange(false)
  }

  const handleDelete = () => {
    onDelete(event.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white shadow-2xl border-2 border-[--color-border]">
        <DialogHeader className="space-y-3 pb-2 text-center">
          <DialogTitle className="text-2xl font-bold text-black">Event Details</DialogTitle>
          <DialogDescription className="text-base">View and manage your event</DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">{event.title}</h3>
          </div>
          
          <div className="flex items-center gap-3 text-[--color-foreground]">
            <CalendarIcon className="h-5 w-5 text-[--color-primary]" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-[--color-foreground]">
            <Clock className="h-5 w-5 text-[--color-primary]" />
            <span>{event.time}</span>
          </div>
          
          {event.description && (
            <div className="pt-2">
              <p className="text-sm font-semibold text-black mb-1">Description:</p>
              <p className="text-[--color-foreground]">{event.description}</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-3 pt-4 items-center justify-center flex-col sm:flex-row">
          <Button 
            onClick={handleEdit}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Event
          </Button>
          <Button 
            onClick={handleDelete}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 border-2 border-red-500 hover:border-red-600 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
