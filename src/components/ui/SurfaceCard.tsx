import type { ReactNode } from 'react'

interface SurfaceCardProps {
  children?: ReactNode
  className?: string
  description?: ReactNode
  title?: ReactNode
  titleAs?: 'h3' | 'h4'
}

const SurfaceCard = ({
  children,
  className,
  description,
  title,
  titleAs: TitleTag = 'h3',
}: SurfaceCardProps) => {
  const surfaceCardClassName = ['surface-card', className].filter(Boolean).join(' ')

  return (
    <div className={surfaceCardClassName}>
      {title ? <TitleTag className="surface-card__title">{title}</TitleTag> : null}
      {description ? <p className="surface-card__description">{description}</p> : null}
      {children}
    </div>
  )
}

export default SurfaceCard
