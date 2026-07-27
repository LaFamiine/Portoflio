import React from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'


function App() {
  return (
    <>
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
