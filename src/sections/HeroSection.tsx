import type { SyntheticEvent } from 'react'
import Reveal from '../components/Reveal'
import heroFallback from '../assets/aura-vida-logo.webp'

export default function HeroSection() {
  const goToBooking = () =>
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const goToContact = () =>
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="hero" id="inicio">
      <div className="hero-blob hero-blob-one" />
      <div className="hero-blob hero-blob-two" />
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />

      <div className="container hero-stage">
        <div className="hero-grid">
          <Reveal className="hero-copy">
            <div className="hero-topline">
              <span className="eyebrow">Cuidamos lo que más importa</span>
            </div>

            <div className="hero-message-card">
              <small className="hero-card-label">Acompañamiento integral</small>
              <h1>
                Su bienestar,
                <span> nuestra vocación</span>
              </h1>
              <p>
                Atención médica cálida, profesional y cercana para acompañarle en cada etapa.
                Un espacio pensado para transmitir tranquilidad, confianza y atención especializada
                para usted y su familia.
              </p>

              <div className="hero-actions">
                <button type="button" className="button button-primary" onClick={goToBooking}>
                  Reservar cita
                </button>
                <button type="button" className="button button-secondary" onClick={goToContact}>
                  Ubicación y horario
                </button>
              </div>

              <div className="hero-feature-strip">
                <article>
                  <strong>Respuesta rápida</strong>
                  <span>Atención y orientación inicial</span>
                </article>
                <article>
                  <strong>Reserva guiada</strong>
                  <span>Proceso claro paso a paso</span>
                </article>
                <article>
                  <strong>Atención cercana</strong>
                  <span>Confianza y acompañamiento</span>
                </article>
              </div>
            </div>

            <div className="hero-trust">
              <div>
                <strong>Integral</strong>
                <span>Atención coordinada</span>
              </div>
              <div>
                <strong>Cercana</strong>
                <span>Trato humano</span>
              </div>
              <div>
                <strong>Clara</strong>
                <span>Reserva sencilla</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="hero-visual">
            <div className="hero-visual-backdrop" />
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=85"
                alt="Madre abrazando a su bebé"
                fetchPriority="high"
                onError={(event: SyntheticEvent<HTMLImageElement>) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = heroFallback
                  event.currentTarget.classList.add('hero-fallback-image')
                }}
              />

              <div className="floating-card floating-card-top">
                <span className="floating-icon" aria-hidden="true">♡</span>
                <div>
                  <strong>Atención cercana</strong>
                  <small>Para cada etapa</small>
                </div>
              </div>

              <div className="floating-card floating-card-bottom">
                <span className="floating-icon" aria-hidden="true">✓</span>
                <div>
                  <strong>Reserva sencilla</strong>
                  <small>En pocos pasos</small>
                </div>
              </div>

              <div className="hero-review-card">
                <strong>Cuidado con propósito</strong>
                <p>Una experiencia de atención clara, cálida y confiable.</p>
              </div>
            </div>

            <div className="hero-side-card">
              <small>Reserva en línea</small>
              <strong>Elija especialidad y profesional</strong>
              <p>Consulte la disponibilidad antes de confirmar.</p>
              <button type="button" onClick={goToBooking}>Continuar reserva →</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
