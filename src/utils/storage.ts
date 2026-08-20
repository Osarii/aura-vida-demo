import type { Appointment, BookingDraft } from '../types'

const APPOINTMENTS_KEY = 'aura-vida-demo-appointments'
const FAVORITES_KEY = 'aura-vida-demo-favorites'
const DRAFT_KEY = 'aura-vida-demo-booking-draft'

export function loadAppointments(): Appointment[] {
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) ?? '[]') as Appointment[]
  } catch {
    return []
  }
}

export function saveAppointments(items: Appointment[]) {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(items))
}

export function loadFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]') as string[]
  } catch {
    return []
  }
}

export function saveFavorites(items: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
}

export function loadDraft(): BookingDraft {
  try {
    return JSON.parse(
      localStorage.getItem(DRAFT_KEY) ??
        '{"specialtyId":"","doctorId":"","date":"","time":""}',
    ) as BookingDraft
  } catch {
    return { specialtyId: '', doctorId: '', date: '', time: '' }
  }
}

export function saveDraft(draft: BookingDraft) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

export function clearDemoStorage() {
  localStorage.removeItem(APPOINTMENTS_KEY)
  localStorage.removeItem(FAVORITES_KEY)
  localStorage.removeItem(DRAFT_KEY)
}
