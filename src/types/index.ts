export type Specialty = {
  id: string
  name: string
  icon: string
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
