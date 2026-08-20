export type IconName =
  | 'heart'
  | 'heart-filled'
  | 'heart-pulse'
  | 'sparkle'
  | 'home'
  | 'target'
  | 'clock'
  | 'search'
  | 'chevron-left'
  | 'chevron-right'
  | 'arrow-left'
  | 'arrow-right'
  | 'check'
  | 'check-circle'
  | 'close'
  | 'map-pin'
  | 'phone'
  | 'message'
  | 'mail'
  | 'info'
  | 'alert'
  | 'calendar'
  | 'calendar-check'
  | 'file-text'
  | 'download'
  | 'external-link'
  | 'stethoscope'
  | 'baby'
  | 'scan'
  | 'plus-circle'
  | 'shield'
  | 'users'

export type Specialty = {
  id: string
  name: string
  icon: IconName
  shortDescription: string
  description: string
}

export type Doctor = {
  id: string
  name: string
  specialtyId: string
  specialty: string
  photo: string
  experienceYears: number
  bio: string
  education: string[]
  languages: string[]
}


export type BookingDraft = {
  specialtyId: string
  doctorId: string
  date: string
  time: string
}

export type AppointmentStatus = 'upcoming' | 'cancelled' | 'completed'

export type Appointment = BookingDraft & {
  id: string
  code: string
  createdAt: string
  status: AppointmentStatus
}

export type ToastMessage = {
  id: string
  text: string
  tone: 'success' | 'error' | 'info'
}
