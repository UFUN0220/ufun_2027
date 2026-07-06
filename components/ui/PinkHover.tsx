import { clsx } from 'clsx'
import type { CSSProperties, ElementType, ReactNode } from 'react'

export function PinkHover({
  as: Component = 'span',
  children,
  active,
  className,
  duration = 100,
  ...rest
}: {
  children: ReactNode
  as?: ElementType
  active?: boolean
  className?: string
  duration?: number
  [key: string]: unknown
}) {
  return (
    <Component
      className={clsx([
        'bg-gradient-to-br bg-center bg-no-repeat',
        'transition-all duration-[var(--duration,100ms)] ease-in-out',
        'rounded px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700',
        //'dark:from-gray-600 dark:to-gray-700',
        'overflow-hidden',
        active
          ? 'bg-[length:100%_100%] hover:bg-[length:120%_120%]'
          : 'bg-[length:0%_0%] hover:bg-[length:100%_100%]',
        className,
      ])}
      style={{ '--duration': `${duration}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  )
}
