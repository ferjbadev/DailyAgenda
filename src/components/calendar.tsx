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
  category?: "work" | "personal" | "reminder" | "other"
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
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('calendar-events')
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.map((event: CalendarEvent) => ({
        ...event,
        date: new Date(event.date)
      }))
    }
    return []
  })
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
    if (editingEvent) {
      // Update existing event
      const updatedEvents = events.map(e => 
        e.id === editingEvent.id ? { ...event, id: editingEvent.id } : e
      )
      setEvents(updatedEvents)
      localStorage.setItem('calendar-events', JSON.stringify(updatedEvents))
    } else {
      // Check for duplicate events (same title, date, and time)
      const isDuplicate = events.some(e => 
        e.title.toLowerCase() === event.title.toLowerCase() &&
        new Date(e.date).toDateString() === new Date(event.date).toDateString() &&
        e.time === event.time
      )
      
      if (isDuplicate) {
        alert('An event with the same title, date, and time already exists!')
        return
      }
      
      // Add new event
      const newEvent: CalendarEvent = {
        ...event,
        id: Math.random().toString(36).substr(2, 9),
      }
      const updatedEvents = [...events, newEvent]
      setEvents(updatedEvents)
      localStorage.setItem('calendar-events', JSON.stringify(updatedEvents))
    }
    setIsDialogOpen(false)
    setEditingEvent(null)
  }

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id)
    setEvents(updatedEvents)
    localStorage.setItem('calendar-events', JSON.stringify(updatedEvents))
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event)
    setSelectedDate(new Date(event.date))
    setIsDialogOpen(true)
  }

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      setEditingEvent(null)
    }
  }

  const getEventsForDate = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
    })
  }

  const getCategoryColor = (category?: "work" | "personal" | "reminder" | "other") => {
    switch (category) {
      case "work":
        return "bg-blue-500"
      case "personal":
        return "bg-green-500"
      case "reminder":
        return "bg-yellow-500"
      default:
        return "bg-purple-500"
    }
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square p-2 border-r border-b border-gray-300 bg-gray-50/50 last:border-r-0" />)
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
          className={`aspect-square p-2 transition-all duration-200 hover:bg-blue-50 cursor-pointer border-r border-b border-gray-300 relative last:border-r-0 ${
            isToday ? "bg-blue-100 font-semibold ring-2 ring-blue-500 ring-inset" : "bg-white"
          }`}
        >
          <div className="flex h-full flex-col">
            <span className={`text-sm ${isToday ? "text-blue-600" : "text-gray-700"}`}>{day}</span>
            {dayEvents.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div 
                    key={event.id} 
                    className={`h-1.5 w-1.5 rounded-full ${getCategoryColor(event.category)} shadow-sm`}
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <span className="text-[10px] font-medium text-gray-600">+{dayEvents.length - 3}</span>
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
      <Card className="p-6 lg:col-span-2 bg-white shadow-lg">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            {MONTHS[month]} {year}
          </h2>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="icon" onClick={previousMonth} className="hover:bg-blue-50 hover:border-blue-300">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth} className="hover:bg-blue-50 hover:border-blue-300">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          {DAYS.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-semibold text-gray-700 bg-gray-50 border-b border-r border-gray-300 last:border-r-0">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Button onClick={() => setIsDialogOpen(true)} className="w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        {/* Category Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-2 text-center">Categories</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Work</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Personal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">Reminder</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span className="text-gray-600">Other</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="lg:col-span-1">
        <EventList events={events} currentMonth={month} currentYear={year} onDeleteEvent={handleDeleteEvent} onEditEvent={handleEditEvent} />
      </div>

      <AddEventDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
        editingEvent={editingEvent}
      />
    </div>
  )
}
