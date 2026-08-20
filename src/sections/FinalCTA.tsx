import Reveal from '../components/Reveal'

export default function FinalCTA() {
  const goToBooking = () =>
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="final-cta">
      <Reveal className="container final-cta-inner">
        <div>
          <span className="eyebrow eyebrow-light">Aura & Vida</span>
          <h2>Porque su salud y la de su familia merecen lo mejor</h2>
        </div>
        <button className="button button-light" onClick={goToBooking}>
          Reservar cita ahora
        </button>
      </Reveal>
    </section>
  )
}
