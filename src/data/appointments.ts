import { getDayOfWeekInCostaRica, isPastAppointmentSlot } from '../utils/date'

const weekdayTimes = ['08:00', '09:30', '11:00', '13:30', '15:00', '16:30']
const saturdayTimes = ['08:00', '09:30', '11:00']

export function getAvailability(
  doctorId: string,
  date: string,
  now = new Date(),
): string[] {
  if (!doctorId || !date) return []

  const weekday = getDayOfWeekInCostaRica(date)
  if (weekday < 0 || weekday === 0) return []

  const candidates = weekday === 6 ? saturdayTimes : weekdayTimes
  const seed = [...`${doctorId}-${date}`].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  )

  const filtered = candidates.filter((_, index) => (seed + index * 7) % 4 !== 0)
  const seededAvailability = filtered.length >= 2 ? filtered : candidates.slice(0, 3)

  return seededAvailability.filter((time) => !isPastAppointmentSlot(date, time, now))
}
