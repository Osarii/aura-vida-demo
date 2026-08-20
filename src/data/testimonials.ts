import type { Testimonial } from '../types'

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Mariana S.',
    category: 'Paciente de Obstetricia',
    comment:
      'Desde la primera cita sentí tranquilidad y confianza. El acompañamiento fue muy cercano en cada etapa.',
    stars: 5,
  },
  {
    id: 't2',
    name: 'Gabriela R.',
    category: 'Paciente de Ginecología',
    comment:
      'La atención fue puntual, profesional y muy humana. Todo el proceso se sintió claro y sencillo.',
    stars: 5,
  },
  {
    id: 't3',
    name: 'Andrea M.',
    category: 'Mamá de paciente pediátrico',
    comment:
      'Nos explicaron todo con paciencia y mi hijo se sintió cómodo durante la consulta.',
    stars: 5,
  },
]
