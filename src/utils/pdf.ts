import { jsPDF } from 'jspdf'
import type { Appointment, Doctor, Specialty } from '../types'
import { formatDate } from './date'

export function downloadAppointmentPDF(
  appointment: Appointment,
  doctor: Doctor,
  specialty: Specialty,
) {
  const doc = new jsPDF()

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('AURA & VIDA', 20, 24)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Centro medico - comprobante DEMO', 20, 32)

  doc.setDrawColor(24, 81, 73)
  doc.line(20, 39, 190, 39)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('Confirmacion de cita', 20, 52)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')

  const rows = [
    ['Reserva', appointment.code],
    ['Especialidad', specialty.name],
    ['Profesional', doctor.name],
    ['Fecha', formatDate(appointment.date)],
    ['Hora', appointment.time],
    ['Estado', appointment.status === 'cancelled' ? 'Cancelada' : 'Confirmada'],
  ]

  let y = 68
  rows.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold')
    doc.text(`${label}:`, 20, y)
    doc.setFont('helvetica', 'normal')
    doc.text(value, 58, y)
    y += 12
  })

  doc.setFontSize(9)
  doc.setTextColor(100)
  doc.text(
    'Este documento corresponde a una demostracion frontend. No representa una cita medica real.',
    20,
    y + 12,
    { maxWidth: 170 },
  )

  doc.save(`Aura-Vida-${appointment.code}.pdf`)
}
