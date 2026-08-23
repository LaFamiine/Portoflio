import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [editMode, setEditMode] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [content, setContent] = useState(null)

  const fetchContent = () => {
    fetch('http://localhost:5000/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((error) => console.error('Erreur de chargement du contenu :', error))
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setEditMode(false)
  }

  const handleAdminClick = () => {
    if (token) {
      setEditMode(!editMode)
    } else {
      setShowLogin(true)
    }
  }

  if (showLogin) {
    return (
      <Login
        onLoginSuccess={(t) => {
          setToken(t)
          setShowLogin(false)
          setEditMode(true)
        }}
      />
    )
  }

  return (
    <>
      <div className="admin-bar">
        <a href="#" onClick={(e) => { e.preventDefault(); handleAdminClick() }}>
          {token ? (editMode ? 'quitter le mode édition' : 'mode édition') : 'administration'}
        </a>
        {token && (
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout() }}>
            se déconnecter
          </a>
        )}
      </div>
      <Header />
      <main id="top">
        <Hero content={content} editMode={editMode} token={token} onContentUpdate={setContent} />
        <About content={content} editMode={editMode} token={token} onContentUpdate={setContent} />
        <Projects editMode={editMode} token={token} />
        <Skills content={content} editMode={editMode} token={token} onContentUpdate={setContent} />
      </main>
      <Contact content={content} editMode={editMode} token={token} onContentUpdate={setContent} />
      <Footer />
    </>
  )
}

export default App