import Reveal from '../components/Reveal'
import { useCountUp } from '../hooks/useCountUp'

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const value = useCountUp(target)
  return (
    <div className="stat-card">
      <strong>{value.toLocaleString('es-CR')}{suffix}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="stats-strip">
      <Reveal className="container stats-grid">
        <Stat target={12} suffix="+" label="Años de experiencia" />
        <Stat target={5000} suffix="+" label="Pacientes atendidos*" />
        <Stat target={5} suffix="" label="Especialidades" />
        <Stat target={98} suffix="%" label="Satisfacción demo*" />
      </Reveal>
      <p className="stats-disclaimer">* Cifras ficticias para fines de demostración.</p>
    </section>
  )
}
