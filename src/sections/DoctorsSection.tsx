import { useEffect, useMemo, useState } from 'react'
import Modal from '../components/Modal'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import SkeletonCard from '../components/SkeletonCard'
import { doctors } from '../data/doctors'
import { specialties } from '../data/specialties'
import type { Doctor } from '../types'

type Props = {
  favorites: string[]
  onToggleFavorite: (doctorId: string) => void
  onReserveDoctor: (doctor: Doctor) => void
}

type SortMode = 'availability' | 'rating' | 'name'

export default function DoctorsSection({
  favorites,
  onToggleFavorite,
  onReserveDoctor,
}: Props) {
  const [selected, setSelected] = useState<Doctor | null>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState<SortMode>('availability')
  const [loading, setLoading] = useState(true)
  const [onlyFavorites, setOnlyFavorites] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const list = doctors.filter((doctor) => {
      const matchesSearch =
        !normalized ||
        doctor.name.toLowerCase().includes(normalized) ||
        doctor.specialty.toLowerCase().includes(normalized)
      const matchesFilter = filter === 'all' || doctor.specialtyId === filter
      const matchesFavorites = !onlyFavorites || favorites.includes(doctor.id)
      return matchesSearch && matchesFilter && matchesFavorites
    })

    return [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'name') return a.name.localeCompare(b.name)
      return b.experienceYears - a.experienceYears
    })
  }, [query, filter, sort, onlyFavorites, favorites])

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
            <h3>{doctors[featuredIndex].name}</h3>
            <p>{doctors[featuredIndex].specialty} · ★ {doctors[featuredIndex].rating} · {doctors[featuredIndex].experienceYears} años de experiencia</p>
            <div className="featured-doctor-actions">
              <button type="button" className="button button-primary" onClick={() => onReserveDoctor(doctors[featuredIndex])}>
                Reservar con este profesional
              </button>
              <button type="button" className="button button-secondary" onClick={() => setSelected(doctors[featuredIndex])}>
                Ver perfil
              </button>
            </div>
          </div>
          <img src={doctors[featuredIndex].photo} alt={doctors[featuredIndex].name} decoding="async" />
          <div className="featured-carousel-buttons">
            <button type="button"
              className="icon-button"
              onClick={() => setFeaturedIndex((current) => (current - 1 + doctors.length) % doctors.length)}
              aria-label="Profesional anterior"
            >
              ←
            </button>
            <span>{featuredIndex + 1} / {doctors.length}</span>
            <button type="button"
              className="icon-button"
              onClick={() => setFeaturedIndex((current) => (current + 1) % doctors.length)}
              aria-label="Profesional siguiente"
            >
              →
            </button>
          </div>
        </Reveal>

        <Reveal className="doctor-tools">
          <label className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Buscar profesional o especialidad..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">Todas las especialidades</option>
            {specialties.map((item) => (
              <option value={item.id} key={item.id}>{item.name}</option>
            ))}
          </select>

          <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
            <option value="availability">Más experiencia</option>
            <option value="rating">Mejor valoración</option>
            <option value="name">Nombre A–Z</option>
          </select>

          <button type="button"
            className={`favorite-filter ${onlyFavorites ? 'active' : ''}`}
            onClick={() => setOnlyFavorites((value) => !value)}
          >
            ♥ Favoritos
          </button>
        </Reveal>

        <Reveal className="doctors-grid show-all">
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
                    <img src={doctor.photo} alt={doctor.name} loading="lazy" decoding="async" />
                    <span>Especialista</span>
                    <button
                      type="button"
                      className={`favorite-button ${favorite ? 'active' : ''}`}
                      onClick={() => onToggleFavorite(doctor.id)}
                      aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      aria-pressed={favorite}
                    >
                      {favorite ? '♥' : '♡'}
                    </button>
                  </div>
                  <div className="doctor-card-body">
                    <div className="doctor-card-rating">
                      <span>★ {doctor.rating}</span>
                      <small>{doctor.reviews} reseñas</small>
                    </div>
                    <h3>{doctor.name}</h3>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <p>{doctor.bio}</p>
                    <div className="availability-line">
                      <span>● Alta disponibilidad</span>
                      <small>Próxima cita</small>
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
              <span>⌕</span>
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
              <img src={selected.photo} alt={selected.name} decoding="async" />
              <button type="button"
                className={`favorite-button detail-favorite ${favorites.includes(selected.id) ? 'active' : ''}`}
                onClick={() => onToggleFavorite(selected.id)}
              >
                {favorites.includes(selected.id) ? '♥ Favorito' : '♡ Guardar'}
              </button>
            </div>
            <div>
              <span className="pill">{selected.specialty}</span>
              <div className="detail-rating">
                <strong>★ {selected.rating}</strong>
                <span>{selected.reviews} reseñas</span>
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
                <span>Próxima disponibilidad</span>
                <strong>Mañana · 09:30 a.m.</strong>
              </div>
              <button type="button"
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
