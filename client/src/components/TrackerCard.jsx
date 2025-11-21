import { useState, useEffect, useRef } from 'react'
import './TrackerCard.css'
import AnimatedCounter from './AnimatedCounter'

function TrackerCard({ tracker }) {
  const [currentValue, setCurrentValue] = useState(tracker.currentValue)
  const [isUpdating, setIsUpdating] = useState(false)
  const intervalRef = useRef(null)

  // Calculate the increment for smooth updates
  const calculateIncrement = () => {
    if (tracker.perSecond) {
      // For accumulating trackers, add based on time
      return tracker.perSecond * ((tracker.updateInterval || 2000) / 1000)
    } else if (tracker.variance) {
      // For variance-based trackers, random small changes
      const changePercent = tracker.variance * 0.1 // 10% of variance per update
      return currentValue * changePercent * (Math.random() - 0.5) * 2
    }
    return 0
  }

  // Update value periodically
  useEffect(() => {
    const updateInterval = tracker.updateInterval || 3000

    intervalRef.current = setInterval(() => {
      setIsUpdating(true)
      const increment = calculateIncrement()
      
      setCurrentValue(prev => {
        let newValue = prev + increment
        
        // Keep within reasonable bounds
        if (tracker.baseValue > 0) {
          const minValue = tracker.baseValue * 0.5
          const maxValue = tracker.baseValue * 2
          newValue = Math.max(minValue, Math.min(maxValue, newValue))
        }
        
        return Math.floor(newValue)
      })

      setTimeout(() => setIsUpdating(false), 500)
    }, updateInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [tracker, currentValue])

  // Format large numbers
  const formatNumber = (num) => {
    return num.toLocaleString()
  }

  return (
    <div className="tracker-card" style={{ borderColor: tracker.color + '40' }}>
      <div className="tracker-header">
        <div className="tracker-icon" style={{ background: tracker.color + '20' }}>
          {tracker.icon}
        </div>
        <span 
          className="tracker-category"
          style={{ 
            backgroundColor: tracker.color + '20', 
            color: tracker.color 
          }}
        >
          {tracker.category}
        </span>
      </div>
      
      <h3 className="tracker-title">{tracker.title}</h3>
      <p className="tracker-description">{tracker.description}</p>
      
      <div className="tracker-value-container">
        <AnimatedCounter 
          value={currentValue} 
          color={tracker.color}
          isUpdating={isUpdating}
        />
      </div>
      
      <div className="tracker-footer">
        <div className="update-status">
          <span className={`status-dot ${isUpdating ? 'updating' : ''}`}></span>
          <span className="status-text">
            {tracker.resetDaily ? 'Resets daily' : 'Live estimate'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TrackerCard

