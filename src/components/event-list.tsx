import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CalendarIcon, Clock } from "lucide-react"
import type { CalendarEvent } from "@/components/calendar"
import { EventDetailsDialog } from "@/components/event-details-dialog"

interface EventListProps {
  events: CalendarEvent[]
  currentMonth: number
  currentYear: number
  onDeleteEvent: (id: string) => void
  onEditEvent?: (event: CalendarEvent) => void
}

export function EventList({ events, currentMonth, currentYear, onDeleteEvent, onEditEvent }: EventListProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDetailsOpen(true)
  }

  const handleEdit = (event: CalendarEvent) => {
    onEditEvent?.(event)
  }

  const getCategoryColor = (category?: "work" | "personal" | "reminder" | "other") => {
    switch (category) {
      case "work":
        return "bg-blue-100 border-blue-500 text-blue-700"
      case "personal":
        return "bg-green-100 border-green-500 text-green-700"
      case "reminder":
        return "bg-yellow-100 border-yellow-500 text-yellow-700"
      default:
        return "bg-purple-100 border-purple-500 text-purple-700"
    }
  }

  const getCategoryIcon = (category?: "work" | "personal" | "reminder" | "other") => {
    switch (category) {
      case "work":
        return "💼"
      case "personal":
        return "👤"
      case "reminder":
        return "🔔"
      default:
        return "📌"
    }
  }

  const filteredEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      if (dateA === dateB) {
        return a.time.localeCompare(b.time)
      }
      return dateA - dateB
    })

  return (
    <Card className="p-6 bg-white">
      <h3 className="mb-4 text-xl font-semibold text-center ">Monthly Events</h3>
      {filteredEvents.length === 0 ? (
        <p className="text-center text-[--color-muted-foreground]">No events this month</p>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className={`p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-l-4 ${getCategoryColor(event.category)}`}
              onClick={() => handleEventClick(event)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(event.category)}</span>
                    <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  </div>
                  <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  {event.description && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.description}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <EventDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        event={selectedEvent}
        onEdit={handleEdit}
        onDelete={onDeleteEvent}
      />
    </Card>
  )
}
