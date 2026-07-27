import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })


  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    alert("Le formulaire n'est pas encore connecté à un serveur. Prochaine étape : back-end Node.js + MongoDB.")
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">&lt;footer&gt;</span>
          <h2>Contact</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p>Une opportunité, une question, ou juste envie d'échanger ? Écris-moi.</p>
            <ul className="contact-channels">
              <li>📧 <a href="mailto:contact@anastasiasaid.fr">contact@anastasiasaid.fr</a></li>
              <li>💻 <a href="https://github.com/" target="_blank" rel="noopener noreferrer">github.com/anastasiasaid</a></li>
              <li>🔗 <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">linkedin.com/in/anastasiasaid</a></li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Envoyer</button>
            <p className="form-note">Pas encore branché à un serveur — étape suivante : Node.js + MongoDB.</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
