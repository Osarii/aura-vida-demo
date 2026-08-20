import { useState } from 'react'
import Modal from '../components/Modal'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { specialties } from '../data/specialties'
import { doctors } from '../data/doctors'
import type { Specialty } from '../types'

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
            description="Explore cada área y continúe directamente a una reserva simulada."
          />
        </Reveal>

        <Reveal className="specialties-grid">
          {specialties.map((item) => (
            <button className="specialty-card" key={item.id} onClick={() => setSelected(item)}>
              <div className="specialty-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.shortDescription}</p>
              <span>Conocer más →</span>
            </button>
          ))}
        </Reveal>

        <Reveal className="center-actions">
          <button className="button button-outline" onClick={() => setDirectoryOpen(true)}>
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
                    <img src={doctor.photo} alt={doctor.name} />
                    <div>
                      <strong>{doctor.name}</strong>
                      <span>{doctor.specialty}</span>
                    </div>
                  </div>
                ))}
            </div>
            <button
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
              <div className="specialty-icon">{item.icon}</div>
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
              <button
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
