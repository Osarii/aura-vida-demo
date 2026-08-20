import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { testimonials } from '../data/testimonials'

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const next = () => setIndex((value) => (value + 1) % testimonials.length)
  const previous = () => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="section">
      <Reveal className="container testimonials-layout">
        <SectionHeading
          eyebrow="Historias que nos inspiran"
          title="La mejor experiencia es la que se comparte"
          description="Testimonios ficticios creados únicamente para la demostración."
          centered={false}
        />

        <article className="testimonial-card">
          <div className="stars">{'★'.repeat(current.stars)}</div>
          <blockquote>“{current.comment}”</blockquote>
          <div className="testimonial-footer">
            <div>
              <strong>{current.name}</strong>
              <span>{current.category}</span>
            </div>
            <div className="carousel-buttons">
              <button className="icon-button carousel-button" onClick={previous} aria-label="Anterior">←</button>
              <button className="icon-button carousel-button" onClick={next} aria-label="Siguiente">→</button>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
