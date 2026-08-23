import { useState } from 'react'

function Hero({ content, editMode, token, onContentUpdate }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    heroTitle: content?.heroTitle || '',
    heroSubtitle: content?.heroSubtitle || '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-token': token },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((updated) => {
        onContentUpdate(updated)
        setEditing(false)
      })
  }

  return (
    <section className="hero admin-section" style={{ borderTop: 'none' }}>
      {editMode && (
        <button className="edit-btn" onClick={() => setEditing(!editing)}>
          {editing ? 'Fermer' : 'Modifier'}
        </button>
      )}

      {editing ? (
        <div className="wrap">
          <form className="contact-form edit-form" onSubmit={handleSave}>
            <div>
              <label htmlFor="heroTitle">Titre accroche</label>
              <input type="text" id="heroTitle" name="heroTitle" value={form.heroTitle} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="heroSubtitle">Texte d'accroche</label>
              <textarea id="heroSubtitle" name="heroSubtitle" value={form.heroSubtitle} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
          </form>
        </div>
      ) : (
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">&lt;header&gt;</span>
            <h1>
              Anastasia Said,<br />
              <span className="accent">{content?.heroTitle || 'intégratrice web.'}</span>
            </h1>
            <p className="lead">
              {content?.heroSubtitle || "En formation Intégratrice Web chez OpenClassrooms. J'assemble des maquettes en interfaces propres, responsives et accessibles."}
            </p>
            <div className="btn-row">
              <a href="#projects" className="btn btn-primary">Voir mes projets</a>
              <a href="#contact" className="btn btn-ghost">Me contacter</a>
            </div>
          </div>

          <div className="code-card">
            <div className="code-card-bar">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <pre>
              <span className="tag">&lt;section</span> <span className="attr">class</span>=<span className="str">"profil"</span><span className="tag">&gt;</span>{'\n'}
              {'  '}<span className="tag">&lt;h2&gt;</span>Anastasia Said<span className="tag">&lt;/h2&gt;</span>{'\n'}
              {'  '}<span className="tag">&lt;p&gt;</span>Intégratrice Web<span className="tag">&lt;/p&gt;</span>{'\n'}
              <span className="tag">&lt;/section&gt;</span><span className="cursor"></span>
            </pre>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero