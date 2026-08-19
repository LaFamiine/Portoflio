import { useEffect, useState } from 'react'

function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Erreur de chargement des projets :', error))
  }, [])

  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">&lt;section id="projects"&gt;</span>
          <h2>Projets</h2>
        </div>
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
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Voir le site</a>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">Code source</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects