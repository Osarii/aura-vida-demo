import type { Appointment, AppointmentStatus, BookingDraft } from '../types'
import { doctors } from '../data/doctors'
import { specialties } from '../data/specialties'
import { reconcileAppointmentStatuses } from './appointments'
import { isPastAppointmentSlot, isValidDateKey, isValidTime, toCostaRicaDateKey } from './date'

const APPOINTMENTS_KEY = 'aura-vida-appointments'
const FAVORITES_KEY = 'aura-vida-favorites'
const DRAFT_KEY = 'aura-vida-booking-draft'

const emptyDraft: BookingDraft = {
  specialtyId: '',
  doctorId: '',
  date: '',
  time: '',
}

const appointmentStatuses = new Set<AppointmentStatus>([
  'upcoming',
  'cancelled',
  'completed',
])
const doctorIds = new Set(doctors.map((item) => item.id))
const specialtyIds = new Set(specialties.map((item) => item.id))

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // El almacenamiento puede estar deshabilitado o sin espacio.
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isAppointment(value: unknown): value is Appointment {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>

  return (
    isNonEmptyString(item.id) &&
    isNonEmptyString(item.code) &&
    isNonEmptyString(item.specialtyId) &&
    specialtyIds.has(item.specialtyId) &&
    isNonEmptyString(item.doctorId) &&
    doctorIds.has(item.doctorId) &&
    typeof item.date === 'string' &&
    isValidDateKey(item.date) &&
    typeof item.time === 'string' &&
    isValidTime(item.time) &&
    isNonEmptyString(item.createdAt) &&
    !Number.isNaN(Date.parse(item.createdAt)) &&
    typeof item.status === 'string' &&
    appointmentStatuses.has(item.status as AppointmentStatus)
  )
}

export function loadAppointments(): Appointment[] {
  const value = readJSON<unknown>(APPOINTMENTS_KEY, [])
  if (!Array.isArray(value)) return []

  const validated = value.filter(isAppointment)
  return reconcileAppointmentStatuses(validated)
}

export function saveAppointments(items: Appointment[]) {
  writeJSON(APPOINTMENTS_KEY, items)
}

export function loadFavorites(): string[] {
  const value = readJSON<unknown>(FAVORITES_KEY, [])
  if (!Array.isArray(value)) return []

  return [
    ...new Set(value.filter((item): item is string => typeof item === 'string' && doctorIds.has(item))),
  ]
}

export function saveFavorites(items: string[]) {
  writeJSON(FAVORITES_KEY, items)
}

export function loadDraft(): BookingDraft {
  const value = readJSON<Partial<BookingDraft>>(DRAFT_KEY, emptyDraft)

  const specialtyId =
    typeof value.specialtyId === 'string' && specialtyIds.has(value.specialtyId)
      ? value.specialtyId
      : ''

  const doctor =
    typeof value.doctorId === 'string'
      ? doctors.find((item) => item.id === value.doctorId && item.specialtyId === specialtyId)
      : undefined
  const doctorId = doctor?.id ?? ''

  const rawDate = typeof value.date === 'string' && isValidDateKey(value.date) ? value.date : ''
  const date = rawDate && rawDate >= toCostaRicaDateKey() ? rawDate : ''

  const rawTime = typeof value.time === 'string' && isValidTime(value.time) ? value.time : ''
  const time =
    doctorId && date && rawTime && !isPastAppointmentSlot(date, rawTime)
      ? rawTime
      : ''

  return { specialtyId, doctorId, date: doctorId ? date : '', time }
}

export function saveDraft(draft: BookingDraft) {
  writeJSON(DRAFT_KEY, draft)
}
