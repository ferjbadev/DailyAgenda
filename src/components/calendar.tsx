import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { AddEventDialog } from "@/components/add-event-dialog"
import { EventList } from "@/components/event-list"

export interface CalendarEvent {
  id: string
  title: string
  date: Date
  time: string
  description?: string
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day)
    setSelectedDate(date)
    setIsDialogOpen(true)
  }

  const handleAddEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    }
    setEvents([...events, newEvent])
    setIsDialogOpen(false)
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event)
    setSelectedDate(new Date(event.date))
    setIsDialogOpen(true)
  }

  const getEventsForDate = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
    })
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square p-2 border-r border-b border-black" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day)
      const isToday =
        day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`aspect-square p-2 transition-colors hover:bg-[--color-accent] hover:text-[--color-accent-foreground] cursor-pointer border-r border-b border-black ${
            isToday ? "bg-[--color-primary] text-[--color-primary-foreground] font-semibold" : ""
          }`}
        >
          <div className="flex h-full flex-col">
            <span className="text-sm">{day}</span>
            {dayEvents.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="h-1.5 w-1.5 rounded-full bg-[--color-primary]" />
                ))}
                {dayEvents.length > 2 && (
                  <span className="text-[10px] text-black">+{dayEvents.length - 2}</span>
                )}
              </div>
            )}
          </div>
        </button>,
      )
    }

    return days
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="p-6 lg:col-span-2 bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {MONTHS[month]} {year}
          </h2>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 border border-black">
          {DAYS.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-[--color-muted-foreground] border-b border-black">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>

        <div className="mt-6 flex justify-center">
          <Button onClick={() => setIsDialogOpen(true)} className="w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </Card>

      <div className="lg:col-span-1">
        <EventList events={events} currentMonth={month} currentYear={year} onDeleteEvent={handleDeleteEvent} onEditEvent={handleEditEvent} />
      </div>

      <AddEventDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
      />
    </div>
  )
}
