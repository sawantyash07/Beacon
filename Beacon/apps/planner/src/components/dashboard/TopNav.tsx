import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Menu, LogOut, User, Settings, Bot, Keyboard, Sparkles } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface TopNavProps {
  onMenuClick: () => void
  onOpenCommandPalette?: () => void
  onOpenShortcuts?: () => void
  onOpenAi?: () => void
}

export function TopNav({
  onMenuClick,
  onOpenCommandPalette,
  onOpenShortcuts,
  onOpenAi
}: TopNavProps) {
  const [search, setSearch] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

  const notifications = [
    { id: 1, text: 'New inquiry from David Lee', time: '5m ago' },
    { id: 2, text: 'Payment received: ₹1,55,000', time: '1h ago' },
    { id: 3, text: 'Booking confirmed for Maldives', time: '3h ago' },
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 glass border-b border-border px-4 py-3">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-[10px] hover:bg-border/50" aria-label="Open menu">
          <Menu className="w-5 h-5 text-navy" />
        </button>

        {/* Search & Command Palette Trigger */}
        <div
          onClick={onOpenCommandPalette}
          className="flex-1 max-w-xl relative cursor-pointer group"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-hover:text-cyan transition-colors" />
          <div className="w-full pl-10 pr-24 py-2 rounded-[12px] border border-border bg-page/50 group-hover:bg-white text-sm text-muted flex items-center justify-between transition-all">
            <span className="truncate">Search packages, bookings, travelers...</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-border/80 text-[10px] font-mono text-muted shadow-2xs">
              <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd> + <kbd>K</kbd>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Ask Beacon AI Quick Button */}
          {onOpenAi && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenAi}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-gradient-to-r from-teal/10 to-cyan/15 hover:from-teal/20 hover:to-cyan/25 border border-cyan/30 text-navy font-semibold text-xs transition-all shadow-xs"
              title="Ask Beacon AI Copilot (Ctrl+J)"
            >
              <Bot className="w-4 h-4 text-cyan" />
              <span>Ask AI</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.2 bg-white/80 border border-cyan/30 rounded text-[9px] font-mono text-muted">
                {isMac ? '⌘J' : 'Ctrl+J'}
              </kbd>
            </motion.button>
          )}

          {/* Keyboard Shortcuts Cheatsheet Button */}
          {onOpenShortcuts && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={onOpenShortcuts}
              className="p-2 rounded-[10px] hover:bg-border/50 text-navy/70 hover:text-navy"
              title="Keyboard Shortcuts (Ctrl+/)"
              aria-label="Keyboard Shortcuts"
            >
              <Keyboard className="w-5 h-5" />
            </motion.button>
          )}
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
              className="relative p-2 rounded-[10px] hover:bg-border/50"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-navy" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-teal rounded-full" />
            </motion.button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-[14px] shadow-xl overflow-hidden"
                >
                  <div className="p-3 border-b border-border font-medium text-sm text-navy">Notifications</div>
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-page/50 border-b border-border last:border-0 cursor-pointer">
                      <p className="text-sm text-navy">{n.text}</p>
                      <p className="text-xs text-muted mt-1">{n.time}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
              className="flex items-center gap-2 p-1.5 rounded-[12px] hover:bg-border/50"
            >
              <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal font-semibold text-sm">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
            </motion.button>
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-[14px] shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-navy text-sm">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted truncate">{user?.email}</p>
                  </div>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:bg-page/50">
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:bg-page/50">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 border-t border-border"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
