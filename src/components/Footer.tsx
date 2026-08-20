import fullLogo from '../assets/aura-vida-logo.png'

type Props = {
  onSocialClick: (network: string) => void
}

export default function Footer({ onSocialClick }: Props) {
  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <button className="footer-logo-button" onClick={() => goTo('inicio')} aria-label="Ir al inicio">
            <img
              className="footer-official-logo"
              src={fullLogo}
              alt="Aura & Vida — Alta especialidad para la mujer y el niño"
            />
          </button>
          <p>Demo frontend premium desarrollado con React + TypeScript + Vite.</p>
        </div>

        <div>
          <h4>Navegación</h4>
          <button onClick={() => goTo('inicio')}>Inicio</button>
          <button onClick={() => goTo('especialidades')}>Especialidades</button>
          <button onClick={() => goTo('doctores')}>Doctores</button>
          <button onClick={() => goTo('reservar')}>Reservar cita</button>
        </div>

        <div>
          <h4>Redes demo</h4>
          <button onClick={() => onSocialClick('Instagram')}>Instagram</button>
          <button onClick={() => onSocialClick('Facebook')}>Facebook</button>
          <button onClick={() => onSocialClick('LinkedIn')}>LinkedIn</button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Aura & Vida — Demo frontend.</span>
        <span>Sin backend · Persistencia local · Datos simulados</span>
      </div>
    </footer>
  )
}
