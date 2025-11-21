import { useState, useEffect, useRef } from 'react'
import './AnimatedCounter.css'

function AnimatedCounter({ value, color, isUpdating }) {
  const [displayValue, setDisplayValue] = useState(value)
  const prevValueRef = useRef(value)

  useEffect(() => {
    // Animate from previous value to new value
    const prev = prevValueRef.current
    const target = value
    const diff = target - prev
    
    if (diff === 0) return

    const duration = 800 // ms
    const steps = 30
    const stepDuration = duration / steps
    const increment = diff / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setDisplayValue(target)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(prev + (increment * currentStep)))
      }
    }, stepDuration)

    prevValueRef.current = target

    return () => clearInterval(interval)
  }, [value])

  // Format number with commas
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B'
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M'
    } else if (num >= 1000) {
      return num.toLocaleString()
    }
    return num.toString()
  }

  return (
    <div className={`animated-counter ${isUpdating ? 'updating' : ''}`}>
      <div 
        className="counter-value" 
        style={{ color: color }}
      >
        {formatNumber(displayValue)}
      </div>
      {isUpdating && (
        <div className="update-flash" style={{ background: color }}></div>
      )}
    </div>
  )
}

export default AnimatedCounter

