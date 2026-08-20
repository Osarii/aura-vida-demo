import fullLogo from '../assets/aura-vida-logo.webp'

export default function Footer() {
  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <button type="button" className="footer-logo-button" onClick={() => goTo('inicio')} aria-label="Ir al inicio">
            <img
              className="footer-official-logo"
              src={fullLogo}
              alt="Aura & Vida — Alta especialidad para la mujer y el niño"
              loading="lazy"
              decoding="async"
            />
          </button>
          <p>Alta especialidad para la mujer y el niño.</p>
        </div>

        <div>
          <h4>Navegación</h4>
          <button type="button" onClick={() => goTo('inicio')}>Inicio</button>
          <button type="button" onClick={() => goTo('especialidades')}>Especialidades</button>
          <button type="button" onClick={() => goTo('doctores')}>Doctores</button>
          <button type="button" onClick={() => goTo('reservar')}>Reservar cita</button>
        </div>

        <div>
          <h4>Atención</h4>
          <button type="button" onClick={() => goTo('contacto')}>Contacto</button>
          <button type="button" onClick={() => goTo('reservar')}>Agendar una cita</button>
          <button type="button" onClick={() => goTo('nosotros')}>Conózcanos</button>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Aura & Vida.</span>
        <span>Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}
