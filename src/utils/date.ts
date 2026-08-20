export function toLocalDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDate(dateKey: string): string {
  if (!dateKey) return ''
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Intl.DateTimeFormat('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

export function formatShortDate(dateKey: string): string {
  if (!dateKey) return ''
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Intl.DateTimeFormat('es-CR', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(year, month - 1, day))
}

export function isPastDate(dateKey: string): boolean {
  if (!dateKey) return false
  const today = toLocalDateKey(new Date())
  return dateKey < today
}
