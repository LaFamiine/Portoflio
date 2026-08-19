import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Admin from './components/Admin.jsx'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)

  if (showAdmin) {
    return (
      <>
        <div className="wrap admin-return">
          <button className="btn btn-ghost" onClick={() => setShowAdmin(false)}>
            ← Retour au site
          </button>
        </div>
        <Admin />
      </>
    )
  }

  return (
    <>
      <div className="admin-bar">
        <a href="#" onClick={(e) => { e.preventDefault(); setShowAdmin(true) }}>
          administration
        </a>
      </div>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Contact />
      <Footer />
    </>
  )
}

export default App