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
          <h2>Contact</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <ul className="contact-channels">
              <li>📧 <a href="mailto:contact@anastasiasaid.fr">anastasiasaidfara@gmail.com</a></li>
              <li>💻 <a href="https://github.com/LaFamiine" target="_blank" rel="noopener noreferrer">https://github.com/LaFamiine</a></li>
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
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
