import type { ReactNode } from 'react'
import type { IconName } from '../types'

type Props = {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
  title?: string
}

const paths: Record<IconName, ReactNode> = {
  heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />,
  'heart-filled': <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" fill="currentColor" stroke="none" />,
  'heart-pulse': <><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" /><path d="M4.8 12h3l1.3-3 2.1 6 1.5-3H18" /></>,
  sparkle: <><path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5" /><path d="M9.5 21v-6h5v6" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M18 6l3-3M18 6h3V3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  'chevron-left': <path d="m15 18-6-6 6-6" />,
  'chevron-right': <path d="m9 18 6-6-6-6" />,
  'arrow-left': <><path d="M20 12H5" /><path d="m11 18-6-6 6-6" /></>,
  'arrow-right': <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  'check-circle': <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.6 2.6L16.5 9" /></>,
  close: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  'map-pin': <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  phone: <path d="M7.2 3.5 10 7.7 8.1 9.6a15 15 0 0 0 6.3 6.3l1.9-1.9 4.2 2.8v3.1c0 .9-.7 1.6-1.6 1.6C10 21.5 2.5 14 2.5 5.1c0-.9.7-1.6 1.6-1.6h3.1Z" />,
  message: <><path d="M21 11a8 8 0 0 1-8 8H8l-5 2 1.7-4.5A8 8 0 1 1 21 11Z" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
  'calendar-check': <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /><path d="m8 15 2.2 2.2L16 12.5" /></>,
  'file-text': <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 13h6M9 17h6" /></>,
  download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
  'external-link': <><path d="M14 5h5v5" /><path d="M10 14 19 5" /><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></>,
  stethoscope: <><path d="M5 3v4a5 5 0 0 0 10 0V3" /><path d="M8 3v4a2 2 0 0 0 4 0V3" /><path d="M10 12v2a5 5 0 0 0 10 0v-1" /><circle cx="20" cy="10" r="2" /></>,
  baby: <><circle cx="12" cy="8" r="4" /><path d="M8.5 7.5c1.2-1 2.5-1.5 4-1.5 1.1 0 2.1.3 3 .8" /><path d="M7 20c.4-4.2 2-6 5-6s4.6 1.8 5 6" /><path d="M9 17h6" /></>,
  scan: <><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" /><path d="M7 12h3l1.2-3 2 6 1.3-3H17" /></>,
  'plus-circle': <><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>,
  shield: <><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.7-4.8" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
}

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '', title }: Props) {
  return (
    <svg
      className={`ui-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  )
}
