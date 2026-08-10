const DAYS_OF_WEEK = [
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' },
  { short: 'Sun', full: 'Sunday' },
]

interface DayPickerProps {
  selectedDays: string[]
  onChange: (days: string[]) => void
  label?: string
}

export function DayPicker({ selectedDays, onChange, label }: DayPickerProps) {
  const toggleDay = (shortDay: string) => {
    if (selectedDays.includes(shortDay)) {
      onChange(selectedDays.filter((d) => d !== shortDay))
    } else {
      onChange([...selectedDays, shortDay])
    }
  }

  const selectWeekdays = () => {
    onChange(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  }

  const selectAll = () => {
    onChange(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-navy">{label}</label>
          <div className="flex gap-2 text-[11px]">
            <button
              type="button"
              onClick={selectWeekdays}
              className="text-teal font-semibold hover:underline cursor-pointer"
            >
              Mon–Fri
            </button>
            <span className="text-muted">•</span>
            <button
              type="button"
              onClick={selectAll}
              className="text-teal font-semibold hover:underline cursor-pointer"
            >
              All 7 Days
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-7 gap-2">
        {DAYS_OF_WEEK.map((day) => {
          const isSelected = selectedDays.includes(day.short)
          return (
            <button
              key={day.short}
              type="button"
              onClick={() => toggleDay(day.short)}
              className={`py-3 px-1 rounded-[14px] text-xs font-bold transition-all border flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                isSelected
                  ? 'bg-navy text-white border-navy shadow-md'
                  : 'bg-page text-muted border-border hover:bg-border/30 hover:text-navy'
              }`}
            >
              <span className="text-[10px] uppercase font-mono tracking-wider">{day.short}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  isSelected ? 'bg-cyan' : 'bg-transparent'
                }`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
