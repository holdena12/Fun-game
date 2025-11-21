import './FilterBar.css'

function FilterBar({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default FilterBar

