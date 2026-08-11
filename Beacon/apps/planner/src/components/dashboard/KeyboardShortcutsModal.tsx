import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Keyboard, X, Search, Sparkles, Zap, Plane, Calendar, Users, Bot,
  Command
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ShortcutItem {
  keys: string[]
  action: string
  category: 'essential' | 'itinerary' | 'moving' | 'productivity' | 'ai'
  description?: string
}

const SHORTCUTS_DATA: ShortcutItem[] = [
  // ⚡ Essential Beacon Shortcuts
  { keys: ['Ctrl', 'K'], action: 'Command Palette', category: 'essential', description: 'Quick search, navigation & actions' },
  { keys: ['Ctrl', 'N'], action: 'New Trip', category: 'essential', description: 'Create a new travel experience' },
  { keys: ['Ctrl', 'S'], action: 'Save Trip', category: 'essential', description: 'Save current draft or changes' },
  { keys: ['Ctrl', 'Z'], action: 'Undo', category: 'essential', description: 'Revert last modification' },
  { keys: ['Ctrl', 'Shift', 'Z'], action: 'Redo', category: 'essential', description: 'Reapply undone change' },
  { keys: ['Esc'], action: 'Close / Cancel', category: 'essential', description: 'Dismiss any open modal or prompt' },
  { keys: ['/'], action: 'Search', category: 'essential', description: 'Focus search input' },
  { keys: ['Ctrl', '/'], action: 'Show Shortcuts', category: 'essential', description: 'Display this keyboard cheat sheet' },

  // ✈️ Itinerary Item Shortcuts
  { keys: ['A'], action: 'Add Activity', category: 'itinerary', description: 'Insert sightseeing or adventure item' },
  { keys: ['H'], action: 'Add Hotel', category: 'itinerary', description: 'Insert hotel stay or resort lodge' },
  { keys: ['T'], action: 'Add Transport', category: 'itinerary', description: 'Add flight, cab, train, or bus route' },
  { keys: ['R'], action: 'Add Restaurant', category: 'itinerary', description: 'Add meal, dining or cafe stop' },
  { keys: ['D'], action: 'Add Destination', category: 'itinerary', description: 'Add city or location pinpoint' },
  { keys: ['N'], action: 'Add Note', category: 'itinerary', description: 'Add guide tip or planner note' },
  { keys: ['E'], action: 'Edit Selected Item', category: 'itinerary', description: 'Open edit modal for item' },
  { keys: ['Enter'], action: 'Open Selected Item', category: 'itinerary', description: 'Inspect item details' },
  { keys: ['Shift', 'D'], action: 'Duplicate Selected Item', category: 'itinerary', description: 'Clone active card' },
  { keys: ['Delete'], action: 'Delete Selected Item', category: 'itinerary', description: 'Remove card from day plan' },

  // 📅 Moving Itinerary Items
  { keys: ['↑', '↓'], action: 'Move item up / down', category: 'moving', description: 'Reorder timeline within current day' },
  { keys: ['Shift', '↑'], action: 'Move to previous day', category: 'moving', description: 'Shift item to Day N-1' },
  { keys: ['Shift', '↓'], action: 'Move to next day', category: 'moving', description: 'Shift item to Day N+1' },
  { keys: ['Shift', '←'], action: 'Move time earlier', category: 'moving', description: 'Advance schedule by 30 mins earlier' },
  { keys: ['Shift', '→'], action: 'Move time later', category: 'moving', description: 'Delay schedule by 30 mins later' },

  // 👥 Planner Productivity
  { keys: ['Ctrl', 'Shift', 'N'], action: 'Add Traveler', category: 'productivity', description: 'Register new passenger to trip' },
  { keys: ['Ctrl', 'Shift', 'D'], action: 'Duplicate Entire Trip', category: 'productivity', description: 'Clone whole itinerary as template' },
  { keys: ['Ctrl', 'Shift', 'A'], action: 'Bulk Add / Apply', category: 'productivity', description: 'Multi-select batch operation' },
  { keys: ['Ctrl', 'P'], action: 'Preview Itinerary', category: 'productivity', description: 'Toggle traveler mobile preview' },
  { keys: ['Ctrl', 'E'], action: 'Export / Share', category: 'productivity', description: 'Generate and download PDF brochure' },

  // 🤖 Beacon AI
  { keys: ['Ctrl', 'J'], action: 'Ask Beacon AI', category: 'ai', description: 'Natural language itinerary copilot' },
]

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

  const filteredShortcuts = SHORTCUTS_DATA.filter(s => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory
    const matchesSearch =
      s.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.keys.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: 'all', label: 'All Shortcuts', icon: Keyboard },
    { id: 'essential', label: '⚡ Essential', icon: Zap },
    { id: 'itinerary', label: '✈️ Itinerary', icon: Plane },
    { id: 'moving', label: '📅 Move Items', icon: Calendar },
    { id: 'productivity', label: '👥 Productivity', icon: Users },
    { id: 'ai', label: '🤖 Beacon AI', icon: Bot },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-surface border border-border/80 rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#031525] via-[#092B48] to-[#0A3D62] text-white flex items-center justify-between border-b border-border/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-cyan/20 text-cyan flex items-center justify-center border border-cyan/30">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Keyboard Shortcuts
                  <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-teal/20 text-cyan border border-cyan/30">
                    Pro Productivity
                  </span>
                </h2>
                <p className="text-xs text-white/70">Master the fast keys to build and manage travel trips in seconds.</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="p-4 bg-page border-b border-border space-y-3 shrink-0">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search shortcuts (e.g. hotel, duplicate, ai, save)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white rounded-[12px] border border-border text-sm text-navy placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan/40"
                autoFocus
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5',
                    activeCategory === cat.id
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-white text-muted hover:text-navy border border-border/80'
                  )}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shortcuts Grid / List */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-2">
            {filteredShortcuts.length === 0 ? (
              <div className="text-center py-12 text-muted text-sm">
                No shortcuts found matching "{searchTerm}"
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {filteredShortcuts.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white hover:bg-[#F3F9FD] border border-border/70 rounded-[14px] flex items-center justify-between gap-3 transition-colors shadow-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-navy truncate">{s.action}</h4>
                      {s.description && (
                        <p className="text-[11px] text-muted truncate mt-0.5">{s.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {s.keys.map((k, kIdx) => {
                        const displayKey = isMac && k === 'Ctrl' ? '⌘' : isMac && k === 'Shift' ? '⇧' : k
                        return (
                          <kbd
                            key={kIdx}
                            className="px-2 py-1 bg-[#EEF4FA] border border-border text-navy text-[11px] font-mono font-bold rounded-[6px] shadow-2xs min-w-[24px] text-center"
                          >
                            {displayKey}
                          </kbd>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-page border-t border-border flex items-center justify-between text-xs text-muted shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              💡 Tip: Press <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px] font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px] font-mono">J</kbd> anytime to ask Beacon AI to adjust your trip.
            </span>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-navy text-white text-xs font-semibold rounded-[8px] hover:bg-navy/90"
            >
              Done (Esc)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
