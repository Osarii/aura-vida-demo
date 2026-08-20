type Props = {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}: Props) {
  return (
    <div className={`section-heading ${centered ? 'centered' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
