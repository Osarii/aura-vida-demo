import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import type { IconName } from '../types'

const highlights: Array<[IconName, string, string]> = [
  ['heart-pulse', 'Atención integral', 'Acompañamiento en cada etapa'],
  ['calendar-check', 'Reserva sencilla', 'Proceso claro y rápido'],
  ['users', 'Equipo especializado', 'Atención enfocada en la familia'],
  ['clock', 'Seguimiento cercano', 'Información accesible y ordenada'],
]

export default function StatsSection() {
  return (
    <section className="stats-strip" aria-label="Aspectos destacados">
      <Reveal className="container stats-grid">
        {highlights.map(([icon, title, text]) => (
          <div className="stat-card" key={title}>
            <div className="stat-icon" aria-hidden="true"><Icon name={icon} size={26} /></div>
            <span>{title}</span>
            <small>{text}</small>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
