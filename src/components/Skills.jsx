import { useEffect, useRef, useState } from 'react'

// Transforme "HTML5:85, CSS3:80" en [{label:"HTML5", level:85}, ...]
function parseSkills(text) {
  if (!text) return []
  return text.split(',').map((item) => {
    const [label, level] = item.split(':')
    return { label: (label || '').trim(), level: Number(level) || 0 }
  }).filter((s) => s.label)
}

// Transforme [{label:"HTML5", level:85}, ...] en "HTML5:85, CSS3:80"
function stringifySkills(list) {
  return list
    .filter((s) => s.label.trim() !== '')
    .map((s) => `${s.label.trim()}:${s.level}`)
    .join(', ')
}

function SkillBar({ label, level, visible }) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-label">
        <span>{label}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: visible ? `${level}%` : '0%' }}></div>
      </div>
    </div>
  )
}

// Un petit formulaire réutilisable pour un groupe de compétences
// (une ligne par compétence : nom + pourcentage + bouton supprimer)
function SkillGroupEditor({ title, skills, onChange }) {
  const updateSkill = (index, field, value) => {
    const updated = [...skills]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addSkill = () => {
    onChange([...skills, { label: '', level: 50 }])
  }

  const removeSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index))
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={{ display: 'block', marginBottom: '10px' }}>{title}</label>

      {skills.map((skill, index) => (
        <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Nom de la compétence"
            value={skill.label}
            onChange={(e) => updateSkill(index, 'label', e.target.value)}
            style={{ flex: 2 }}
          />
          <input
            type="number"
            min="0"
            max="100"
            placeholder="%"
            value={skill.level}
            onChange={(e) => updateSkill(index, 'level', Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <button type="button" className="btn btn-ghost" onClick={() => removeSkill(index)}>
            ✕
          </button>
        </div>
      ))}

      <button type="button" className="btn btn-ghost" onClick={addSkill}>
        + Ajouter une compétence
      </button>
    </div>
  )
}

function Skills({ content, editMode, token, onContentUpdate }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [editing, setEditing] = useState(false)

  const [integrationSkills, setIntegrationSkills] = useState([])
  const [toolsSkills, setToolsSkills] = useState([])

  // Quand on ouvre l'édition, on repart des données actuelles du site
  useEffect(() => {
    if (editing) {
      setIntegrationSkills(parseSkills(content?.skillsIntegration))
      setToolsSkills(parseSkills(content?.skillsTools))
    }
  }, [editing, content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-token': token },
      body: JSON.stringify({
        skillsIntegration: stringifySkills(integrationSkills),
        skillsTools: stringifySkills(toolsSkills),
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        onContentUpdate(updated)
        setEditing(false)
      })
  }

  const integration = parseSkills(content?.skillsIntegration || 'HTML5:85, CSS3:80, Responsive design:75')
  const tools = parseSkills(content?.skillsTools || 'JavaScript:60, Git:65, Accessibilité:55')

  return (
    <section id="skills" ref={sectionRef} className="admin-section">
      {editMode && (
        <button className="edit-btn" onClick={() => setEditing(!editing)}>
          {editing ? 'Fermer' : 'Modifier'}
        </button>
      )}
      <div className="wrap">
        <div className="section-head">
          <h2>Compétences</h2>
        </div>

        {editing ? (
          <form className="contact-form edit-form" onSubmit={handleSave} style={{ maxWidth: '600px' }}>
            <SkillGroupEditor
              title="Intégration"
              skills={integrationSkills}
              onChange={setIntegrationSkills}
            />
            <SkillGroupEditor
              title="Script & outils"
              skills={toolsSkills}
              onChange={setToolsSkills}
            />
            <button type="submit" className="btn btn-primary">Enregistrer</button>
          </form>
        ) : (
          <div className="skills-groups">
            <div className="skill-group">
              <h3>INTÉGRATION</h3>
              {integration.map((skill) => (
                <SkillBar key={skill.label} {...skill} visible={visible} />
              ))}
            </div>
            <div className="skill-group">
              <h3>SCRIPT & OUTILS</h3>
              {tools.map((skill) => (
                <SkillBar key={skill.label} {...skill} visible={visible} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills