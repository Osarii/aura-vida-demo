import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { contactInfo } from '../data/contact'

export default function ContactSection() {
  const openPhone = () => window.location.href = 'tel:+50622000000'
  const openMail = () => window.location.href = 'mailto:hola@aurayvida.demo'
  const openWhatsapp = () =>
    window.open('https://wa.me/50670000000?text=Hola%20Aura%20%26%20Vida%20%28demo%29', '_blank', 'noopener,noreferrer')

  return (
    <section className="section section-soft" id="contacto">
      <Reveal className="container contact-layout">
        <div>
          <SectionHeading
            eyebrow="Ubicación y contacto"
            title="Estamos para atenderle"
            description="Los datos de contacto son ficticios y se muestran solo como parte del demo."
            centered={false}
          />

          <div className="contact-list">
            <button onClick={openPhone}>
              <span>☎</span>
              <div><small>Teléfono</small><strong>{contactInfo.phone}</strong></div>
            </button>
            <button onClick={openWhatsapp}>
              <span>✆</span>
              <div><small>WhatsApp</small><strong>{contactInfo.whatsapp}</strong></div>
            </button>
            <button onClick={openMail}>
              <span>✉</span>
              <div><small>Correo</small><strong>{contactInfo.email}</strong></div>
            </button>
            <div className="contact-item">
              <span>◷</span>
              <div><small>Horario</small><strong>{contactInfo.schedule}</strong></div>
            </div>
          </div>
        </div>

        <div className="map-card" aria-label="Mapa visual simulado">
          <div className="map-grid" />
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-pin">●</div>
          <div className="map-label">
            <strong>Aura & Vida</strong>
            <span>{contactInfo.address}</span>
          </div>
          <span className="demo-tag">Mapa demo</span>
        </div>
      </Reveal>
    </section>
  )
}
