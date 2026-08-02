import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'TON_SERVICE_ID'
const TEMPLATE_ID = 'TON_TEMPLATE_ID'
const PUBLIC_KEY = 'TA_PUBLIC_KEY'

function Contact() {
  const formRef = useRef(null)

  const [status, setStatus] = useState('idle')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('sending')

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success')
        formRef.current.reset() 
      })
      .catch((error) => {
        console.error("Erreur d'envoi EmailJS :", error)
        setStatus('error')
      })
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="section-head">
          <h2>Contact</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p>Une opportunité, une question, ou juste envie d'échanger ? Écris-moi.</p>
            <ul className="contact-channels">
              <li>📧 <a href="mailto:anastasiasaidfara@gmail.com">anastasiasaidfara@gmail.com</a></li>
              <li>💻 <a href="https://github.com/LaFamiine" target="_blank" rel="noopener noreferrer">https://github.com/LaFamiine</a></li>
            </ul>
          </div>

          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
            </button>

            {status === 'success' && (
              <p className="form-note">✅ Message envoyé, merci ! Je te réponds au plus vite.</p>
            )}
            {status === 'error' && (
              <p className="form-note">❌ L'envoi a échoué. Vérifie tes identifiants EmailJS ou réessaie plus tard.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact