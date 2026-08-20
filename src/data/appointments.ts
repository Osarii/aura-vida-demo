export const baseTimes = ['08:00', '09:30', '11:00', '13:30', '15:00', '16:30']

export function getAvailability(doctorId: string, date: string): string[] {
  if (!doctorId || !date) return []

  const seed = [...`${doctorId}-${date}`].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const filtered = baseTimes.filter((_, index) => (seed + index * 7) % 4 !== 0)
  return filtered.length >= 2 ? filtered : baseTimes.slice(0, 3)
}
