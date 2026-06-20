import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'success'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  isLoading?: boolean
  variant?: ButtonVariant
}

const Button = ({
  children,
  className,
  disabled = false,
  icon,
  isLoading = false,
  type = 'button',
  variant = 'secondary',
  ...props
}: ButtonProps) => {
  const buttonClassName = ['button', `button--${variant}`, isLoading ? 'button--loading' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      aria-busy={isLoading || undefined}
      className={buttonClassName}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {icon ? <span className="button__icon" aria-hidden="true">{icon}</span> : null}
      {children}
    </button>
  )
}

export default Button
