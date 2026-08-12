import { useState } from 'react'
import { X, Plus, Search } from 'lucide-react'
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react'

interface CertificationChipsProps {
  label?: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  allowCustom?: boolean
  verifiedTags?: string[]
}

export function CertificationChips({
  label,
  options,
  selected,
  onChange,
  placeholder = 'Type or search to select...',
  allowCustom = true,
  verifiedTags = []
}: CertificationChipsProps) {
  const [query, setQuery] = useState('')

  const filteredOptions = options.filter(
    (opt) => opt.toLowerCase().includes(query.toLowerCase()) && !selected.includes(opt)
  )

  const handleAdd = (item: string) => {
    if (!item.trim() || selected.includes(item.trim())) return
    onChange([...selected, item.trim()])
    setQuery('')
  }

  const handleRemove = (item: string) => {
    onChange(selected.filter((s) => s !== item))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() && allowCustom) {
      e.preventDefault()
      handleAdd(query.trim())
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-navy block">{label}</label>}

      {/* Selected Tags Display */}
      <div className="flex flex-wrap gap-2 min-h-[38px] p-2 bg-page border border-border rounded-[12px]">
        {selected.map((item) => {
          const isVerified = verifiedTags.includes(item)
          return (
            <span
              key={item}
              title={isVerified ? "Verified Certification" : "Self-declared. Upload proof in Step 4 to verify."}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all border ${
                isVerified 
                  ? 'bg-teal/10 text-teal border-teal/30 shadow-xs' 
                  : 'bg-page text-muted border-border'
              }`}
            >
              {isVerified ? (
                <ShieldCheck className="w-3.5 h-3.5 fill-teal/20" />
              ) : (
                <Shield className="w-3.5 h-3.5" />
              )}
              {item}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="hover:text-red-500 rounded-full p-0.5 ml-1 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )
        })}

        {/* Input Field */}
        <div className="relative flex-1 min-w-[160px] flex items-center">
          <Search className="w-3.5 h-3.5 text-muted absolute left-2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selected.length === 0 ? placeholder : 'Add more...'}
            className="w-full pl-7 pr-2 py-1 text-xs text-navy placeholder:text-muted/60 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {query.trim().length > 0 && (
        <div className="p-2 bg-surface border border-border rounded-[12px] shadow-lg max-h-40 overflow-y-auto space-y-1 z-20 relative">
          {filteredOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleAdd(option)}
              className="w-full text-left px-3 py-1.5 text-xs text-navy hover:bg-teal/10 hover:text-teal rounded-[8px] flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{option}</span>
              <Plus className="w-3.5 h-3.5 text-teal" />
            </button>
          ))}
          {allowCustom && !options.some((o) => o.toLowerCase() === query.trim().toLowerCase()) && (
            <button
              type="button"
              onClick={() => handleAdd(query)}
              className="w-full text-left px-3 py-1.5 text-xs font-bold text-cyan hover:bg-cyan/10 rounded-[8px] flex items-center justify-between border-t border-border pt-2 cursor-pointer"
            >
              <span>Add custom: "{query.trim()}"</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
