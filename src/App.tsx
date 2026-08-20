import { useCallback, useState } from 'react'
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
import TestimonialsSection from './sections/TestimonialsSection'
import ContactSection from './sections/ContactSection'
import FinalCTA from './sections/FinalCTA'
import type { Appointment, BookingDraft, Doctor, ToastMessage } from './types'
import {
  clearDemoStorage,
  loadAppointments,
  loadDraft,
  loadFavorites,
  saveAppointments,
  saveDraft,
  saveFavorites,
} from './utils/storage'
import { useLocalStorageState } from './hooks/useLocalStorageState'

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
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, text, tone }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id))
    }, 3200)
  }, [])

  const toggleFavorite = (doctorId: string) => {
    setFavorites((current) => {
      const exists = current.includes(doctorId)
      notify(exists ? 'Profesional eliminado de favoritos' : 'Profesional guardado en favoritos', 'success')
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
    notify('Cita demo cancelada', 'info')
  }

  const resetDemo = () => {
    clearDemoStorage()
    setAppointments([])
    setFavorites([])
    setDraft({ specialtyId: '', doctorId: '', date: '', time: '' })
    setAppointmentsOpen(false)
    notify('Demo restablecido correctamente', 'success')
  }

  const reserveSpecialty = (specialtyId: string) => {
    setDraft({ specialtyId, doctorId: '', date: '', time: '' })
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
    notify('Especialidad precargada en la reserva', 'success')
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

  return (
    <>
      <Header
        appointmentCount={appointments.filter((item) => item.status === 'upcoming').length}
        onOpenAppointments={() => setAppointmentsOpen(true)}
        onResetDemo={resetDemo}
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
          onCreateAppointment={createAppointment}
          onNotify={notify}
        />
        <TestimonialsSection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer onSocialClick={(network) => notify(`${network}: enlace demo`, 'info')} />

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
