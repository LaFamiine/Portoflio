import { useEffect, useState } from 'react'

// Transforme "Formation:Intégrateur Web, Front-end:React" en [{label, value}, ...]
function parseInfo(text) {
  if (!text) return []
  return text.split(',').map((item) => {
    const [label, ...rest] = item.split(':')
    return { label: (label || '').trim(), value: rest.join(':').trim() }
  }).filter((s) => s.label)
}

// Transforme [{label, value}, ...] en "Formation:Intégrateur Web, Front-end:React"
function stringifyInfo(list) {
  return list
    .filter((s) => s.label.trim() !== '')
    .map((s) => `${s.label.trim()}:${s.value.trim()}`)
    .join(', ')
}

// Un formulaire réutilisable : une ligne par info (label + valeur + bouton supprimer)
function InfoListEditor({ items, onChange }) {
  const updateItem = (index, field, value) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addItem = () => {
    onChange([...items, { label: '', value: '' }])
  }

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={{ display: 'block', marginBottom: '10px' }}>Informations</label>

      {items.map((item, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Titre (ex: Formation)"
            value={item.label}
            onChange={(e) => updateItem(index, 'label', e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            type="text"
            placeholder="Valeur (ex: Intégrateur Web)"
            value={item.value}
            onChange={(e) => updateItem(index, 'value', e.target.value)}
            style={{ flex: 2 }}
          />
          <button type="button" className="btn btn-ghost" onClick={() => removeItem(index)}>
            ✕
          </button>
        </div>
      ))}

      <button type="button" className="btn btn-ghost" onClick={addItem}>
        + Ajouter une ligne
      </button>
    </div>
  )
}

function About({ content, editMode, token, onContentUpdate }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(content?.aboutText || '')
  const [infoItems, setInfoItems] = useState([])

  useEffect(() => {
    if (editing) {
      setText(content?.aboutText || '')
      setInfoItems(parseInfo(content?.aboutInfo))
    }
  }, [editing, content])

  const handleSave = (e) => {
    e.preventDefault()
    fetch('https://portofolio-back.vercel.app/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-token': token },
      body: JSON.stringify({
        aboutText: text,
        aboutInfo: stringifyInfo(infoItems),
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        onContentUpdate(updated)
        setEditing(false)
      })
  }

  const infoList = parseInfo(
    content?.aboutInfo ||
    'Formation:Intégrateur Web — OpenClassrooms, Front-end:React (Vite) · HTML5 · CSS3, Back-end:Node.js · Express, Base de données:MongoDB, Versioning:Git · GitHub'
  )

  return (
    <section id="about" className="admin-section">
      {editMode && (
        <button className="edit-btn" onClick={() => setEditing(!editing)}>
          {editing ? 'Fermer' : 'Modifier'}
        </button>
      )}
      <div className="wrap">
        <div className="section-head">

          <h2>À propos</h2>
        </div>

        {editing ? (
          <form className="contact-form edit-form" onSubmit={handleSave} style={{ maxWidth: '600px' }}>
            <div>
              <label htmlFor="aboutText">Texte "À propos"</label>
              <textarea id="aboutText" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </div>

            <InfoListEditor items={infoItems} onChange={setInfoItems} />

            <button type="submit" className="btn btn-primary">Enregistrer</button>
          </form>
        ) : (
          <div className="about-grid">
            <div>
              <p>{content?.aboutText || "Je m'appelle Anastasia Said et je me forme actuellement au métier d'intégratrice web avec OpenClassrooms."}</p>
            </div>
            <ul className="info-list">
              {infoList.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default About