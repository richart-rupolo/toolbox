import type { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  description?: ReactNode
  title: ReactNode
}

const PageShell = ({ children, description, title }: PageShellProps) => {
  return (
    <section className="page">
      <h1 className="page-title">{title}</h1>
      {description ? <p className="page-description">{description}</p> : null}
      {children}
    </section>
  )
}

export default PageShell
