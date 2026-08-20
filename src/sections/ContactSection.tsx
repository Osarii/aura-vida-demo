import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { contactInfo } from '../data/contact'

export default function ContactSection() {
  return (
    <section className="section section-soft" id="contacto">
      <Reveal className="container contact-layout">
        <div>
          <SectionHeading
            eyebrow="Ubicación y contacto"
            title="Estamos para atenderle"
            description="Consulte nuestra referencia de ubicación y el horario general de atención."
            centered={false}
          />

          <div className="contact-list">
            <div className="contact-item">
              <span aria-hidden="true"><Icon name="map-pin" size={19} /></span>
              <div><small>Ubicación</small><strong>{contactInfo.address}</strong></div>
            </div>

            <div className="contact-item">
              <span aria-hidden="true"><Icon name="clock" size={19} /></span>
              <div><small>Horario</small><strong>{contactInfo.schedule}</strong></div>
            </div>

            {contactInfo.phone && contactInfo.phoneHref && (
              <a className="contact-item" href={contactInfo.phoneHref}>
                <span aria-hidden="true"><Icon name="phone" size={19} /></span>
                <div><small>Teléfono</small><strong>{contactInfo.phone}</strong></div>
              </a>
            )}

            {contactInfo.whatsapp && contactInfo.whatsappHref && (
              <a
                className="contact-item"
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <span aria-hidden="true"><Icon name="message" size={19} /></span>
                <div><small>WhatsApp</small><strong>{contactInfo.whatsapp}</strong></div>
              </a>
            )}

            {contactInfo.email && contactInfo.emailHref && (
              <a className="contact-item" href={contactInfo.emailHref}>
                <span aria-hidden="true"><Icon name="mail" size={19} /></span>
                <div><small>Correo</small><strong>{contactInfo.email}</strong></div>
              </a>
            )}
          </div>
        </div>

        <div className="map-card" aria-label="Referencia visual de ubicación">
          <div className="map-grid" />
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-pin" aria-hidden="true"><Icon name="map-pin" size={22} /></div>
          <div className="map-label">
            <strong>Aura & Vida</strong>
            <span>{contactInfo.address}</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
