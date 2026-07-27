const projects = [
  {
    id: 1,
    tag: 'PROJET 01 — À REMPLACER',
    title: 'Nom du projet',
    description: "Décris ici le contexte du projet, l'objectif, et ce que tu as réalisé concrètement.",
    stack: ['HTML5', 'CSS3', 'JS'],
  },
  {
    id: 2,
    tag: 'PROJET 02 — À REMPLACER',
    title: 'Nom du projet',
    description: "Décris ici le contexte du projet, l'objectif, et ce que tu as réalisé concrètement.",
    stack: ['Sass', 'Bootstrap'],
  },
  {
    id: 3,
    tag: 'PROJET 03 — À REMPLACER',
    title: 'Nom du projet',
    description: "Décris ici le contexte du projet, l'objectif, et ce que tu as réalisé concrètement.",
    stack: ['JavaScript', 'API'],
  },
]

function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">&lt;section id="projects"&gt;</span>
          <h2>Projets</h2>
          <p>Trois emplacements prêts à recevoir tes vrais projets — modifie le tableau "projects" en haut de ce fichier.</p>
        </div>

        <div className="projects-grid">
          {/* .map() parcourt le tableau "projects" et crée une <article> pour chaque élément.
              "key" est obligatoire en React : ça l'aide à savoir quelle carte correspond à quelle donnée. */}
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <span className="ptag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="stack-row">
                {project.stack.map((tech) => (
                  <span className="chip" key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#">Voir le site</a>
                <a href="#">Code source</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
