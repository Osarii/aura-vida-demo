import type { Appointment } from '../types'
import { appointmentDateTime, isAppointmentFinished } from './date'

export function getEffectiveAppointmentStatus(
  appointment: Appointment,
  now = new Date(),
): Appointment['status'] {
  if (appointment.status !== 'upcoming') return appointment.status
  return isAppointmentFinished(appointment.date, appointment.time, now)
    ? 'completed'
    : 'upcoming'
}

export function reconcileAppointmentStatuses(
  appointments: Appointment[],
  now = new Date(),
): Appointment[] {
  return appointments.map((appointment) => {
    const status = getEffectiveAppointmentStatus(appointment, now)
    return status === appointment.status ? appointment : { ...appointment, status }
  })
}

export function hasAppointmentStatusChanges(
  before: Appointment[],
  after: Appointment[],
): boolean {
  if (before.length !== after.length) return true
  return before.some((item, index) => item.status !== after[index]?.status)
}

export function isDuplicateActiveAppointment(
  appointments: Appointment[],
  doctorId: string,
  date: string,
  time: string,
  now = new Date(),
): boolean {
  return appointments.some((appointment) => {
    const active = getEffectiveAppointmentStatus(appointment, now) === 'upcoming'
    return (
      active &&
      appointment.doctorId === doctorId &&
      appointment.date === date &&
      appointment.time === time
    )
  })
}

export function sortAppointmentsNewestFirst(items: Appointment[]): Appointment[] {
  return [...items].sort((a, b) => {
    const aDate = appointmentDateTime(a.date, a.time)?.getTime() ?? 0
    const bDate = appointmentDateTime(b.date, b.time)?.getTime() ?? 0
    return bDate - aDate
  })
}
