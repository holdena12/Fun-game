import { useState } from 'react'
import './SuggestTracker.css'

function SuggestTracker({ onTrackerSuggested }) {
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!suggestion.trim()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/trackers/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ suggestion: suggestion.trim() })
      })

      if (response.ok) {
        setSuggestion('')
        setShowSuccess(true)
        onTrackerSuggested()
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add suggestion. Make sure Ollama is running!')
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error)
      alert('Error submitting suggestion. Make sure the server is running!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="suggest-tracker">
      <div className="suggest-header">
        <h3>💡 Suggest a Tracker</h3>
        <p>Think we're missing something? Tell us what you'd like to see!</p>
      </div>
      
      <form onSubmit={handleSubmit} className="suggest-form">
        <input
          type="text"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="e.g., number of people watching Netflix right now"
          className="suggest-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="btn btn-primary suggest-btn"
          disabled={loading || !suggestion.trim()}
        >
          {loading ? 'Adding...' : 'Suggest'}
        </button>
      </form>

      {showSuccess && (
        <div className="success-message">
          ✓ Thanks! Your tracker has been added!
        </div>
      )}
    </div>
  )
}

export default SuggestTracker

