import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ToastStack from './components/ToastStack'
import MyAppointmentsModal from './components/MyAppointmentsModal'
import HeroSection from './sections/HeroSection'
import StatsSection from './sections/StatsSection'
import BenefitsSection from './sections/BenefitsSection'
import SpecialtiesSection from './sections/SpecialtiesSection'
import BookingSection from './sections/BookingSection'
import DoctorsSection from './sections/DoctorsSection'
import CarePrinciplesSection from './sections/CarePrinciplesSection'
import ContactSection from './sections/ContactSection'
import FinalCTA from './sections/FinalCTA'
import type { Appointment, BookingDraft, Doctor, ToastMessage } from './types'
import {
  loadAppointments,
  loadDraft,
  loadFavorites,
  saveAppointments,
  saveDraft,
  saveFavorites,
} from './utils/storage'
import {
  hasAppointmentStatusChanges,
  reconcileAppointmentStatuses,
} from './utils/appointments'
import { useLocalStorageState } from './hooks/useLocalStorageState'

function createToastId() {
  return globalThis.crypto?.randomUUID?.() ?? `toast-${Date.now()}-${Math.random()}`
}

export default function App() {
  const [appointments, setAppointments] = useLocalStorageState<Appointment[]>(
    loadAppointments,
    saveAppointments,
  )
  const [favorites, setFavorites] = useLocalStorageState<string[]>(
    loadFavorites,
    saveFavorites,
  )
  const [draft, setDraft] = useLocalStorageState<BookingDraft>(loadDraft, saveDraft)
  const [appointmentsOpen, setAppointmentsOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const notify = useCallback((text: string, tone: ToastMessage['tone'] = 'info') => {
    const id = createToastId()
    setToasts((current) => [...current, { id, text, tone }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id))
    }, 3200)
  }, [])

  useEffect(() => {
    const reconcile = () => {
      setAppointments((current) => {
        const next = reconcileAppointmentStatuses(current)
        return hasAppointmentStatusChanges(current, next) ? next : current
      })
    }

    reconcile()
    const timer = window.setInterval(reconcile, 60_000)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') reconcile()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [setAppointments])

  const toggleFavorite = (doctorId: string) => {
    setFavorites((current) => {
      const exists = current.includes(doctorId)
      notify(
        exists ? 'Profesional eliminado de favoritos' : 'Profesional guardado en favoritos',
        'success',
      )
      return exists ? current.filter((id) => id !== doctorId) : [...current, doctorId]
    })
  }

  const createAppointment = (appointment: Appointment) => {
    setAppointments((current) => [appointment, ...current])
  }

  const cancelAppointment = (id: string) => {
    setAppointments((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: 'cancelled' as const } : item,
      ),
    )
    notify('Cita cancelada', 'info')
  }

  const reserveSpecialty = (specialtyId: string) => {
    setDraft({ specialtyId, doctorId: '', date: '', time: '' })
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
    notify('Especialidad seleccionada para la reserva', 'success')
  }

  const reserveDoctor = (doctor: Doctor) => {
    setDraft({
      specialtyId: doctor.specialtyId,
      doctorId: doctor.id,
      date: '',
      time: '',
    })
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
    notify(`${doctor.name} fue preseleccionado`, 'success')
  }

  const upcomingCount = appointments.filter((item) => item.status === 'upcoming').length

  return (
    <>
      <Header
        appointmentCount={upcomingCount}
        onOpenAppointments={() => setAppointmentsOpen(true)}
      />
      <main>
        <HeroSection />
        <StatsSection />
        <BenefitsSection />
        <SpecialtiesSection onReserveSpecialty={reserveSpecialty} />
        <DoctorsSection
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onReserveDoctor={reserveDoctor}
        />
        <BookingSection
          draft={draft}
          setDraft={setDraft}
          appointments={appointments}
          onCreateAppointment={createAppointment}
          onNotify={notify}
        />
        <CarePrinciplesSection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />

      <MyAppointmentsModal
        isOpen={appointmentsOpen}
        onClose={() => setAppointmentsOpen(false)}
        appointments={appointments}
        onCancel={cancelAppointment}
      />

      <ToastStack items={toasts} />
    </>
  )
}
