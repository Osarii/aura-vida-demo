import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const principles = [
  ['Comunicación clara', 'Información comprensible antes, durante y después de cada atención.'],
  ['Acompañamiento humano', 'Una experiencia cercana, respetuosa y enfocada en las necesidades de cada familia.'],
  ['Continuidad de atención', 'Un flujo organizado para consultar especialidades, profesionales y próximas citas.'],
]

export default function CarePrinciplesSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestra forma de cuidar"
            title="Una experiencia centrada en las personas"
            description="Diseñamos cada punto de contacto para que la atención se sienta clara, cercana y ordenada."
          />
        </Reveal>

        <Reveal className="care-principles-grid">
          {principles.map(([title, text]) => (
            <article className="care-principle-card" key={title}>
              <span aria-hidden="true">✦</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
