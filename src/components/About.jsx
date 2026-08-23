import { useState } from 'react'

function About({ content, editMode, token, onContentUpdate }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(content?.aboutText || '')

  const handleSave = (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-token': token },
      body: JSON.stringify({ aboutText: text }),
    })
      .then((res) => res.json())
      .then((updated) => {
        onContentUpdate(updated)
        setEditing(false)
      })
  }

  return (
    <section id="about" className="admin-section">
      {editMode && (
        <button className="edit-btn" onClick={() => setEditing(!editing)}>
          {editing ? 'Fermer' : 'Modifier'}
        </button>
      )}
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">&lt;section id="about"&gt;</span>
          <h2>À propos</h2>
        </div>

        {editing ? (
          <form className="contact-form edit-form" onSubmit={handleSave}>
            <div>
              <label htmlFor="aboutText">Texte "À propos"</label>
              <textarea id="aboutText" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
          </form>
        ) : (
          <div className="about-grid">
            <div>
              <p>{content?.aboutText || "Je m'appelle Anastasia Said et je me forme actuellement au métier d'intégratrice web avec OpenClassrooms."}</p>
            </div>
            <ul className="info-list">
              <li><span>Formation</span><span>Intégrateur Web — OpenClassrooms</span></li>
              <li><span>Front-end</span><span>React (Vite) · HTML5 · CSS3</span></li>
              <li><span>Back-end</span><span>Node.js · Express</span></li>
              <li><span>Base de données</span><span>MongoDB</span></li>
              <li><span>Versioning</span><span>Git · GitHub</span></li>
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default About