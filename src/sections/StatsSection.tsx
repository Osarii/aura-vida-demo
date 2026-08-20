import Reveal from '../components/Reveal'

const highlights = [
  ['♡', 'Atención integral', 'Acompañamiento en cada etapa'],
  ['✓', 'Reserva sencilla', 'Proceso claro y rápido'],
  ['✦', 'Equipo especializado', 'Atención enfocada en la familia'],
  ['◷', 'Seguimiento cercano', 'Información accesible y ordenada'],
]

export default function StatsSection() {
  return (
    <section className="stats-strip" aria-label="Aspectos destacados">
      <Reveal className="container stats-grid">
        {highlights.map(([icon, title, text]) => (
          <div className="stat-card" key={title}>
            <strong aria-hidden="true">{icon}</strong>
            <span>{title}</span>
            <small>{text}</small>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
