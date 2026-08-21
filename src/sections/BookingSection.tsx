import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from 'react'
import CustomCalendar from '../components/CustomCalendar'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { specialties } from '../data/specialties'
import { doctors } from '../data/doctors'
import { getAvailability } from '../data/appointments'
import type { Appointment, BookingDraft } from '../types'
import { formatDate, isPastAppointmentSlot } from '../utils/date'
import { isDuplicateActiveAppointment } from '../utils/appointments'
import { setImageFallback } from '../utils/images'
import { downloadAppointmentPDF } from '../utils/pdf'
import {
  downloadICS,
  openGoogleCalendar,
  shareAppointmentOnWhatsApp,
} from '../utils/calendar'

type Props = {
  draft: BookingDraft
  setDraft: (draft: BookingDraft) => void
  appointments: Appointment[]
  onCreateAppointment: (appointment: Appointment) => void
  onNotify: (text: string, tone?: 'success' | 'error' | 'info') => void
}

function createAppointmentId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `appointment-${Date.now()}-${Math.random()}`
  )
}

export default function BookingSection({
  draft,
  setDraft,
  appointments,
  onCreateAppointment,
  onNotify,
}: Props) {
  const [step, setStep] = useState(1)
  const [loadingTimes, setLoadingTimes] = useState(false)
  const [generated, setGenerated] = useState<Appointment | null>(null)
  const [availabilityTick, setAvailabilityTick] = useState(0)
  const confirmLock = useRef(false)

  const specialty = specialties.find(
    (item) => item.id === draft.specialtyId,
  )

  const doctor = doctors.find(
    (item) => item.id === draft.doctorId,
  )

  const filteredDoctors = useMemo(
    () =>
      doctors.filter(
        (item) => item.specialtyId === draft.specialtyId,
      ),
    [draft.specialtyId],
  )

  const times = useMemo(() => {
    const baseAvailability = getAvailability(
      draft.doctorId,
      draft.date,
      new Date(),
    )

    return baseAvailability.filter(
      (time) =>
        !isDuplicateActiveAppointment(
          appointments,
          draft.doctorId,
          draft.date,
          time,
        ),
    )
  }, [
    appointments,
    draft.doctorId,
    draft.date,
    availabilityTick,
  ])

  useEffect(() => {
    const timer = window.setInterval(
      () => setAvailabilityTick((value) => value + 1),
      60_000,
    )

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!draft.date || !draft.doctorId) {
      setLoadingTimes(false)
      return
    }

    setLoadingTimes(true)

    const timer = window.setTimeout(
      () => setLoadingTimes(false),
      450,
    )

    return () => window.clearTimeout(timer)
  }, [draft.date, draft.doctorId])

  useEffect(() => {
    const generatedMatchesDraft = Boolean(
      generated &&
        generated.specialtyId === draft.specialtyId &&
        generated.doctorId === draft.doctorId &&
        generated.date === draft.date &&
        generated.time === draft.time,
    )

    if (generated && !generatedMatchesDraft) {
      setGenerated(null)
      confirmLock.current = false
    }

    if (generatedMatchesDraft) {
      setStep(4)
      return
    }

    if (draft.time && draft.date && draft.doctorId) {
      setStep(4)
    } else if (draft.doctorId) {
      setStep(3)
    } else if (draft.specialtyId) {
      setStep(2)
    } else {
      setStep(1)
    }
  }, [
    draft.specialtyId,
    draft.doctorId,
    draft.date,
    draft.time,
    generated,
  ])

  useEffect(() => {
    if (generated || !draft.time) return

    const stillAvailable = times.includes(draft.time)

    if (!stillAvailable) {
      setDraft({
        ...draft,
        time: '',
      })

      onNotify(
        'Ese horario ya no está disponible. Seleccione otro.',
        'info',
      )
    }
  }, [
    appointments,
    draft,
    times,
    setDraft,
    onNotify,
    generated,
  ])

  const selectSpecialty = (id: string) => {
    confirmLock.current = false
    setGenerated(null)

    setDraft({
      specialtyId: id,
      doctorId: '',
      date: '',
      time: '',
    })

    setStep(2)

    onNotify(
      'Especialidad seleccionada',
      'success',
    )
  }

  const selectDoctor = (id: string) => {
    confirmLock.current = false
    setGenerated(null)

    setDraft({
      ...draft,
      doctorId: id,
      date: '',
      time: '',
    })

    setStep(3)

    onNotify(
      'Profesional seleccionado',
      'success',
    )
  }

  const selectDate = (date: string) => {
    confirmLock.current = false
    setGenerated(null)

    setDraft({
      ...draft,
      date,
      time: '',
    })
  }

  const selectTime = (time: string) => {
    if (
      isPastAppointmentSlot(
        draft.date,
        time,
      )
    ) {
      onNotify(
        'Ese horario ya pasó. Seleccione otro.',
        'error',
      )

      return
    }

    if (
      isDuplicateActiveAppointment(
        appointments,
        draft.doctorId,
        draft.date,
        time,
      )
    ) {
      onNotify(
        'Ese horario ya está reservado en este dispositivo.',
        'error',
      )

      return
    }

    confirmLock.current = false
    setGenerated(null)

    setDraft({
      ...draft,
      time,
    })

    setStep(4)
  }

  const confirm = () => {
    if (confirmLock.current) return

    if (
      !specialty ||
      !doctor ||
      !draft.date ||
      !draft.time
    ) {
      onNotify(
        'Complete todos los pasos antes de confirmar.',
        'error',
      )

      return
    }

    if (
      isPastAppointmentSlot(
        draft.date,
        draft.time,
      )
    ) {
      setDraft({
        ...draft,
        time: '',
      })

      setStep(3)

      onNotify(
        'El horario seleccionado ya pasó. Elija uno nuevo.',
        'error',
      )

      return
    }

    if (
      isDuplicateActiveAppointment(
        appointments,
        draft.doctorId,
        draft.date,
        draft.time,
      )
    ) {
      setDraft({
        ...draft,
        time: '',
      })

      setStep(3)

      onNotify(
        'Ese horario ya está reservado en este dispositivo.',
        'error',
      )

      return
    }

    confirmLock.current = true

    const appointment: Appointment = {
      ...draft,
      id: createAppointmentId(),
      code: `AV-${Math.floor(
        10000 + Math.random() * 90000,
      )}`,
      createdAt: new Date().toISOString(),
      status: 'upcoming',
    }

    onCreateAppointment(appointment)
    setGenerated(appointment)

    onNotify(
      'Cita reservada correctamente',
      'success',
    )
  }

  const resetBooking = () => {
    confirmLock.current = false

    setDraft({
      specialtyId: '',
      doctorId: '',
      date: '',
      time: '',
    })

    setGenerated(null)
    setStep(1)
  }

  return (
    <section
      className="booking-section"
      id="reservar"
    >
      <div className="container">

        <Reveal className="booking-intro">
          <span className="eyebrow eyebrow-light">
            Reserva inteligente
          </span>

          <h2>
            Reserve su cita en pocos pasos
          </h2>

          <p>
            Seleccione la especialidad,
            el profesional y el horario
            que mejor se adapte a sus
            necesidades.
          </p>
        </Reveal>

        <Reveal className="booking-app">

          <div
            className="booking-stepper"
            aria-label="Pasos de la reserva"
          >
            {[
              [1, 'Especialidad'],
              [2, 'Profesional'],
              [3, 'Fecha y hora'],
              [4, 'Confirmación'],
            ].map(([number, label]) => {
              const n = Number(number)

              const enabled =
                n === 1 ||
                (
                  n === 2 &&
                  Boolean(
                    draft.specialtyId,
                  )
                ) ||
                (
                  n === 3 &&
                  Boolean(
                    draft.doctorId,
                  )
                ) ||
                (
                  n === 4 &&
                  Boolean(
                    draft.time,
                  )
                )

              return (
                <button
                  type="button"
                  key={number}
                  disabled={!enabled}
                  aria-current={
                    step === n
                      ? 'step'
                      : undefined
                  }
                  className={`${
                    step === n
                      ? 'active'
                      : ''
                  } ${
                    step > n
                      ? 'done'
                      : ''
                  }`}
                  onClick={() =>
                    enabled &&
                    setStep(n)
                  }
                >
                  <span>
                    {step > n ? (
                      <Icon
                        name="check"
                        size={16}
                      />
                    ) : (
                      number
                    )}
                  </span>

                  <small>
                    {label}
                  </small>
                </button>
              )
            })}
          </div>

          <div className="booking-panel">

            {step === 1 && (
              <div className="booking-step-content">

                <div className="booking-step-title">
                  <span>
                    Paso 1 de 4
                  </span>

                  <h3>
                    Seleccione una especialidad
                  </h3>

                  <p>
                    Elija el área de atención
                    que necesita.
                  </p>
                </div>

                <div className="booking-choice-grid">
                  {specialties.map(
                    (item) => (
                      <button
                        type="button"
                        key={item.id}
                        className={`booking-choice-card ${
                          draft.specialtyId ===
                          item.id
                            ? 'selected'
                            : ''
                        }`}
                        aria-pressed={
                          draft.specialtyId ===
                          item.id
                        }
                        onClick={() =>
                          selectSpecialty(
                            item.id,
                          )
                        }
                      >

                        <span
                          aria-hidden="true"
                        >
                          <Icon
                            name={item.icon}
                            size={24}
                          />
                        </span>

                        <strong>
                          {item.name}
                        </strong>

                        <small>
                          {
                            item.shortDescription
                          }
                        </small>
                      </button>
                    ),
                  )}
                </div>

              </div>
            )}

            {step === 2 && (
              <div className="booking-step-content">

                <div className="booking-step-title">
                  <span>
                    Paso 2 de 4
                  </span>

                  <h3>
                    Elija su profesional
                  </h3>

                  <p>
                    Mostramos únicamente
                    especialistas de{' '}
                    {specialty?.name}.
                  </p>
                </div>

                <div className="booking-doctor-grid">
                  {filteredDoctors.map(
                    (item) => (
                      <button
                        type="button"
                        className={`booking-doctor-card ${
                          draft.doctorId ===
                          item.id
                            ? 'selected'
                            : ''
                        }`}
                        aria-pressed={
                          draft.doctorId ===
                          item.id
                        }
                        key={item.id}
                        onClick={() =>
                          selectDoctor(
                            item.id,
                          )
                        }
                      >
                        <img
                          src={item.photo}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          onError={(
                            event: SyntheticEvent<HTMLImageElement>,
                          ) =>
                            setImageFallback(
                              event.currentTarget,
                              item.name,
                            )
                          }
                        />

                        <div>
                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            {item.specialty}
                          </span>

                          <small>
                            {
                              item.experienceYears
                            }{' '}
                            años de experiencia
                          </small>

                          <b>
                            Consultar disponibilidad
                          </b>
                        </div>
                      </button>
                    ),
                  )}
                </div>

                <button
                  type="button"
                  className="back-link"
                  onClick={() =>
                    setStep(1)
                  }
                >
                  <Icon
                    name="arrow-left"
                    size={16}
                  />
                  Volver
                </button>

              </div>
            )}

            {step === 3 && (
              <div className="booking-step-content">

                <div className="booking-step-title">
                  <span>
                    Paso 3 de 4
                  </span>

                  <h3>
                    Seleccione fecha y hora
                  </h3>

                  <p>
                    Consulte los horarios
                    disponibles para el
                    profesional seleccionado.
                  </p>
                </div>

                <div className="calendar-time-layout">

                  <CustomCalendar
                    value={draft.date}
                    onChange={selectDate}
                  />

                  <div
                    className="times-panel"
                    aria-live="polite"
                  >
                    <h4>
                      Horarios disponibles
                    </h4>

                    {!draft.date ? (
                      <div className="empty-times">

                        <span
                          aria-hidden="true"
                        >
                          <Icon
                            name="clock"
                            size={30}
                          />
                        </span>

                        <p>
                          Seleccione una fecha
                          para consultar horarios.
                        </p>

                      </div>
                    ) : loadingTimes ? (
                      <div className="availability-loading">

                        <span
                          className="spinner"
                          aria-hidden="true"
                        />

                        <strong>
                          Consultando disponibilidad...
                        </strong>

                        <small>
                          Buscando los horarios
                          disponibles
                        </small>

                      </div>
                    ) : times.length === 0 ? (
                      <div className="empty-times">

                        <span
                          aria-hidden="true"
                        >
                          <Icon
                            name="clock"
                            size={30}
                          />
                        </span>

                        <strong>
                          Sin horarios disponibles
                        </strong>

                        <p>
                          Seleccione otra fecha
                          para continuar.
                        </p>

                      </div>
                    ) : (
                      <>
                        <div className="availability-success">
                          <Icon
                            name="check-circle"
                            size={16}
                          />

                          {' '}

                          {times.length}{' '}

                          {times.length === 1
                            ? 'horario disponible'
                            : 'horarios disponibles'}
                        </div>

                        <div className="times-grid">
                          {times.map(
                            (time) => (
                              <button
                                type="button"
                                className={
                                  draft.time ===
                                  time
                                    ? 'active'
                                    : ''
                                }
                                aria-pressed={
                                  draft.time ===
                                  time
                                }
                                key={time}
                                onClick={() =>
                                  selectTime(
                                    time,
                                  )
                                }
                              >
                                {time}
                              </button>
                            ),
                          )}
                        </div>

                        <p className="scarcity-note">
                          Los horarios disponibles
                          pueden variar según la
                          fecha y el profesional.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="back-link"
                  onClick={() =>
                    setStep(2)
                  }
                >
                  <Icon
                    name="arrow-left"
                    size={16}
                  />
                  Volver
                </button>

              </div>
            )}

            {step === 4 &&
              !generated && (
                <div className="booking-step-content confirmation-step">

                  <div className="booking-step-title">
                    <span>
                      Paso 4 de 4
                    </span>

                    <h3>
                      Revise y confirme
                    </h3>

                    <p>
                      Compruebe los detalles
                      antes de confirmar la
                      reserva.
                    </p>
                  </div>

                  <div className="booking-summary">

                    <div className="summary-doctor">

                      <img
                        src={doctor?.photo}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={(
                          event: SyntheticEvent<HTMLImageElement>,
                        ) =>
                          doctor &&
                          setImageFallback(
                            event.currentTarget,
                            doctor.name,
                          )
                        }
                      />

                      <div>
                        <span>
                          {specialty?.name}
                        </span>

                        <strong>
                          {doctor?.name}
                        </strong>

                        <small>
                          {
                            doctor?.experienceYears
                          }{' '}
                          años de experiencia
                        </small>
                      </div>
                    </div>

                    <div className="summary-detail-grid">

                      <div>
                        <span>
                          Fecha
                        </span>

                        <strong>
                          {formatDate(
                            draft.date,
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Hora
                        </span>

                        <strong>
                          {draft.time}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Modalidad
                        </span>

                        <strong>
                          Presencial
                        </strong>
                      </div>

                      <div>
                        <span>
                          Duración
                        </span>

                        <strong>
                          45 min aprox.
                        </strong>
                      </div>

                    </div>
                  </div>

                  <div className="local-confirm-notice">

                    <span
                      aria-hidden="true"
                    >
                      <Icon
                        name="info"
                        size={16}
                      />
                    </span>

                    <p>
                      Al confirmar, la cita se
                      guardará únicamente en este
                      dispositivo.
                    </p>

                  </div>

                  <div className="confirmation-actions">

                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={() =>
                        setStep(3)
                      }
                    >
                      Modificar
                    </button>

                    <button
                      type="button"
                      className="button button-primary"
                      onClick={confirm}
                    >
                      Confirmar cita
                    </button>

                  </div>
                </div>
              )}

            {step === 4 &&
              generated &&
              doctor &&
              specialty && (
                <div className="success-screen">

                  <div
                    className="success-ring"
                    aria-hidden="true"
                  >
                    <Icon
                      name="check-circle"
                      size={38}
                    />
                  </div>

                  <span className="success-label">
                    Reserva completada
                  </span>

                  <h3>
                    ¡Cita reservada correctamente!
                  </h3>

                  <p>
                    La reserva{' '}
                    <strong>
                      {generated.code}
                    </strong>{' '}
                    se guardó únicamente
                    en este navegador.
                  </p>

                  <div className="success-ticket">

                    <div>
                      <span>
                        Profesional
                      </span>

                      <strong>
                        {doctor.name}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Especialidad
                      </span>

                      <strong>
                        {specialty.name}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Fecha
                      </span>

                      <strong>
                        {formatDate(
                          generated.date,
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Hora
                      </span>

                      <strong>
                        {generated.time}
                      </strong>
                    </div>

                  </div>

                  <div className="success-actions">

                    <button
                      type="button"
                      onClick={() =>
                        void downloadAppointmentPDF(
                          generated,
                          doctor,
                          specialty,
                        )
                      }
                    >
                      Descargar PDF
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        downloadICS(
                          generated,
                          doctor,
                          specialty,
                        )
                      }
                    >
                      Descargar .ICS
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openGoogleCalendar(
                          generated,
                          doctor,
                          specialty,
                        )
                      }
                    >
                      Google Calendar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        shareAppointmentOnWhatsApp(
                          generated,
                          doctor,
                          specialty,
                        )
                      }
                    >
                      Compartir WhatsApp
                    </button>

                  </div>

                  <button
                    type="button"
                    className="button button-primary"
                    onClick={resetBooking}
                  >
                    Reservar otra cita
                  </button>

                </div>
              )}

          </div>
        </Reveal>
      </div>
    </section>
  )
}
