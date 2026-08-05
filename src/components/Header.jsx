import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="nav-inner">
        <a href="#top" className="logo-mark">
  <span className="logo-circle">
    <span className="logo-a">A</span>
    <span className="logo-s">S</span>
  </span>
</a>

        <button
          className="nav-toggle"
          aria-label="Ouvrir le menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#about" onClick={() => setMenuOpen(false)}>À propos</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projets</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Compétences</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
