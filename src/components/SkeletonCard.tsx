export default function SkeletonCard() {
  return (
    <div className="doctor-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-image" />
      <div className="doctor-card-body">
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line short" />
      </div>
    </div>
  )
}
