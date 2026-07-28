function Hero() {
  return (
    <section className="hero" style={{ borderTop: 'none' }}>
      <div className="wrap hero-grid">
        <div>
          <h1>
            Anastasia Said,<br />
            <span className="accent">intégratrice web.</span>
          </h1>
          <p className="lead">
            En formation Intégratrice Web chez OpenClassrooms. J'assemble des maquettes en
            interfaces propres, responsives et accessibles — du HTML sémantique au dernier pixel du CSS.
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
            {'  '}<span className="tag">&lt;p&gt;</span>OpenClassrooms — 2026<span className="tag">&lt;/p&gt;</span>{'\n'}
            <span className="tag">&lt;/section&gt;</span><span className="cursor"></span>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default Hero
