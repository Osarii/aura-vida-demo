import { useEffect, useMemo, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import Modal from '../components/Modal'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import SkeletonCard from '../components/SkeletonCard'
import Icon from '../components/Icon'
import { doctors } from '../data/doctors'
import { specialties } from '../data/specialties'
import type { Doctor } from '../types'
import { normalizeSearchText } from '../utils/date'
import { setImageFallback } from '../utils/images'

type Props = {
  favorites: string[]
  onToggleFavorite: (doctorId: string) => void
  onReserveDoctor: (doctor: Doctor) => void
}

type SortMode = 'experience' | 'name' | 'specialty'

export default function DoctorsSection({
  favorites,
  onToggleFavorite,
  onReserveDoctor,
}: Props) {
  const [selected, setSelected] = useState<Doctor | null>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState<SortMode>('experience')
  const [loading, setLoading] = useState(true)
  const [onlyFavorites, setOnlyFavorites] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450)
    return () => window.clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    const normalized = normalizeSearchText(query)
    const list = doctors.filter((doctor) => {
      const searchable = normalizeSearchText(`${doctor.name} ${doctor.specialty}`)
      const matchesSearch = !normalized || searchable.includes(normalized)
      const matchesFilter = filter === 'all' || doctor.specialtyId === filter
      const matchesFavorites = !onlyFavorites || favorites.includes(doctor.id)
      return matchesSearch && matchesFilter && matchesFavorites
    })

    return [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'es')
      if (sort === 'specialty') return a.specialty.localeCompare(b.specialty, 'es')
      return b.experienceYears - a.experienceYears
    })
  }, [query, filter, sort, onlyFavorites, favorites])

  const featured = doctors[featuredIndex]

  return (
    <section className="section section-soft" id="doctores">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestro equipo"
            title="Profesionales que inspiran confianza"
            description="Busque, filtre, marque favoritos y reserve directamente con un profesional."
          />
        </Reveal>

        <Reveal className="featured-doctor-shell">
          <div className="featured-doctor-copy">
            <span className="eyebrow">Profesional destacado</span>
            <h3>{featured.name}</h3>
            <p>{featured.specialty} · {featured.experienceYears} años de experiencia</p>
            <div className="featured-doctor-actions">
              <button type="button" className="button button-primary" onClick={() => onReserveDoctor(featured)}>
                Reservar con este profesional
              </button>
              <button type="button" className="button button-secondary" onClick={() => setSelected(featured)}>
                Ver perfil
              </button>
            </div>
          </div>
          <img
            src={featured.photo}
            alt={featured.name}
            decoding="async"
            onError={(event: SyntheticEvent<HTMLImageElement>) => setImageFallback(event.currentTarget, featured.name)}
          />
          <div className="featured-carousel-buttons">
            <button
              type="button"
              className="icon-button"
              onClick={() => setFeaturedIndex((current) => (current - 1 + doctors.length) % doctors.length)}
              aria-label="Profesional anterior"
            >
              <Icon name="chevron-left" size={18} />
            </button>
            <span aria-live="polite">{featuredIndex + 1} / {doctors.length}</span>
            <button
              type="button"
              className="icon-button"
              onClick={() => setFeaturedIndex((current) => (current + 1) % doctors.length)}
              aria-label="Profesional siguiente"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </Reveal>

        <Reveal className="doctor-tools">
          <label className="search-box">
            <span className="sr-only">Buscar profesional o especialidad</span>
            <span aria-hidden="true"><Icon name="search" size={18} /></span>
            <input
              type="search"
              aria-label="Buscar profesional o especialidad"
              placeholder="Buscar profesional o especialidad..."
              value={query}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
            />
          </label>

          <label className="filter-field">
            <span className="sr-only">Filtrar por especialidad</span>
            <select
              aria-label="Filtrar por especialidad"
              value={filter}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setFilter(event.target.value)}
            >
              <option value="all">Todas las especialidades</option>
              {specialties.map((item) => (
                <option value={item.id} key={item.id}>{item.name}</option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span className="sr-only">Ordenar profesionales</span>
            <select
              aria-label="Ordenar profesionales"
              value={sort}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setSort(event.target.value as SortMode)}
            >
              <option value="experience">Más experiencia</option>
              <option value="name">Nombre A–Z</option>
              <option value="specialty">Especialidad A–Z</option>
            </select>
          </label>

          <button
            type="button"
            className={`favorite-filter ${onlyFavorites ? 'active' : ''}`}
            onClick={() => setOnlyFavorites((value) => !value)}
            aria-pressed={onlyFavorites}
          >
            <Icon name={onlyFavorites ? 'heart-filled' : 'heart'} size={17} /> Favoritos
          </button>
        </Reveal>

        <Reveal className="doctors-grid show-all" aria-live="polite">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : filtered.length ? (
            filtered.map((doctor) => {
              const favorite = favorites.includes(doctor.id)
              return (
                <article className="doctor-card" key={doctor.id}>
                  <div className="doctor-photo">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      loading="lazy"
                      decoding="async"
                      onError={(event: SyntheticEvent<HTMLImageElement>) => setImageFallback(event.currentTarget, doctor.name)}
                    />
                    <span>Especialista</span>
                    <button
                      type="button"
                      className={`favorite-button ${favorite ? 'active' : ''}`}
                      onClick={() => onToggleFavorite(doctor.id)}
                      aria-label={favorite ? `Quitar a ${doctor.name} de favoritos` : `Agregar a ${doctor.name} a favoritos`}
                      aria-pressed={favorite}
                    >
                      <Icon name={favorite ? 'heart-filled' : 'heart'} size={19} />
                    </button>
                  </div>
                  <div className="doctor-card-body">
                    <div className="doctor-card-rating doctor-card-meta">
                      <span>{doctor.experienceYears} años de experiencia</span>
                      <small>{doctor.languages.join(' · ')}</small>
                    </div>
                    <h3>{doctor.name}</h3>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <p>{doctor.bio}</p>
                    <div className="availability-line">
                      <span>Agenda disponible</span>
                      <small>Consultar horarios</small>
                    </div>
                    <div className="doctor-actions">
                      <button type="button" className="text-link" onClick={() => setSelected(doctor)}>
                        Ver perfil
                      </button>
                      <button type="button" className="button button-primary compact-button" onClick={() => onReserveDoctor(doctor)}>
                        Reservar
                      </button>
                    </div>
                  </div>
                </article>
              )
            })
          ) : (
            <div className="no-results">
              <span aria-hidden="true"><Icon name="search" size={18} /></span>
              <h3>No encontramos profesionales</h3>
              <p>Pruebe otra búsqueda o desactive el filtro de favoritos.</p>
            </div>
          )}
        </Reveal>
      </div>

      <Modal
        isOpen={Boolean(selected)}
        title={selected?.name ?? 'Profesional'}
        onClose={() => setSelected(null)}
        wide
      >
        {selected && (
          <div className="doctor-detail">
            <div className="doctor-detail-image">
              <img
                src={selected.photo}
                alt={selected.name}
                decoding="async"
                onError={(event: SyntheticEvent<HTMLImageElement>) => setImageFallback(event.currentTarget, selected.name)}
              />
              <button
                type="button"
                className={`favorite-button detail-favorite ${favorites.includes(selected.id) ? 'active' : ''}`}
                onClick={() => onToggleFavorite(selected.id)}
                aria-pressed={favorites.includes(selected.id)}
              >
                <Icon name={favorites.includes(selected.id) ? 'heart-filled' : 'heart'} size={17} />
                {favorites.includes(selected.id) ? 'Favorito' : 'Guardar'}
              </button>
            </div>
            <div>
              <span className="pill">{selected.specialty}</span>
              <div className="detail-rating">
                <strong>{selected.experienceYears} años de experiencia</strong>
                <span>{selected.languages.join(' · ')}</span>
              </div>
              <p>{selected.bio}</p>
              <div className="detail-meta">
                <div><small>Experiencia</small><strong>{selected.experienceYears} años</strong></div>
                <div><small>Idiomas</small><strong>{selected.languages.join(', ')}</strong></div>
              </div>
              <h4>Formación</h4>
              <ul>
                {selected.education.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="next-availability">
                <span>Disponibilidad</span>
                <strong>Consulte los horarios en la reserva</strong>
              </div>
              <button
                type="button"
                className="button button-primary button-full"
                onClick={() => {
                  setSelected(null)
                  onReserveDoctor(selected)
                }}
              >
                Reservar con {selected.name.replace(/^Dra?\. /, '')}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
