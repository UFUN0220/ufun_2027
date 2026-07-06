import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'

export function Button({
  children,
  as: Component = 'button',
  className,
  ...rest
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  [key: string]: unknown
}) {
  return (
    <Component
      className={clsx([
        'border border-transparent',
        'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500',
        'text-white hover:text-white dark:text-white dark:hover:text-white',
        'focus:shadow-outline-blue focus:outline-none',
        'transition-colors duration-150',
        'text-sm font-medium leading-5',
        'inline rounded-lg px-4 py-2 shadow',
        'inline-flex items-center gap-1 no-underline',
        className,
      ])}
      {...rest}
    >
      {children}
    </Component>
  )
}
