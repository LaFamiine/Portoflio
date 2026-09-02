import { useEffect, useState } from 'react'

const API_URL = 'https://portofolio-back.vercel.app/api/projects'
const emptyForm = { title: '', tag: '', description: '', stack: '', liveUrl: '', codeUrl: '', image: '' }

function Projects({ content, editMode, token, onContentUpdate }) {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  const [editingBg, setEditingBg] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const fetchProjects = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Erreur de chargement des projets :', error))
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      tag: project.tag,
      description: project.description,
      stack: project.stack.join(', '),
      liveUrl: project.liveUrl || '',
      codeUrl: project.codeUrl || '',
      image: project.image || '', 
    })
    setEditingId(project._id)
    setShowForm(true)
    setStatus('')
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Supprimer ce projet définitivement ?')) return
    fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: { 'x-token': token } })
      .then(() => { setStatus('Projet supprimé.'); fetchProjects() })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { 
      ...form, 
      stack: form.stack.split(',').map((s) => s.trim()).filter(Boolean) 
    }
    const url = editingId ? `${API_URL}/${editingId}` : API_URL
    const method = editingId ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-token': token },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        setStatus(editingId ? 'Projet modifié.' : 'Projet ajouté.')
        setForm(emptyForm)
        setEditingId(null)
        setShowForm(false)
        fetchProjects()
      })
  }

  const handleProjectImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setForm({ ...form, image: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadStatus('Chargement...')
    const reader = new FileReader()
    reader.onload = () => {
      fetch('https://portofolio-back.vercel.app/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-token': token },
        body: JSON.stringify({ backgroundImageUrl: reader.result }),
      })
        .then((res) => res.json())
        .then((updated) => {
          onContentUpdate(updated)
          setEditingBg(false)
          setUploadStatus('')
        })
        .catch(() => setUploadStatus("Erreur lors de l'enregistrement."))
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveBg = () => {
    fetch('https://portofolio-back.vercel.app/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-token': token },
      body: JSON.stringify({ backgroundImageUrl: '' }),
    })
      .then((res) => res.json())
      .then((updated) => {
        onContentUpdate(updated)
        setEditingBg(false)
      })
  }

  const sectionStyle = content?.backgroundImageUrl
    ? {
        backgroundImage: `url(${content.backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}

  return (
    <section id="projects" className="admin-section" style={sectionStyle}>
      {editMode && (
  <div className="admin-btn-row">
    <button className="edit-btn" onClick={() => setEditingBg(!editingBg)}>
      {editingBg ? 'Fermer' : 'Image de fond'}
    </button>
    <button className="edit-btn" onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm) }}>
      {showForm ? 'Fermer' : '+ Ajouter un projet'}
    </button>
  </div>
)}

      <div className="wrap">
        <div className="section-head">
          <h2>Projets</h2>
        </div>

        {editMode && editingBg && (
  <div className="contact-form edit-form bg-form">
    <div>
      <label htmlFor="bgUrl">URL de l'image de fond</label>
      <input
        type="text"
        id="bgUrl"
        value={bgUrlInput}
        onChange={(e) => setBgUrlInput(e.target.value)}
        placeholder="https://exemple.com/mon-image.jpg"
      />
    </div>
    <div className="btn-row">
      <button type="button" className="btn btn-primary" onClick={handleSaveBgUrl}>
        Enregistrer
      </button>
      <button type="button" className="btn btn-ghost" onClick={handleRemoveBg}>
        Retirer l'image
      </button>
    </div>
    {uploadStatus && <p className="form-note">{uploadStatus}</p>}
  </div>
)}

        {editMode && showForm && (
          <form className="contact-form edit-form" onSubmit={handleSubmit} style={{ maxWidth: '600px', marginBottom: '32px' }}>
            <div>
              <label htmlFor="title">Titre</label>
              <input type="text" id="title" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="tag">Étiquette</label>
              <input type="text" id="tag" name="tag" value={form.tag} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} required></textarea>
            </div>
            
            {/* --- NOUVEAU : Champ pour l'image du projet --- */}
            <div>
              <label htmlFor="projectImage">Image du projet (optionnel)</label>
              <input type="file" id="projectImage" accept="image/*" onChange={handleProjectImageSelect} />
              {form.image && <p className="form-note" style={{color: '#B12562E6'}}> Image prête à être enregistrée</p>}
            </div>

            <div>
              <label htmlFor="stack">Technologies (séparées par virgules)</label>
              <input type="text" id="stack" name="stack" value={form.stack} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="liveUrl">Lien "Voir le site"</label>
              <input type="text" id="liveUrl" name="liveUrl" value={form.liveUrl} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="codeUrl">Lien "Code source"</label>
              <input type="text" id="codeUrl" name="codeUrl" value={form.codeUrl} onChange={handleChange} />
            </div>
            <div className="btn-row">
              <button type="submit" className="btn btn-primary">{editingId ? 'Enregistrer' : 'Ajouter'}</button>
              <button type="button" className="btn btn-ghost" onClick={handleCancel}>Annuler</button>
            </div>
            {status && <p className="form-note">{status}</p>}
          </form>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project._id}>
              
              {project.image && (
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
              )}

              <span className="ptag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="stack-row">
                {project.stack.map((tech) => (
                  <span className="chip" key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Voir le site</a>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">Code source</a>
              </div>
              {editMode && (
                <div className="project-links" style={{ marginTop: '10px' }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(project) }}>Modifier</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(project._id) }} style={{ color: '#c2467c' }}>Supprimer</a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects