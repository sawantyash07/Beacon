import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  endElement?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, endElement, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined)
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-navy">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{icon}</div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-2.5 rounded-[12px] border border-border bg-surface text-navy placeholder:text-muted/60',
              'focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan transition-all duration-200',
              icon && 'pl-10',
              error && 'border-red-400 focus:ring-red-200',
              className
            )}
            {...props}
          />
          {endElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {endElement}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
