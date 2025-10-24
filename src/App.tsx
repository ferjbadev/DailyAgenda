import Calendar from "@/components/calendar"

export default function App() {
  return (
    <main className="min-h-screen bg-[--color-background] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[--color-primary]">My Calendar</h1>
          <p className="mt-2 text-[--color-muted-foreground]">Organize your events and stay up to date</p>
        </header>
        <Calendar />
      </div>
    </main>
  )
}
