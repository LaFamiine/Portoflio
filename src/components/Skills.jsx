import { useEffect, useRef, useState } from 'react'

function parseSkills(text) {
  if (!text) return []
  return text.split(',').map((item) => {
    const [label, level] = item.split(':')
    return { label: label?.trim(), level: Number(level) || 0 }
  }).filter((s) => s.label)
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

function Skills({ content, editMode, token, onContentUpdate }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    skillsIntegration: content?.skillsIntegration || '',
    skillsTools: content?.skillsTools || '',
  })

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
      body: JSON.stringify(form),
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
          <span className="eyebrow">&lt;section id="skills"&gt;</span>
          <h2>Compétences</h2>
        </div>

        {editing ? (
          <form className="contact-form edit-form" onSubmit={handleSave}>
            <div>
              <label htmlFor="skillsIntegration">Intégration (Label:niveau, séparées par virgules)</label>
              <input type="text" id="skillsIntegration" value={form.skillsIntegration} onChange={(e) => setForm({ ...form, skillsIntegration: e.target.value })} />
            </div>
            <div>
              <label htmlFor="skillsTools">Script & outils</label>
              <input type="text" id="skillsTools" value={form.skillsTools} onChange={(e) => setForm({ ...form, skillsTools: e.target.value })} />
            </div>
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