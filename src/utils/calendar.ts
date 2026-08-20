import type { Appointment, Doctor, Specialty } from '../types'
import { formatDate } from './date'

export function downloadICS(
  appointment: Appointment,
  doctor: Doctor,
  specialty: Specialty,
) {
  const start = new Date(`${appointment.date}T${appointment.time}:00`)
  const end = new Date(start.getTime() + 45 * 60 * 1000)

  const stamp = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, 'Z')

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aura Vida Demo//ES',
    'BEGIN:VEVENT',
    `UID:${appointment.code}@aurayvida.demo`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:Cita demo - ${specialty.name}`,
    `DESCRIPTION:${doctor.name} - Reserva ${appointment.code} - DEMO`,
    'LOCATION:Aura & Vida - ubicación demo',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `Aura-Vida-${appointment.code}.ics`
  anchor.click()
  URL.revokeObjectURL(url)
}

export function openGoogleCalendar(
  appointment: Appointment,
  doctor: Doctor,
  specialty: Specialty,
) {
  const start = new Date(`${appointment.date}T${appointment.time}:00`)
  const end = new Date(start.getTime() + 45 * 60 * 1000)
  const compact = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Cita demo - ${specialty.name}`,
    dates: `${compact(start)}/${compact(end)}`,
    details: `${doctor.name} · Reserva ${appointment.code} · Demo frontend`,
    location: 'Aura & Vida · ubicación demo',
  })
  window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank', 'noopener,noreferrer')
}

export function shareAppointmentOnWhatsApp(
  appointment: Appointment,
  doctor: Doctor,
  specialty: Specialty,
) {
  const message = [
    'Aura & Vida — Confirmación de cita demo',
    `Reserva: ${appointment.code}`,
    `Especialidad: ${specialty.name}`,
    `Profesional: ${doctor.name}`,
    `Fecha: ${formatDate(appointment.date)}`,
    `Hora: ${appointment.time}`,
    '',
    'Esta es una demostración frontend.',
  ].join('\n')

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer',
  )
}
