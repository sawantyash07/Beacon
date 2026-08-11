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
              error && 'border-rose-500 ring-1 ring-rose-400 bg-rose-50/20 focus:ring-rose-400 focus:border-rose-500',
              className
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const focusableElements = Array.from(
                  document.querySelectorAll('input:not([disabled]), select:not([disabled]), textarea:not([disabled])')
                ) as HTMLElement[];
                const index = focusableElements.indexOf(e.currentTarget);
                if (index > -1 && index < focusableElements.length - 1) {
                  focusableElements[index + 1].focus();
                }
              }
              if (props.onKeyDown) props.onKeyDown(e);
            }}
            {...props}
          />
          {endElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {endElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
