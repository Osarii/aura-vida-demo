import type { Appointment, BookingDraft } from '../types'

const APPOINTMENTS_KEY = 'aura-vida-appointments'
const FAVORITES_KEY = 'aura-vida-favorites'
const DRAFT_KEY = 'aura-vida-booking-draft'

const emptyDraft: BookingDraft = {
  specialtyId: '',
  doctorId: '',
  date: '',
  time: '',
}

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

export function loadAppointments(): Appointment[] {
  const value = readJSON<unknown>(APPOINTMENTS_KEY, [])
  return Array.isArray(value) ? (value as Appointment[]) : []
}

export function saveAppointments(items: Appointment[]) {
  writeJSON(APPOINTMENTS_KEY, items)
}

export function loadFavorites(): string[] {
  const value = readJSON<unknown>(FAVORITES_KEY, [])
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

export function saveFavorites(items: string[]) {
  writeJSON(FAVORITES_KEY, items)
}

export function loadDraft(): BookingDraft {
  const value = readJSON<Partial<BookingDraft>>(DRAFT_KEY, emptyDraft)
  return {
    specialtyId: typeof value.specialtyId === 'string' ? value.specialtyId : '',
    doctorId: typeof value.doctorId === 'string' ? value.doctorId : '',
    date: typeof value.date === 'string' ? value.date : '',
    time: typeof value.time === 'string' ? value.time : '',
  }
}

export function saveDraft(draft: BookingDraft) {
  writeJSON(DRAFT_KEY, draft)
}
