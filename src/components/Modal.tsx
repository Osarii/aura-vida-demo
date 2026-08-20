import { useEffect, useId, useRef, type ReactNode } from 'react'

type Props = {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
}

export default function Modal({ isOpen, title, onClose, children, wide = false }: Props) {
  const titleId = useId()
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousActive = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousActive?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`modal-card ${wide ? 'modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id={titleId}>{title}</h3>
          <button
            ref={closeButtonRef}
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  )
}
