import Modal from './Modal'
import Icon from './Icon'
import type { Appointment } from '../types'
import { doctors } from '../data/doctors'
import { specialties } from '../data/specialties'
import { formatDate, appointmentDateTime } from '../utils/date'
import { downloadAppointmentPDF } from '../utils/pdf'
import {
  downloadICS,
  openGoogleCalendar,
  shareAppointmentOnWhatsApp,
} from '../utils/calendar'

type Props = {
  isOpen: boolean
  onClose: () => void
  appointments: Appointment[]
  onCancel: (id: string) => void
}

function sortByDate(items: Appointment[], direction: 'asc' | 'desc') {
  return [...items].sort((a, b) => {
    const aTime = appointmentDateTime(a.date, a.time)?.getTime() ?? 0
    const bTime = appointmentDateTime(b.date, b.time)?.getTime() ?? 0
    return direction === 'asc' ? aTime - bTime : bTime - aTime
  })
}

export default function MyAppointmentsModal({
  isOpen,
  onClose,
  appointments,
  onCancel,
}: Props) {
  const upcoming = sortByDate(
    appointments.filter((item) => item.status === 'upcoming'),
    'asc',
  )
  const history = sortByDate(
    appointments.filter((item) => item.status !== 'upcoming'),
    'desc',
  )

  const renderCard = (appointment: Appointment) => {
    const doctor = doctors.find((item) => item.id === appointment.doctorId)
    const specialty = specialties.find((item) => item.id === appointment.specialtyId)
    if (!doctor || !specialty) return null

    return (
      <article className="appointment-card" key={appointment.id}>
        <div className="appointment-card-top">
          <div>
            <span className={`status-pill status-${appointment.status}`}>
              {appointment.status === 'upcoming'
                ? 'Próxima'
                : appointment.status === 'cancelled'
                  ? 'Cancelada'
                  : 'Completada'}
            </span>
            <h4>{doctor.name}</h4>
            <p>{specialty.name}</p>
          </div>
          <strong>{appointment.code}</strong>
        </div>

        <div className="appointment-date">
          <span>{formatDate(appointment.date)}</span>
          <b>{appointment.time}</b>
        </div>

        <div className="appointment-actions">
          <button type="button" onClick={() => void downloadAppointmentPDF(appointment, doctor, specialty)}>
            <Icon name="file-text" size={16} /> PDF
          </button>
          <button type="button" onClick={() => downloadICS(appointment, doctor, specialty)}>
            <Icon name="calendar" size={16} /> .ICS
          </button>
          <button type="button" onClick={() => openGoogleCalendar(appointment, doctor, specialty)}>
            <Icon name="external-link" size={16} /> Google Calendar
          </button>
          <button type="button" onClick={() => shareAppointmentOnWhatsApp(appointment, doctor, specialty)}>
            <Icon name="message" size={16} /> WhatsApp
          </button>
          {appointment.status === 'upcoming' && (
            <button type="button" className="danger-link" onClick={() => onCancel(appointment.id)}>
              Cancelar
            </button>
          )}
        </div>
      </article>
    )
  }

  return (
    <Modal isOpen={isOpen} title="Mis citas" onClose={onClose} wide>
      <div className="storage-notice">
        <span aria-hidden="true"><Icon name="info" size={16} /></span>
        <p>Las citas guardadas aquí permanecen únicamente en este dispositivo.</p>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state">
          <div aria-hidden="true"><Icon name="calendar" size={34} /></div>
          <h4>Todavía no hay citas</h4>
          <p>Complete el flujo de reserva para crear la primera.</p>
        </div>
      ) : (
        <>
          <h4 className="subsection-title">Próximas</h4>
          <div className="appointment-list">
            {upcoming.length ? upcoming.map(renderCard) : <p className="muted">No hay citas próximas.</p>}
          </div>

          <h4 className="subsection-title">Historial</h4>
          <div className="appointment-list">
            {history.length ? history.map(renderCard) : <p className="muted">Todavía no hay historial.</p>}
          </div>
        </>
      )}
    </Modal>
  )
}
