import { type ReactNode } from 'react'

interface ToggleCardProps {
  icon?: ReactNode
  title: string
  description?: string
  enabled: boolean
  onChange: (enabled: boolean) => void
  badgeText?: string
}

export function ToggleCard({
  icon,
  title,
  description,
  enabled,
  onChange,
  badgeText,
}: ToggleCardProps) {
  return (
    <div
      onClick={() => onChange(!enabled)}
      className={`p-4 rounded-[18px] border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
        enabled
          ? 'bg-teal/10 border-teal shadow-md shadow-teal/5'
          : 'bg-page border-border opacity-70 hover:opacity-100 hover:border-border/80'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {icon && (
          <div
            className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 transition-colors ${
              enabled ? 'bg-teal text-white shadow-sm' : 'bg-border/60 text-muted'
            }`}
          >
            {icon}
          </div>
        )}

        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={`text-sm font-bold truncate ${enabled ? 'text-navy' : 'text-muted'}`}>
              {title}
            </h4>
            {badgeText && (
              <span className="text-[10px] font-extrabold px-2 py-0.2 bg-teal/20 text-teal rounded-full">
                {badgeText}
              </span>
            )}
          </div>
          {description && <p className="text-xs text-muted line-clamp-1">{description}</p>}
        </div>
      </div>

      {/* Switch Toggle */}
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`text-[10px] font-extrabold font-mono uppercase tracking-wider ${
            enabled ? 'text-teal' : 'text-muted/60'
          }`}
        >
          {enabled ? 'Included' : 'Off'}
        </span>
        <div
          className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
            enabled ? 'bg-teal' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
              enabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
      </div>
    </div>
  )
}
