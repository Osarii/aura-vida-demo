import Reveal from '../components/Reveal'

export default function HeroSection() {
  const goToBooking = () =>
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })

  const openWhatsapp = () => {
    window.open(
      'https://wa.me/50670000000?text=Hola%20Aura%20%26%20Vida.%20Quisiera%20informaci%C3%B3n%20%28demo%29',
      '_blank',
      'noopener,noreferrer',
    )
  }

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
              <div className="hero-inline-note">
                <span className="hero-inline-dot" />
                Demo interactivo premium
              </div>
            </div>

            <div className="hero-message-card">
              <small className="hero-card-label">Acompañamiento integral</small>
              <h1>
                Su bienestar,
                <span> nuestra vocación</span>
              </h1>
              <p>
                Atención médica cálida, profesional y cercana para acompañarle en cada
                etapa. Un espacio diseñado para transmitir tranquilidad, confianza
                y una experiencia premium para usted y su familia.
              </p>

              <div className="hero-actions">
                <button className="button button-primary" onClick={goToBooking}>
                  Reservar cita
                </button>
                <button className="button button-secondary" onClick={openWhatsapp}>
                  Escríbenos por WhatsApp
                </button>
              </div>

              <div className="hero-feature-strip">
                <article>
                  <strong>Respuesta rápida</strong>
                  <span>Atención y orientación inicial</span>
                </article>
                <article>
                  <strong>Reserva guiada</strong>
                  <span>Flujo paso a paso</span>
                </article>
                <article>
                  <strong>Datos demo</strong>
                  <span>Sin backend · experiencia realista</span>
                </article>
              </div>
            </div>

            <div className="hero-trust">
              <div>
                <strong>+12</strong>
                <span>Años de experiencia</span>
              </div>
              <div>
                <strong>5★</strong>
                <span>Atención humana</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Demo frontend</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="hero-visual">
            <div className="hero-visual-backdrop" />
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=85"
                alt="Madre abrazando a su bebé"
              />

              <div className="floating-card floating-card-top">
                <span className="floating-icon">♡</span>
                <div>
                  <strong>Atención cercana</strong>
                  <small>Para cada etapa</small>
                </div>
              </div>

              <div className="floating-card floating-card-bottom">
                <span className="floating-icon">✓</span>
                <div>
                  <strong>Reserva sencilla</strong>
                  <small>En pocos pasos</small>
                </div>
              </div>

              <div className="hero-review-card">
                <div className="hero-review-stars">★★★★★</div>
                <strong>Experiencia premium</strong>
                <p>Simulación visual de una atención clara, cálida y confiable.</p>
              </div>
            </div>

            <div className="hero-side-card">
              <small>Reserva sugerida</small>
              <strong>Pediatría · Dr. Daniel Vega</strong>
              <p>Mañana · 09:30 a.m.</p>
              <button onClick={goToBooking}>Continuar reserva →</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
