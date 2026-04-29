import { useState } from 'react'
import {
  validateTitle,
  validateDescription,
  validateDate,
  validateCategory,
  validateEmail,
  validateBitsId,
} from '../utils/validators'

function EventForm({ onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    email: '',
    bitsId: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    email: '',
    bitsId: '',
  })

  const [suggestion, setSuggestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function fetchSuggestion() {
    setLoading(true)
    setApiError('')
    setSuggestion(null)
    try {
      const response = await fetch('https://bored-api.appbrewery.com/random')
      if (!response.ok) throw new Error('Request failed')
      const data = await response.json()
      setSuggestion(data)
    } catch (err) {
      setApiError('Failed to fetch suggestion. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {
      title: validateTitle(formData.title),
      description: validateDescription(formData.description),
      date: validateDate(formData.date),
      category: validateCategory(formData.category),
      email: validateEmail(formData.email),
      bitsId: validateBitsId(formData.bitsId),
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(err => err !== '')
    if (hasErrors) return

    onAddEvent({
      ...formData,
      activity: suggestion ? suggestion.activity : null,
    })

    setFormData({
      title: '',
      description: '',
      date: '',
      category: '',
      email: '',
      bitsId: '',
    })
    setErrors({
      title: '',
      description: '',
      date: '',
      category: '',
      email: '',
      bitsId: '',
    })
    setSuggestion(null)
  }

  return (
    <div className="form-container">
      <h2 className="form-heading">Add New Event</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            id="title"
            className={`form-input ${errors.title ? 'input-error' : ''}`}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description (min 10 characters)"
            rows={3}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="date">Date</label>
          <input
            id="date"
            className={`form-input ${errors.date ? 'input-error' : ''}`}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error-msg">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category">Category</label>
          <input
            id="category"
            className={`form-input ${errors.category ? 'input-error' : ''}`}
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Workshop, Seminar"
          />
          {errors.category && <span className="error-msg">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">BITS Email</label>
          <input
            id="email"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="f20230123@pilani.bits-pilani.ac.in"
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="bitsId">BITS ID</label>
          <input
            id="bitsId"
            className={`form-input ${errors.bitsId ? 'input-error' : ''}`}
            type="text"
            name="bitsId"
            value={formData.bitsId}
            onChange={handleChange}
            placeholder="e.g. 2023A1PS0123P"
          />
          {errors.bitsId && <span className="error-msg">{errors.bitsId}</span>}
        </div>

        <div className="suggestion-section">
          <button type="button" className="suggestion-btn" onClick={fetchSuggestion} disabled={loading}>
            {loading ? 'Fetching...' : '✦ Get Activity Suggestion'}
          </button>

          {apiError && <span className="error-msg">{apiError}</span>}

          {suggestion && (
            <div className="suggestion-box">
              <p className="suggestion-activity">{suggestion.activity}</p>
              <p className="suggestion-meta">Type: {suggestion.type} · Participants: {suggestion.participants}</p>
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Add to Timeline</button>
      </form>
    </div>
  )
}

export default EventForm
