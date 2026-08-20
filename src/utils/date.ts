export const COSTA_RICA_TIME_ZONE = 'America/Costa_Rica'
const COSTA_RICA_OFFSET = '-06:00'

const dateKeyPattern = /^\d{4}-\d{2}-\d{2}$/
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/

export function isValidDateKey(value: string): boolean {
  if (!dateKeyPattern.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  )
}

export function isValidTime(value: string): boolean {
  return timePattern.test(value)
}

export function toLocalDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function toCostaRicaDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: COSTA_RICA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

export function getCostaRicaMinutes(date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: COSTA_RICA_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return Number(values.hour) * 60 + Number(values.minute)
}

export function getDayOfWeekInCostaRica(dateKey: string): number {
  if (!isValidDateKey(dateKey)) return -1
  const date = new Date(`${dateKey}T12:00:00${COSTA_RICA_OFFSET}`)
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: COSTA_RICA_TIME_ZONE,
    weekday: 'short',
  }).format(date)
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday)
}

export function appointmentDateTime(dateKey: string, time: string): Date | null {
  if (!isValidDateKey(dateKey) || !isValidTime(time)) return null
  const date = new Date(`${dateKey}T${time}:00${COSTA_RICA_OFFSET}`)
  return Number.isNaN(date.getTime()) ? null : date
}

export function isPastAppointmentSlot(
  dateKey: string,
  time: string,
  now = new Date(),
): boolean {
  const appointment = appointmentDateTime(dateKey, time)
  if (!appointment) return true
  return appointment.getTime() <= now.getTime()
}


export function isAppointmentFinished(
  dateKey: string,
  time: string,
  now = new Date(),
  durationMinutes = 45,
): boolean {
  const appointment = appointmentDateTime(dateKey, time)
  if (!appointment) return true
  const end = appointment.getTime() + durationMinutes * 60 * 1000
  return end <= now.getTime()
}

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function formatDate(dateKey: string): string {
  if (!isValidDateKey(dateKey)) return ''
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Intl.DateTimeFormat('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: COSTA_RICA_TIME_ZONE,
  }).format(new Date(Date.UTC(year, month - 1, day, 12)))
}
