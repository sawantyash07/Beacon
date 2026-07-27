import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-teal/10 text-teal',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-cyan/10 text-cyan',
  muted: 'bg-border text-muted',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status?: string | null }) {
  if (!status) return null;
  const map: Record<string, BadgeVariant> = {
    new: 'info',
    replied: 'warning',
    converted: 'success',
    confirmed: 'success',
    pending: 'warning',
    cancelled: 'danger',
    draft: 'muted',
    published: 'success',
    paid: 'success',
    partial: 'warning',
    refunded: 'muted',
  }
  return (
    <Badge variant={map[status.toLowerCase()] || 'default'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
