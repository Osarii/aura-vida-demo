import { useState, type SyntheticEvent } from 'react'
import Modal from '../components/Modal'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { specialties } from '../data/specialties'
import { doctors } from '../data/doctors'
import type { Specialty } from '../types'
import { setImageFallback } from '../utils/images'

type Props = {
  onReserveSpecialty: (specialtyId: string) => void
}

export default function SpecialtiesSection({ onReserveSpecialty }: Props) {
  const [selected, setSelected] = useState<Specialty | null>(null)
  const [directoryOpen, setDirectoryOpen] = useState(false)

  return (
    <section className="section" id="especialidades">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestras especialidades"
            title="Cuidado integral para usted y su familia"
            description="Explore cada área y continúe directamente al proceso de reserva."
          />
        </Reveal>

        <Reveal className="specialties-grid">
          {specialties.map((item) => (
            <button type="button" className="specialty-card" key={item.id} onClick={() => setSelected(item)}>
              <div className="specialty-icon" aria-hidden="true"><Icon name={item.icon} size={25} /></div>
              <h3>{item.name}</h3>
              <p>{item.shortDescription}</p>
              <span className="inline-icon-link">Conocer más <Icon name="arrow-right" size={16} /></span>
            </button>
          ))}
        </Reveal>

        <Reveal className="center-actions">
          <button type="button" className="button button-outline" onClick={() => setDirectoryOpen(true)}>
            Ver todas las especialidades
          </button>
        </Reveal>
      </div>

      <Modal
        isOpen={Boolean(selected)}
        title={selected?.name ?? 'Especialidad'}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="detail-content">
            <p>{selected.description}</p>
            <h4>Profesionales relacionados</h4>
            <div className="mini-list">
              {doctors
                .filter((doctor) => doctor.specialtyId === selected.id)
                .map((doctor) => (
                  <div className="mini-doctor" key={doctor.id}>
                    <img src={doctor.photo} alt={doctor.name} loading="lazy" decoding="async" onError={(event: SyntheticEvent<HTMLImageElement>) => setImageFallback(event.currentTarget, doctor.name)} />
                    <div>
                      <strong>{doctor.name}</strong>
                      <span>{doctor.specialty}</span>
                    </div>
                  </div>
                ))}
            </div>
            <button
              type="button"
              className="button button-primary button-full modal-primary-action"
              onClick={() => {
                setSelected(null)
                onReserveSpecialty(selected.id)
              }}
            >
              Reservar en {selected.name}
            </button>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={directoryOpen}
        title="Todas las especialidades"
        onClose={() => setDirectoryOpen(false)}
        wide
      >
        <div className="specialty-directory">
          {specialties.map((item) => (
            <article key={item.id}>
              <div className="specialty-icon" aria-hidden="true"><Icon name={item.icon} size={25} /></div>
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
              <button type="button"
                className="button button-primary compact-button"
                onClick={() => {
                  setDirectoryOpen(false)
                  onReserveSpecialty(item.id)
                }}
              >
                Reservar
              </button>
            </article>
          ))}
        </div>
      </Modal>
    </section>
  )
}
