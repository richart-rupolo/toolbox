import type { ReactNode } from 'react'

interface ToolShellProps {
  actions?: ReactNode
  children: ReactNode
  description?: ReactNode
  status?: ReactNode
  title?: ReactNode
}

const ToolShell = ({ actions, children, description, status, title }: ToolShellProps) => {
  return (
    <section className="tool-container">
      {title || description ? (
        <div className="tool-header">
          {title ? <h2 className="tool-title">{title}</h2> : null}
          {description ? <p className="tool-description">{description}</p> : null}
        </div>
      ) : null}

      {actions ? <div className="tool-actions">{actions}</div> : null}
      {status}
      {children}
    </section>
  )
}

export default ToolShell
