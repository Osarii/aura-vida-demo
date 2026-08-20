import type { ToastMessage } from '../types'

export default function ToastStack({ items }: { items: ToastMessage[] }) {
  return (
    <div className="toast-stack" aria-live="polite">
      {items.map((item) => (
        <div className={`toast toast-${item.tone}`} key={item.id}>
          <span>{item.tone === 'success' ? '✓' : item.tone === 'error' ? '!' : 'i'}</span>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}
