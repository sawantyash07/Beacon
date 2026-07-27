import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Menu, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface TopNavProps {
  onMenuClick: () => void
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const [search, setSearch] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const notifications = [
    { id: 1, text: 'New inquiry from David Lee', time: '5m ago' },
    { id: 2, text: 'Payment received: $1,899', time: '1h ago' },
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

        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="search"
            placeholder="Search packages, bookings, travelers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[12px] border border-border bg-page/50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/30 focus:border-cyan transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
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
