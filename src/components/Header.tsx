import { useState } from 'react'
import symbolLogo from '../assets/aura-vida-symbol.png'
import wordmarkLogo from '../assets/aura-vida-wordmark.png'

type Props = {
  appointmentCount: number
  onOpenAppointments: () => void
}

const links = [
  ['Inicio', 'inicio'],
  ['Nosotros', 'nosotros'],
  ['Especialidades', 'especialidades'],
  ['Nuestros Doctores', 'doctores'],
  ['Reservar Cita', 'reservar'],
  ['Contacto', 'contacto'],
] as const

export default function Header({ appointmentCount, onOpenAppointments }: Props) {
  const [open, setOpen] = useState(false)

  const goTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <button
          type="button"
          className="brand brand-official"
          onClick={() => goTo('inicio')}
          aria-label="Ir al inicio"
        >
          <img className="brand-symbol-image" src={symbolLogo} alt="" aria-hidden="true" />
          <img
            className="brand-wordmark-image"
            src={wordmarkLogo}
            alt="Aura & Vida — Alta especialidad para la mujer y el niño"
          />
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([label, id]) => (
            <button type="button" key={id} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
        </nav>

        <button type="button" className="my-appointments-button" onClick={onOpenAppointments}>
          Mis citas
          <span aria-label={`${appointmentCount} citas próximas`}>{appointmentCount}</span>
        </button>

        <button type="button" className="button button-primary desktop-cta" onClick={() => goTo('reservar')}>
          Reservar
        </button>

        <button
          type="button"
          className={`menu-button ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">
          {links.map(([label, id]) => (
            <button type="button" key={id} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onOpenAppointments()
            }}
          >
            Mis citas ({appointmentCount})
          </button>
        </nav>
      )}
    </header>
  )
}
