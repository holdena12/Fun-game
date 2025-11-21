import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import TrackerCard from './components/TrackerCard'
import FilterBar from './components/FilterBar'
import SuggestTracker from './components/SuggestTracker'

function App() {
  const [trackers, setTrackers] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  // Fetch trackers
  const fetchTrackers = async (category = 'all') => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trackers?category=${category}`)
      const data = await response.json()
      setTrackers(data)
    } catch (error) {
      console.error('Error fetching trackers:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    fetchTrackers(category)
  }

  // Handle tracker suggested
  const handleTrackerSuggested = () => {
    fetchTrackers(selectedCategory)
    fetchCategories()
  }

  useEffect(() => {
    fetchTrackers()
    fetchCategories()
  }, [])

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="intro-section">
            <h2 className="intro-title">
              Live World Activity Tracker
            </h2>
            <p className="intro-description">
              Real-time estimates of what's happening around the world right now. 
              Watch the numbers update as millions of people type, scroll, eat, and live their lives.
            </p>
            <div className="update-indicator">
              <span className="pulse-dot"></span>
              <span>Live updating</span>
            </div>
          </div>

          <div className="action-bar">
            <FilterBar 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <SuggestTracker onTrackerSuggested={handleTrackerSuggested} />

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading trackers...</p>
            </div>
          ) : (
            <div className="trackers-grid">
              {trackers.map(tracker => (
                <TrackerCard 
                  key={tracker.id}
                  tracker={tracker}
                />
              ))}
            </div>
          )}

          {!loading && trackers.length === 0 && (
            <div className="empty-state">
              <p>No trackers found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
