import { useEffect, useMemo, useState } from 'react'
import CustomCalendar from '../components/CustomCalendar'
import Reveal from '../components/Reveal'
import { specialties } from '../data/specialties'
import { doctors } from '../data/doctors'
import { getAvailability } from '../data/appointments'
import type { Appointment, BookingDraft } from '../types'
import { formatDate } from '../utils/date'
import { downloadAppointmentPDF } from '../utils/pdf'
import {
  downloadICS,
  openGoogleCalendar,
  shareAppointmentOnWhatsApp,
} from '../utils/calendar'

type Props = {
  draft: BookingDraft
  setDraft: (draft: BookingDraft) => void
  onCreateAppointment: (appointment: Appointment) => void
  onNotify: (text: string, tone?: 'success' | 'error' | 'info') => void
}

export default function BookingSection({
  draft,
  setDraft,
  onCreateAppointment,
  onNotify,
}: Props) {
  const [step, setStep] = useState(1)
  const [loadingTimes, setLoadingTimes] = useState(false)
  const [generated, setGenerated] = useState<Appointment | null>(null)

  const specialty = specialties.find((item) => item.id === draft.specialtyId)
  const doctor = doctors.find((item) => item.id === draft.doctorId)

  const filteredDoctors = useMemo(
    () => doctors.filter((item) => item.specialtyId === draft.specialtyId),
    [draft.specialtyId],
  )

  const times = useMemo(
    () => getAvailability(draft.doctorId, draft.date),
    [draft.doctorId, draft.date],
  )

  useEffect(() => {
    if (!draft.date || !draft.doctorId) return
    setLoadingTimes(true)
    const timer = window.setTimeout(() => setLoadingTimes(false), 650)
    return () => window.clearTimeout(timer)
  }, [draft.date, draft.doctorId])

  useEffect(() => {
    if (draft.doctorId) setStep((current) => Math.max(current, 3))
    else if (draft.specialtyId) setStep((current) => Math.max(current, 2))
  }, [draft.specialtyId, draft.doctorId])

  const selectSpecialty = (id: string) => {
    setDraft({ specialtyId: id, doctorId: '', date: '', time: '' })
    setGenerated(null)
    setStep(2)
    onNotify('Especialidad seleccionada', 'success')
  }

  const selectDoctor = (id: string) => {
    setDraft({ ...draft, doctorId: id, date: '', time: '' })
    setGenerated(null)
    setStep(3)
    onNotify('Profesional seleccionado', 'success')
  }

  const selectDate = (date: string) => {
    setDraft({ ...draft, date, time: '' })
  }

  const selectTime = (time: string) => {
    setDraft({ ...draft, time })
    setStep(4)
  }

  const confirm = () => {
    if (!specialty || !doctor || !draft.date || !draft.time) {
      onNotify('Complete todos los pasos antes de confirmar.', 'error')
      return
    }

    const appointment: Appointment = {
      ...draft,
      id: crypto.randomUUID(),
      code: `AV-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'upcoming',
    }

    onCreateAppointment(appointment)
    setGenerated(appointment)
    onNotify('Cita demo reservada correctamente', 'success')
  }

  const resetBooking = () => {
    setDraft({ specialtyId: '', doctorId: '', date: '', time: '' })
    setGenerated(null)
    setStep(1)
  }

  return (
    <section className="booking-section" id="reservar">
      <div className="container">
        <Reveal className="booking-intro">
          <span className="eyebrow eyebrow-light">Reserva inteligente</span>
          <h2>Una experiencia de reserva que se siente real</h2>
          <p>
            Todo funciona únicamente en el navegador: datos mock, disponibilidad simulada
            y persistencia local para fines de demostración.
          </p>
        </Reveal>

        <Reveal className="booking-app">
          <div className="booking-stepper">
            {[
              [1, 'Especialidad'],
              [2, 'Profesional'],
              [3, 'Fecha y hora'],
              [4, 'Confirmación'],
            ].map(([number, label]) => (
              <button
                key={number}
                className={`${step === number ? 'active' : ''} ${step > Number(number) ? 'done' : ''}`}
                onClick={() => {
                  const n = Number(number)
                  if (n === 1) setStep(1)
                  if (n === 2 && draft.specialtyId) setStep(2)
                  if (n === 3 && draft.doctorId) setStep(3)
                  if (n === 4 && draft.time) setStep(4)
                }}
              >
                <span>{step > Number(number) ? '✓' : number}</span>
                <small>{label}</small>
              </button>
            ))}
          </div>

          <div className="booking-panel">
            {step === 1 && (
              <div className="booking-step-content">
                <div className="booking-step-title">
                  <span>Paso 1 de 4</span>
                  <h3>Seleccione una especialidad</h3>
                  <p>Elija el área de atención que necesita.</p>
                </div>
                <div className="booking-choice-grid">
                  {specialties.map((item) => (
                    <button
                      key={item.id}
                      className={`booking-choice-card ${draft.specialtyId === item.id ? 'selected' : ''}`}
                      onClick={() => selectSpecialty(item.id)}
                    >
                      <span>{item.icon}</span>
                      <strong>{item.name}</strong>
                      <small>{item.shortDescription}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step-content">
                <div className="booking-step-title">
                  <span>Paso 2 de 4</span>
                  <h3>Elija su profesional</h3>
                  <p>Mostramos únicamente especialistas de {specialty?.name}.</p>
                </div>
                <div className="booking-doctor-grid">
                  {filteredDoctors.map((item) => (
                    <button
                      className={`booking-doctor-card ${draft.doctorId === item.id ? 'selected' : ''}`}
                      key={item.id}
                      onClick={() => selectDoctor(item.id)}
                    >
                      <img src={item.photo} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.specialty}</span>
                        <small>★ {item.rating} · {item.experienceYears} años</small>
                        <b>Próxima: 09:30 a.m.</b>
                      </div>
                    </button>
                  ))}
                </div>
                <button className="back-link" onClick={() => setStep(1)}>← Volver</button>
              </div>
            )}

            {step === 3 && (
              <div className="booking-step-content">
                <div className="booking-step-title">
                  <span>Paso 3 de 4</span>
                  <h3>Seleccione fecha y hora</h3>
                  <p>La disponibilidad cambia de forma simulada según el profesional y la fecha.</p>
                </div>

                <div className="calendar-time-layout">
                  <CustomCalendar value={draft.date} onChange={selectDate} />

                  <div className="times-panel">
                    <h4>Horarios disponibles</h4>
                    {!draft.date ? (
                      <div className="empty-times">
                        <span>◷</span>
                        <p>Seleccione una fecha para consultar horarios.</p>
                      </div>
                    ) : loadingTimes ? (
                      <div className="availability-loading">
                        <span className="spinner" />
                        <strong>Consultando disponibilidad...</strong>
                        <small>Simulación de carga frontend</small>
                      </div>
                    ) : (
                      <>
                        <div className="availability-success">
                          ✓ {times.length} horarios disponibles
                        </div>
                        <div className="times-grid">
                          {times.map((time) => (
                            <button
                              className={draft.time === time ? 'active' : ''}
                              key={time}
                              onClick={() => selectTime(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        <p className="scarcity-note">
                          Algunos horarios se muestran ocupados de forma ficticia para hacer el demo más realista.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <button className="back-link" onClick={() => setStep(2)}>← Volver</button>
              </div>
            )}

            {step === 4 && !generated && (
              <div className="booking-step-content confirmation-step">
                <div className="booking-step-title">
                  <span>Paso 4 de 4</span>
                  <h3>Revise y confirme</h3>
                  <p>Compruebe los detalles antes de crear la reserva ficticia.</p>
                </div>

                <div className="booking-summary-premium">
                  <div className="summary-doctor">
                    <img src={doctor?.photo} alt={doctor?.name ?? ''} />
                    <div>
                      <span>{specialty?.name}</span>
                      <strong>{doctor?.name}</strong>
                      <small>★ {doctor?.rating} · Especialista</small>
                    </div>
                  </div>
                  <div className="summary-detail-grid">
                    <div><span>Fecha</span><strong>{formatDate(draft.date)}</strong></div>
                    <div><span>Hora</span><strong>{draft.time}</strong></div>
                    <div><span>Modalidad</span><strong>Presencial · Demo</strong></div>
                    <div><span>Duración</span><strong>45 min aprox.</strong></div>
                  </div>
                </div>

                <div className="demo-confirm-notice">
                  <span>i</span>
                  <p>Al confirmar, la cita se guardará únicamente en LocalStorage de este navegador.</p>
                </div>

                <div className="confirmation-actions">
                  <button className="button button-secondary" onClick={() => setStep(3)}>
                    Modificar
                  </button>
                  <button className="button button-primary" onClick={confirm}>
                    Confirmar cita demo
                  </button>
                </div>
              </div>
            )}

            {step === 4 && generated && doctor && specialty && (
              <div className="success-screen">
                <div className="success-ring">✓</div>
                <span className="success-label">Reserva completada</span>
                <h3>¡Cita reservada correctamente!</h3>
                <p>
                  La reserva <strong>{generated.code}</strong> se guardó únicamente en este navegador.
                </p>

                <div className="success-ticket">
                  <div>
                    <span>Profesional</span>
                    <strong>{doctor.name}</strong>
                  </div>
                  <div>
                    <span>Especialidad</span>
                    <strong>{specialty.name}</strong>
                  </div>
                  <div>
                    <span>Fecha</span>
                    <strong>{formatDate(generated.date)}</strong>
                  </div>
                  <div>
                    <span>Hora</span>
                    <strong>{generated.time}</strong>
                  </div>
                </div>

                <div className="success-actions">
                  <button onClick={() => downloadAppointmentPDF(generated, doctor, specialty)}>Descargar PDF</button>
                  <button onClick={() => downloadICS(generated, doctor, specialty)}>Descargar .ICS</button>
                  <button onClick={() => openGoogleCalendar(generated, doctor, specialty)}>Google Calendar</button>
                  <button onClick={() => shareAppointmentOnWhatsApp(generated, doctor, specialty)}>Compartir WhatsApp</button>
                </div>

                <button className="button button-primary" onClick={resetBooking}>
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
