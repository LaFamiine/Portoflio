import { useEffect, useRef, useState } from 'react'

const integration = [
  { label: 'HTML5', level: 85 },
  { label: 'CSS3 / Sass', level: 80 },
  { label: 'Responsive design', level: 75 },
]

const tools = [
  { label: 'JavaScript', level: 60 },
  { label: 'Git / GitHub', level: 65 },
  { label: 'Accessibilité', level: 55 },
]

// Petit composant réutilisable pour une seule barre de compétence.
// "visible" lui dit si la section est apparue à l'écran ou non.
function SkillBar({ label, level, visible }) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-label">
        <span>{label}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: visible ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
  )
}

function Skills() {
  // useRef garde une référence directe vers l'élément <section> dans le DOM
  const sectionRef = useRef(null)
  // useState garde en mémoire si la section est visible à l'écran ou non
  const [visible, setVisible] = useState(false)

  // useEffect s'exécute une fois que le composant est affiché à l'écran.
  // On y met en place un IntersectionObserver : il "regarde" la section
  // et nous prévient dès qu'elle apparaît dans la fenêtre du navigateur.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // on n'a plus besoin d'observer une fois l'animation lancée
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Nettoyage : on arrête d'observer si le composant disparaît
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">&lt;section id="skills"&gt;</span>
          <h2>Compétences</h2>
          <p>Ajuste le niveau ("level") de chaque compétence dans ce fichier selon ton propre niveau.</p>
        </div>
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
      </div>
    </section>
  )
}

export default Skills
