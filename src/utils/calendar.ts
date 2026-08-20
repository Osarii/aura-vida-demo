import type { Appointment, Doctor, Specialty } from '../types'
import { formatDate } from './date'

const COSTA_RICA_OFFSET = '-06:00'

function stampUTC(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

function escapeICS(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

function getAppointmentDates(appointment: Appointment) {
  const start = new Date(`${appointment.date}T${appointment.time}:00${COSTA_RICA_OFFSET}`)
  const end = new Date(start.getTime() + 45 * 60 * 1000)
  return { start, end }
}

export function downloadICS(
  appointment: Appointment,
  doctor: Doctor,
  specialty: Specialty,
) {
  const { start, end } = getAppointmentDates(appointment)

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aura Vida//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeICS(appointment.code)}@aurayvida.local`,
    `DTSTAMP:${stampUTC(new Date())}`,
    `DTSTART:${stampUTC(start)}`,
    `DTEND:${stampUTC(end)}`,
    `SUMMARY:${escapeICS(`Cita - ${specialty.name}`)}`,
    `DESCRIPTION:${escapeICS(`${doctor.name} - Reserva ${appointment.code}`)}`,
    'LOCATION:Aura & Vida',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `Aura-Vida-${appointment.code}.ics`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

export function openGoogleCalendar(
  appointment: Appointment,
  doctor: Doctor,
  specialty: Specialty,
) {
  const { start, end } = getAppointmentDates(appointment)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Cita - ${specialty.name}`,
    dates: `${stampUTC(start)}/${stampUTC(end)}`,
    details: `${doctor.name} · Reserva ${appointment.code}`,
    location: 'Aura & Vida',
    ctz: 'America/Costa_Rica',
  })

  window.open(
    `https://calendar.google.com/calendar/render?${params.toString()}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export function shareAppointmentOnWhatsApp(
  appointment: Appointment,
  doctor: Doctor,
  specialty: Specialty,
) {
  const message = [
    'Aura & Vida — Confirmación de cita',
    `Reserva: ${appointment.code}`,
    `Especialidad: ${specialty.name}`,
    `Profesional: ${doctor.name}`,
    `Fecha: ${formatDate(appointment.date)}`,
    `Hora: ${appointment.time}`,
  ].join('\n')

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer',
  )
}
