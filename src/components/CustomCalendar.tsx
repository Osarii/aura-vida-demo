import { useMemo, useState } from 'react'
import { getDayOfWeekInCostaRica, toCostaRicaDateKey } from '../utils/date'

type Props = {
  value: string
  onChange: (value: string) => void
}

const monthFormatter = new Intl.DateTimeFormat('es-CR', {
  month: 'long',
  year: 'numeric',
})

function dateKeyFromParts(year: number, monthIndex: number, day: number) {
  return `${year}-${`${monthIndex + 1}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}`
}

export default function CustomCalendar({ value, onChange }: Props) {
  const todayKey = toCostaRicaDateKey()
  const initialKey = value || todayKey
  const [initialYear, initialMonth] = initialKey.split('-').map(Number)

  const [cursor, setCursor] = useState(
    new Date(initialYear, initialMonth - 1, 1, 12),
  )

  const days = useMemo(() => {
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const firstKey = dateKeyFromParts(year, month, 1)
    const firstWeekday = getDayOfWeekInCostaRica(firstKey)
    const weekday = (firstWeekday + 6) % 7
    const total = new Date(year, month + 1, 0).getDate()
    const cells: Array<number | null> = Array.from({ length: weekday }, () => null)
    for (let day = 1; day <= total; day += 1) cells.push(day)
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [cursor])

  const [todayYear, todayMonth] = todayKey.split('-').map(Number)
  const currentMonthStart = new Date(todayYear, todayMonth - 1, 1, 12)
  const canGoPrevious = cursor > currentMonthStart
  const maxMonthStart = new Date(todayYear, todayMonth - 1 + 6, 1, 12)
  const canGoNext = cursor < maxMonthStart

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <button
          type="button"
          className="icon-button"
          aria-label="Mes anterior"
          disabled={!canGoPrevious}
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1, 12))
          }
        >
          ←
        </button>
        <strong>{monthFormatter.format(cursor)}</strong>
        <button
          type="button"
          className="icon-button"
          aria-label="Mes siguiente"
          disabled={!canGoNext}
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1, 12))
          }
        >
          →
        </button>
      </div>

      <div className="calendar-weekdays" aria-hidden="true">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          if (!day) return <span className="calendar-empty" key={`empty-${index}`} />

          const key = dateKeyFromParts(cursor.getFullYear(), cursor.getMonth(), day)
          const weekday = getDayOfWeekInCostaRica(key)
          const disabled = key < todayKey || weekday === 0
          const active = value === key
          const [year, month] = key.split('-').map(Number)
          const displayDate = new Date(year, month - 1, day, 12)

          return (
            <button
              type="button"
              key={key}
              className={active ? 'active' : ''}
              disabled={disabled}
              aria-pressed={active}
              aria-label={new Intl.DateTimeFormat('es-CR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              }).format(displayDate)}
              onClick={() => onChange(key)}
            >
              {day}
            </button>
          )
        })}
      </div>
      <p className="calendar-note">Los domingos no se muestran como días de atención.</p>
    </div>
  )
}
