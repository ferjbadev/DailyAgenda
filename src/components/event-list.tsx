import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, CalendarIcon, Clock } from "lucide-react"
import type { CalendarEvent } from "@/components/calendar"

interface EventListProps {
  events: CalendarEvent[]
  currentMonth: number
  currentYear: number
  onDeleteEvent: (id: string) => void
}

export function EventList({ events, currentMonth, currentYear, onDeleteEvent }: EventListProps) {
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
    <Card className="p-6">
      <h3 className="mb-4 text-xl font-semibold">Eventos del Mes</h3>
      {filteredEvents.length === 0 ? (
        <p className="text-center text-[--color-muted-foreground]">No hay eventos este mes</p>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-[--color-card-foreground]">{event.title}</h4>
                  <div className="mt-2 flex flex-col gap-1 text-sm text-[--color-muted-foreground]">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>
                        {new Date(event.date).toLocaleDateString("es-ES", {
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
                  {event.description && <p className="mt-2 text-sm text-[--color-muted-foreground]">{event.description}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteEvent(event.id)}
                  className="text-[--color-destructive] hover:text-[--color-destructive]"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  )
}
