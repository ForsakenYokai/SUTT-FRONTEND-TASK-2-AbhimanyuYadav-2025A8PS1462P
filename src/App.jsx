import { useState } from 'react'
import EventForm from './components/EventForm'
import Timeline from './components/Timeline'

function App() {
  const [events, setEvents] = useState([])

  function handleAddEvent(newEvent) {
    const event = {
      ...newEvent,
      id: Date.now(),
    }
    setEvents(prev => [...prev, event])
  }

  function handleDeleteEvent(id) {
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <h1 className="app-title">Event Timeline</h1>
          <p className="app-subtitle">Create and manage your events dynamically</p>
        </div>
      </header>

      <main className="app-main">
        <EventForm onAddEvent={handleAddEvent} />
        <Timeline events={events} onDeleteEvent={handleDeleteEvent} />
      </main>
    </div>
  )
}

export default App
