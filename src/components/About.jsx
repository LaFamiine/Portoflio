function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="section-head">
          <h2>À propos</h2>
        </div>
        <div className="about-grid">
          <div>
            <p>
              Je m'appelle <strong>Anastasia Said</strong> et je me forme actuellement au métier
              d'<strong>intégratrice web</strong> avec OpenClassrooms. J'apprends à transformer des
              maquettes en pages web solides : structure HTML5 sémantique, mise en page CSS
              (Flexbox, Grid), interactivité JavaScript, et bonnes pratiques d'accessibilité et de
              responsive design.
            </p>
            <p>
              Ce portfolio a été reconstruit avec <strong>React</strong> : chaque section est un
              composant indépendant, ce qui rend le code plus facile à faire évoluer.
            </p>
          </div>
          <ul className="info-list">
            <li><span>Formation</span><span>Intégrateur Web — OpenClassrooms</span></li>
            <li><span>Front-end</span><span>React (Vite) · HTML5 · CSS3</span></li>
            <li><span>Back-end (à venir)</span><span>Node.js · Express</span></li>
            <li><span>Base de données (à venir)</span><span>MongoDB</span></li>
            <li><span>Versioning</span><span>Git · GitHub</span></li>
            <li><span>Basée à</span><span>France</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
