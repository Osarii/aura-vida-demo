import { useMemo, useState } from 'react'
import { toLocalDateKey } from '../utils/date'

type Props = {
  value: string
  onChange: (value: string) => void
}

const monthFormatter = new Intl.DateTimeFormat('es-CR', {
  month: 'long',
  year: 'numeric',
})

export default function CustomCalendar({ value, onChange }: Props) {
  const initial = value ? new Date(`${value}T12:00:00`) : new Date()
  const [cursor, setCursor] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1),
  )

  const todayKey = toLocalDateKey(new Date())

  const days = useMemo(() => {
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const firstDay = new Date(year, month, 1)
    const weekday = (firstDay.getDay() + 6) % 7
    const total = new Date(year, month + 1, 0).getDate()
    const cells: Array<Date | null> = Array.from({ length: weekday }, () => null)
    for (let day = 1; day <= total; day += 1) cells.push(new Date(year, month, day))
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [cursor])

  const now = new Date()
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const canGoPrevious = cursor > currentMonthStart
  const maxMonthStart = new Date(now.getFullYear(), now.getMonth() + 6, 1)
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
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
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
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
          }
        >
          →
        </button>
      </div>

      <div className="calendar-weekdays">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((date, index) => {
          if (!date) return <span className="calendar-empty" key={`empty-${index}`} />
          const key = toLocalDateKey(date)
          const disabled = key < todayKey || date.getDay() === 0
          const active = value === key
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
              }).format(date)}
              onClick={() => onChange(key)}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
      <p className="calendar-note">Los domingos no se muestran como días de atención.</p>
    </div>
  )
}
