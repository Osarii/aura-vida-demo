import { useState } from 'react'
import symbolLogo from '../assets/aura-vida-symbol.png'
import wordmarkLogo from '../assets/aura-vida-wordmark.png'

type Props = {
  appointmentCount: number
  onOpenAppointments: () => void
  onResetDemo: () => void
}

const links = [
  ['Inicio', 'inicio'],
  ['Nosotros', 'nosotros'],
  ['Especialidades', 'especialidades'],
  ['Nuestros Doctores', 'doctores'],
  ['Reservar Cita', 'reservar'],
  ['Contacto', 'contacto'],
] as const

export default function Header({
  appointmentCount,
  onOpenAppointments,
  onResetDemo,
}: Props) {
  const [open, setOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  const goTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <button className="brand brand-official" onClick={() => goTo('inicio')} aria-label="Ir al inicio">
          <img className="brand-symbol-image" src={symbolLogo} alt="" aria-hidden="true" />
          <img
            className="brand-wordmark-image"
            src={wordmarkLogo}
            alt="Aura & Vida — Alta especialidad para la mujer y el niño"
          />
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
        </nav>

        <button className="my-appointments-button" onClick={onOpenAppointments}>
          Mis citas
          <span>{appointmentCount}</span>
        </button>

        <div className="demo-control">
          <button className="demo-badge" onClick={() => setDemoOpen((value) => !value)}>
            DEMO MODE
          </button>
          {demoOpen && (
            <div className="demo-popover">
              <strong>Frontend simulado</strong>
              <span>Datos mock · Sin backend</span>
              <span>Persistencia: LocalStorage</span>
              <button onClick={onResetDemo}>Restablecer demo</button>
            </div>
          )}
        </div>

        <button className="button button-primary desktop-cta" onClick={() => goTo('reservar')}>
          Reservar
        </button>

        <button
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Navegación móvil">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
          <button onClick={onOpenAppointments}>Mis citas ({appointmentCount})</button>
          <button onClick={onResetDemo}>Restablecer demo</button>
        </nav>
      )}
    </header>
  )
}
