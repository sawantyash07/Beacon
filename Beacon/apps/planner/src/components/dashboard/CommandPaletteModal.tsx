import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Plus, Package, Calendar, CreditCard, Mail, Settings,
  Sparkles, Bot, Keyboard, ArrowRight, ShieldCheck, Bus, Users,
  BarChart3, FileText, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommandPaletteModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenShortcuts: () => void
  onOpenAi: () => void
}

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon: any
  category: 'Navigation' | 'Actions' | 'AI & Tools'
  action: () => void
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onOpenShortcuts,
  onOpenAi
}: CommandPaletteModalProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands: CommandItem[] = [
    // Actions
    {
      id: 'act-new-pkg',
      title: 'Create New Package / Trip',
      subtitle: 'Open experience builder console',
      icon: Plus,
      category: 'Actions',
      action: () => { onClose(); navigate('/dashboard/packages/create') }
    },
    {
      id: 'act-ai',
      title: 'Ask Beacon AI Copilot',
      subtitle: 'Natural language trip editor (Ctrl+J)',
      icon: Bot,
      category: 'AI & Tools',
      action: () => { onClose(); onOpenAi() }
    },
    {
      id: 'act-shortcuts',
      title: 'Show Keyboard Shortcuts Cheatsheet',
      subtitle: 'View all fast keys (Ctrl+/)',
      icon: Keyboard,
      category: 'AI & Tools',
      action: () => { onClose(); onOpenShortcuts() }
    },

    // Navigation
    {
      id: 'nav-home',
      title: 'Home Command Center',
      subtitle: 'Overview, alerts & priorities',
      icon: Calendar,
      category: 'Navigation',
      action: () => { onClose(); navigate('/dashboard') }
    },
    {
      id: 'nav-packages',
      title: 'Travel Packages & Inventory',
      subtitle: 'Manage active trips & brochures',
      icon: Package,
      category: 'Navigation',
      action: () => { onClose(); navigate('/dashboard/packages') }
    },
    {
      id: 'nav-inquiries',
      title: 'Traveler Inquiries & Leads',
      subtitle: 'Chat & answer customer requests',
      icon: Mail,
      category: 'Navigation',
      action: () => { onClose(); navigate('/dashboard/inquiries') }
    },
    {
      id: 'nav-bookings',
      title: 'Bookings & Traveler Roster',
      subtitle: 'Active reservations & manifests',
      icon: Users,
      category: 'Navigation',
      action: () => { onClose(); navigate('/dashboard/bookings') }
    },
    {
      id: 'nav-payments',
      title: 'Payments & UTR Verification',
      subtitle: 'Pending settlements & PhonePe vault',
      icon: CreditCard,
      category: 'Navigation',
      action: () => { onClose(); navigate('/dashboard/payments') }
    },
    {
      id: 'nav-operations',
      title: 'Live Trip Operations',
      subtitle: 'Dispatch, guides, buses & logistics',
      icon: Bus,
      category: 'Navigation',
      action: () => { onClose(); navigate('/dashboard/trip-operations') }
    },
    {
      id: 'nav-profile',
      title: 'Business Profile & eKYC Vault',
      subtitle: 'Company credentials & verification',
      icon: ShieldCheck,
      category: 'Navigation',
      action: () => { onClose(); navigate('/dashboard/business-profile?step=10') }
    },
    {
      id: 'nav-analytics',
      title: 'Business Analytics & Reports',
      subtitle: 'Revenue, conversion & rating charts',
      icon: BarChart3,
      category: 'Navigation',
      action: () => { onClose(); navigate('/dashboard/analytics') }
    },
  ]

  const filtered = commands.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    (c.subtitle && c.subtitle.toLowerCase().includes(query.toLowerCase())) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action()
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, selectedIndex, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28 bg-navy/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl bg-white border border-border rounded-[20px] shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-border flex items-center gap-3 bg-[var(--color-bg-surface)]">
            <Search className="w-5 h-5 text-teal shrink-0" />
            <input
              type="text"
              placeholder="Type a command, search pages, or trigger AI..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 text-sm text-navy placeholder:text-muted focus:outline-none"
              autoFocus
            />
            <kbd className="px-2 py-0.5 bg-white border border-border rounded text-[10px] font-medium text-muted">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted">
                No matching commands found for "{query}"
              </div>
            ) : (
              filtered.map((item, idx) => {
                const Icon = item.icon
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      'w-full p-3 rounded-[12px] flex items-center justify-between text-left transition-all',
                      isSelected
                        ? 'bg-cyan/10 text-navy border border-cyan/30'
                        : 'hover:bg-page text-navy/80 border border-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn(
                        'w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0',
                        isSelected ? 'bg-cyan text-white shadow-xs' : 'bg-page text-muted'
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-navy truncate">{item.title}</div>
                        {item.subtitle && (
                          <div className="text-[11px] text-muted truncate">{item.subtitle}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-page text-muted border border-border/80">
                        {item.category}
                      </span>
                      <ChevronRight className={cn('w-4 h-4', isSelected ? 'text-cyan' : 'text-muted/40')} />
                    </div>
                  </button>
                )
              })
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="p-3 bg-page border-t border-border flex items-center justify-between text-[11px] text-muted">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1 py-0.5 bg-white border rounded font-medium text-[10px]">↑↓</kbd> Navigate</span>
              <span><kbd className="px-1 py-0.5 bg-white border rounded font-medium text-[10px]">↵</kbd> Select</span>
            </div>
            <span>Press <kbd className="px-1 py-0.5 bg-white border rounded font-medium text-[10px]">Ctrl+J</kbd> for AI Copilot</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
