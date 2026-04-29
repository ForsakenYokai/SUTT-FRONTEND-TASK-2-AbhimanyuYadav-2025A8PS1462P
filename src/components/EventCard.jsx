import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function EventCard({ event, onDelete, skipEntryAnim }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (skipEntryAnim) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.88, y: -24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
    )
  }, [])

  function handleDelete() {
    gsap.to(cardRef.current, {
      opacity: 0,
      x: 80,
      scaleX: 0.85,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => onDelete(event.id),
    })
  }

  return (
    <div className="event-card" ref={cardRef}>
      <div className="event-card-header">
        <div className="event-card-title-row">
          <h3 className="event-card-title">{event.title}</h3>
          <span className="event-card-category">{event.category}</span>
        </div>
        <button className="delete-btn" onClick={handleDelete}>✕</button>
      </div>

      <p className="event-card-description">{event.description}</p>

      <div className="event-card-meta">
        <span className="meta-item">
          <span className="meta-icon">📅</span>
          {event.date}
        </span>
        <span className="meta-item">
          <span className="meta-icon">✉</span>
          {event.email}
        </span>
        <span className="meta-item">
          <span className="meta-icon">🪪</span>
          {event.bitsId}
        </span>
      </div>

      {event.activity && (
        <div className="event-card-activity">
          <span className="activity-label">💡 Suggested Activity</span>
          <span className="activity-text">{event.activity}</span>
        </div>
      )}
    </div>
  )
}

export default EventCard
