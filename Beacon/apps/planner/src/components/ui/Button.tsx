import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  glow?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal text-white hover:bg-teal/90 shadow-md hover:shadow-lg',
  secondary: 'bg-navy text-white hover:bg-navy/90',
  ghost: 'bg-transparent text-navy hover:bg-border/50',
  outline: 'border-2 border-teal text-teal hover:bg-teal/10',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-[10px]',
  md: 'px-5 py-2.5 text-sm rounded-[12px]',
  lg: 'px-7 py-3.5 text-base rounded-[14px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, glow, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02, y: disabled || loading ? 0 : -1 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          glow && 'glow-cyan-sm',
          className
        )}
        disabled={disabled || loading}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {children}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
