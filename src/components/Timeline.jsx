import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import EventCard from './EventCard'

function Timeline({ events, onDeleteEvent }) {
  const timelineRef = useRef(null)
  const prevLengthRef = useRef(0)
  const prevIdsRef = useRef([])
  const isFirstRender = useRef(true)

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))

  useEffect(() => {
    if (!timelineRef.current) return

    const cards = timelineRef.current.querySelectorAll('.event-card')
    const currentLength = sortedEvents.length

    if (isFirstRender.current && currentLength > 0) {
      isFirstRender.current = false
      gsap.fromTo(
        cards,
        { opacity: 0, x: -55 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.13, ease: 'power3.out' }
      )
      prevLengthRef.current = currentLength
      prevIdsRef.current = sortedEvents.map(e => e.id)
      return
    }

    if (currentLength > prevLengthRef.current) {
      const prevIds = prevIdsRef.current
      const addedIndex = sortedEvents.findIndex(e => !prevIds.includes(e.id))

      if (addedIndex !== -1) {
        const newCard = cards[addedIndex]
        gsap.fromTo(
          newCard,
          { opacity: 0, scale: 0.88, y: -24 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
        )

        const cardsBelow = Array.from(cards).slice(addedIndex + 1)
        if (cardsBelow.length > 0) {
          gsap.fromTo(
            cardsBelow,
            { y: -18 },
            { y: 0, duration: 0.38, ease: 'power2.out' }
          )
        }
      }
    }

    prevLengthRef.current = currentLength
    prevIdsRef.current = sortedEvents.map(e => e.id)
  }, [sortedEvents])

  if (sortedEvents.length === 0) {
    return (
      <div className="timeline-container">
        <h2 className="timeline-heading">Timeline</h2>
        <div className="timeline-empty">
          <p>No events yet.</p>
          <p>Add your first event using the form.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="timeline-container">
      <h2 className="timeline-heading">
        Timeline <span className="event-count">{sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''}</span>
      </h2>
      <div className="timeline" ref={timelineRef}>
        {sortedEvents.map((event, index) => (
          <div className="timeline-item" key={event.id}>
            <div className="timeline-dot" />
            <EventCard
              event={event}
              onDelete={onDeleteEvent}
              skipEntryAnim={true}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
