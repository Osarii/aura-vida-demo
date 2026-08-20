import type { Appointment, Doctor, Specialty } from '../types'
import { formatDate } from './date'

export async function downloadAppointmentPDF(
  appointment: Appointment,
  doctor: Doctor,
  specialty: Specialty,
) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('AURA & VIDA', 20, 24)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Comprobante de reserva', 20, 32)

  doc.setDrawColor(24, 81, 73)
  doc.line(20, 39, 190, 39)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('Confirmación de cita', 20, 52)

  const status =
    appointment.status === 'cancelled'
      ? 'Cancelada'
      : appointment.status === 'completed'
        ? 'Completada'
        : 'Confirmada'

  const rows = [
    ['Reserva', appointment.code],
    ['Especialidad', specialty.name],
    ['Profesional', doctor.name],
    ['Fecha', formatDate(appointment.date)],
    ['Hora', appointment.time],
    ['Estado', status],
  ]

  let y = 68
  doc.setFontSize(11)

  rows.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold')
    doc.text(`${label}:`, 20, y)
    doc.setFont('helvetica', 'normal')
    doc.text(String(value), 58, y)
    y += 12
  })

  doc.setFontSize(9)
  doc.setTextColor(100)
  doc.text(
    'Conserve este comprobante como referencia de su reserva.',
    20,
    y + 12,
    { maxWidth: 170 },
  )

  doc.save(`Aura-Vida-${appointment.code}.pdf`)
}
