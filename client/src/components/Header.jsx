import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌐</span>
            <h1 className="logo-text">Live World Tracker</h1>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link active">Live Stats</a>
            <a href="#" className="nav-link">About</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

