import { useEffect, useState } from 'react'

const API_URL = 'https://portofolio-back.vercel.app/api/projects'

const emptyForm = {
  title: '',
  tag: '',
  description: '',
  stack: '',
  liveUrl: '',
  codeUrl: '',
}

function Admin({ token }) {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  const fetchProjects = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Erreur de chargement :', error))
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Met à jour le formulaire à chaque frappe, quel que soit le champ
  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      tag: project.tag,
      description: project.description,
      stack: project.stack.join(', '),
      liveUrl: project.liveUrl || '',
      codeUrl: project.codeUrl || '',
    })
    setEditingId(project._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm('Supprimer ce projet définitivement ?')
    if (!confirmed) return

    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'x-token': token },
    })
      .then(() => {
        setStatus('Projet supprimé.')
        fetchProjects()
      })
      .catch((error) => {
        console.error(error)
        setStatus('Erreur lors de la suppression.')
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = {
      ...form,
      stack: form.stack.split(',').map((item) => item.trim()).filter(Boolean),
    }

    const url = editingId ? `${API_URL}/${editingId}` : API_URL
    const method = editingId ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("L'enregistrement a échoué — session expirée ?")
        return res.json()
      })
      .then(() => {
        setStatus(editingId ? 'Projet modifié.' : 'Projet ajouté.')
        setForm(emptyForm)
        setEditingId(null)
        fetchProjects()
      })
      .catch((error) => {
        console.error(error)
        setStatus(error.message)
      })
  }

  return (
    <section id="admin">
      <div className="wrap">
        <div className="section-head">
          <h2>Administration des projets</h2>
          <p>Ajoute, modifie ou supprime tes projets sans passer par Thunder Client.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} style={{ maxWidth: '600px', marginBottom: '48px' }}>
          <div>
            <label htmlFor="title">Titre</label>
            <input type="text" id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="tag">Étiquette (ex: PROJET 01)</label>
            <input type="text" id="tag" name="tag" value={form.tag} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} required></textarea>
          </div>
          <div>
            <label htmlFor="stack">Technologies (séparées par des virgules)</label>
            <input type="text" id="stack" name="stack" value={form.stack} onChange={handleChange} placeholder="HTML5, CSS3, JavaScript" />
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
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Enregistrer les modifications' : 'Ajouter le projet'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-ghost" onClick={handleCancelEdit}>
                Annuler
              </button>
            )}
          </div>

          {status && <p className="form-note">{status}</p>}
        </form>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project._id}>
              <span className="ptag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="stack-row">
                {project.stack.map((tech) => (
                  <span className="chip" key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(project) }}>
                  Modifier
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(project._id) }} style={{ color: '#c2467c' }}>
                  Supprimer
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Admin