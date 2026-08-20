import type { IconName, ToastMessage } from '../types'
import Icon from './Icon'

export default function ToastStack({ items }: { items: ToastMessage[] }) {
  return (
    <div className="toast-stack" aria-live="polite">
      {items.map((item) => {
        const icon: IconName = item.tone === 'success' ? 'check-circle' : item.tone === 'error' ? 'alert' : 'info'
        return (
          <div className={`toast toast-${item.tone}`} key={item.id}>
            <span aria-hidden="true"><Icon name={icon} size={17} /></span>
            <p>{item.text}</p>
          </div>
        )
      })}
    </div>
  )
}
