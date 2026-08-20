import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const benefits = [
  ['♡', 'Atención personalizada', 'Escuchamos sus necesidades y acompañamos cada proceso de forma cercana.'],
  ['✦', 'Profesionales calificados', 'Un enfoque profesional orientado a una atención segura, clara y confiable.'],
  ['⌂', 'Ambiente seguro', 'Espacios pensados para transmitir calma, privacidad y bienestar.'],
  ['◎', 'Procesos claros', 'Información organizada y un flujo sencillo para acompañar cada visita.'],
]

export default function BenefitsSection() {
  return (
    <section className="section section-soft" id="nosotros">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Bienestar con propósito"
            title="Un lugar pensado para cuidarle"
            description="Combinamos experiencia, cercanía y una atención integral para que cada visita se sienta diferente."
          />
        </Reveal>

        <Reveal className="benefits-grid">
          {benefits.map(([icon, title, text]) => (
            <article className="benefit-card" key={title}>
              <div className="soft-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
