import type { Specialty } from '../types'

export const specialties: Specialty[] = [
  {
    id: 'ginecologia',
    name: 'Ginecología',
    icon: '✦',
    shortDescription: 'Cuidado integral de la salud femenina.',
    description:
      'Atención ginecológica preventiva y especializada para cada etapa de la vida, con un enfoque cálido, cercano y personalizado.',
  },
  {
    id: 'obstetricia',
    name: 'Obstetricia',
    icon: '♡',
    shortDescription: 'Acompañamiento durante todo el embarazo.',
    description:
      'Seguimiento prenatal, control del embarazo y acompañamiento profesional para vivir una maternidad segura y tranquila.',
  },
  {
    id: 'pediatria',
    name: 'Pediatría',
    icon: '☀',
    shortDescription: 'Bienestar y crecimiento de los más pequeños.',
    description:
      'Atención pediátrica orientada al desarrollo, prevención y tratamiento, siempre con una experiencia amable para niños y familias.',
  },
  {
    id: 'materno-fetal',
    name: 'Medicina Materno-Fetal',
    icon: '◌',
    shortDescription: 'Seguimiento especializado de alto nivel.',
    description:
      'Valoración materno-fetal con tecnología moderna para acompañar embarazos que requieren observación y atención especializada.',
  },
  {
    id: 'otros',
    name: 'Otros Servicios',
    icon: '＋',
    shortDescription: 'Servicios complementarios de bienestar.',
    description:
      'Consulta general, orientación preventiva, chequeos y servicios complementarios para una atención integral.',
  },
]
