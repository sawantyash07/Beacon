import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export function Card({ children, className, glass, hover, glow, onClick }: CardProps) {
  const Component = hover || onClick ? motion.div : 'div'
  const motionProps = hover || onClick
    ? {
        whileHover: { y: -4, boxShadow: '0 12px 40px rgba(0, 151, 166, 0.15)' },
        transition: { duration: 0.2 },
        onClick,
        className: cn('cursor-pointer', onClick && 'cursor-pointer'),
      }
    : {}

  return (
    <Component
      {...motionProps}
      className={cn(
        'rounded-[14px] p-5',
        glass ? 'glass' : 'bg-surface border border-border',
        glow && 'glow-cyan-sm',
        className
      )}
    >
      {children}
    </Component>
  )
}
