function initials(name: string) {
  return name
    .replace(/^(Dra?\.|Dr\.)\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function setImageFallback(image: HTMLImageElement, name: string) {
  image.onerror = null
  const label = initials(name) || 'AV'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700">
      <rect width="700" height="700" fill="#e8f1ee"/>
      <circle cx="350" cy="300" r="135" fill="#c8ddd7"/>
      <rect x="145" y="455" width="410" height="190" rx="95" fill="#c8ddd7"/>
      <text x="350" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="92" font-weight="700" fill="#185149">${label}</text>
    </svg>`
  image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}
