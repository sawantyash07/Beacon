import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Package,
  CalendarCheck,
  CreditCard,
  Headphones,
  FileText,
  Star,
  Megaphone,
  BarChart3,
  ShieldAlert,
  Settings,
  Search,
  AlertOctagon,
  LogOut,
  Menu,
  X,
  Zap,
  Globe,
  Lock,
  ChevronDown,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { useMasterAdmin, type MasterAdminRole } from '@/context/MasterAdminContext'
import { toast } from 'sonner'

export function MasterControlLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    currentRole,
    setRole,
    currentAdminName,
    currentAdminEmail,
    kpis,
    alerts,
    settings,
    broadcastAnnouncement,
    toggleEmergencyLockdown,
    toggleMaintenanceMode,
  } = useMasterAdmin()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [broadcastOpen, setBroadcastOpen] = useState(false)
  const [broadcastTitle, setBroadcastTitle] = useState('')
  const [broadcastMessage, setBroadcastMessage] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  // System clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST')
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const rolesList: MasterAdminRole[] = [
    'Super Admin',
    'CEO',
    'Operations Head',
    'Verification Manager',
    'Finance Manager',
    'Finance Executive',
    'Customer Care Manager',
    'Customer Care Executive',
    'Technical Support Engineer',
    'Marketing Manager',
    'Content Moderator',
    'Analytics Viewer',
    'Legal & Compliance Officer',
  ]

  const navItems = [
    { label: 'Mission Control', path: '/master-control', icon: Activity, badge: null },
    { label: 'Verification Engine', path: '/master-control/verification', icon: CheckCircle2, badge: kpis.pendingPlannerVerifications },
    { label: 'User Operations', path: '/master-control/users', icon: Users, badge: null },
    { label: 'Trip Command Center', path: '/master-control/trips', icon: Compass, badge: kpis.activeTrips },
    { label: 'Package Management', path: '/master-control/packages', icon: Package, badge: null },
    { label: 'Booking Operations', path: '/master-control/bookings', icon: CalendarCheck, badge: kpis.todaysBookings },
    { label: 'Financial Hub', path: '/master-control/payments', icon: CreditCard, badge: kpis.pendingPaymentVerifications },
    { label: 'Customer Care CRM', path: '/master-control/support', icon: Headphones, badge: kpis.customerSupportTickets },
    { label: 'Legal & Disputes', path: '/master-control/disputes', icon: FileText, badge: kpis.disputesCount },
    { label: 'Review Moderation', path: '/master-control/reviews', icon: Star, badge: null },
    { label: 'Growth & Marketing', path: '/master-control/marketing', icon: Megaphone, badge: null },
    { label: 'Executive Intelligence', path: '/master-control/analytics', icon: BarChart3, badge: null },
    { label: 'Fraud & Audit Log', path: '/master-control/fraud-audit', icon: ShieldAlert, badge: alerts.length },
    { label: 'System Configuration', path: '/master-control/settings', icon: Settings, badge: null },
  ]

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!broadcastTitle || !broadcastMessage) {
      toast.error('Please enter broadcast title and message')
      return
    }
    broadcastAnnouncement(broadcastTitle, broadcastMessage)
    setBroadcastTitle('')
    setBroadcastMessage('')
    setBroadcastOpen(false)
  }

  const handleSearchSelect = (url: string) => {
    setSearchOpen(false)
    setSearchQuery('')
    navigate(url)
  }

  return (
    <div className="min-h-screen bg-[#001731] text-slate-100 flex flex-col font-body selection:bg-cyan selection:text-navy">
      {/* Emergency Mode Banner if active */}
      {settings.emergencyLockdown && (
        <div className="bg-red-600 text-white px-4 py-2 text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-pulse z-50">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4" />
            <span>CRITICAL SYSTEM NOTICE: EMERGENCY LOCKDOWN ACTIVE — ALL PAYOUTS & NEW BOOKINGS FROZEN</span>
          </div>
          <button
            onClick={toggleEmergencyLockdown}
            className="underline hover:text-red-200 uppercase font-mono tracking-wider text-[11px]"
          >
            Deactivate Lockdown
          </button>
        </div>
      )}

      {/* TOP COMMAND BAR */}
      <header className="h-16 bg-[#001d3d] border-b border-cyan/20 px-4 sm:px-6 flex items-center justify-between z-40 shrink-0 sticky top-0 backdrop-blur-md">
        {/* Left Branding & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-cyan-200 hover:text-cyan focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/master-control" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan/30 to-teal/40 border border-cyan/50 flex items-center justify-center text-cyan shadow-[0_0_15px_rgba(0,203,224,0.3)]">
              <Zap className="w-5 h-5 fill-cyan text-cyan" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg tracking-wider text-white">
                BEACON <span className="text-gradient">MASTER</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-cyan-300/60 ml-2 px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20">
                HQ COMMAND
              </span>
            </div>
          </Link>
        </div>

        {/* Middle Global Search (Ctrl+K) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full bg-[#00132b] hover:bg-[#001736] border border-cyan/25 hover:border-cyan/50 rounded-xl px-3.5 py-2 text-xs font-mono text-cyan-200/60 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-3.5 h-3.5 text-cyan" />
              <span>Search Planners, Customers, Bookings, UTRs...</span>
            </div>
            <kbd className="bg-cyan/10 border border-cyan/30 px-1.5 py-0.5 rounded text-[10px] text-cyan">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Status, Role Switcher & Emergency Broadcast */}
        <div className="flex items-center gap-3">
          {/* Platform Status Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-lg bg-navy border border-cyan/20 font-mono text-xs">
            <span className={`w-2 h-2 rounded-full ${settings.maintenanceMode ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
            <span className="text-cyan-200/80">Mode:</span>
            <span className={settings.maintenanceMode ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
              {settings.maintenanceMode ? 'MAINTENANCE' : 'LIVE (99.99%)'}
            </span>
          </div>

          {/* Clock */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-cyan-300/70 bg-navy/60 px-2.5 py-1 rounded-lg border border-cyan/15">
            <Clock className="w-3.5 h-3.5 text-cyan" />
            <span>{currentTime}</span>
          </div>

          {/* Role Switcher */}
          <div className="relative group">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono cursor-pointer hover:bg-cyan/20 transition-all">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-semibold hidden sm:inline">{currentRole}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-64 glass-dark rounded-xl border border-cyan/30 p-2 hidden group-hover:block z-50 shadow-2xl">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-cyan/70 border-b border-cyan/15 mb-1">
                Switch Admin Persona Role
              </div>
              <div className="max-h-60 overflow-y-auto space-y-0.5">
                {rolesList.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${currentRole === r ? 'bg-cyan text-navy font-bold' : 'text-slate-200 hover:bg-cyan/15 hover:text-cyan'}`}
                  >
                    <span>{r}</span>
                    {currentRole === r && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Broadcast Button */}
          <button
            onClick={() => setBroadcastOpen(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            title="Emergency Platform Broadcast"
          >
            <Megaphone className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">Broadcast</span>
          </button>

          {/* User Profile & Logout */}
          <button
            onClick={() => {
              toast.info('Logged out of Master Control')
              navigate('/master-login')
            }}
            className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-mono transition-all"
            title="Master System Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-[#001736] border-r border-cyan/20 flex flex-col transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          {/* Admin User Header Card */}
          <div className="p-4 border-b border-cyan/15 bg-navy/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-teal text-navy font-bold font-mono text-sm flex items-center justify-center shadow-[0_0_12px_rgba(0,203,224,0.4)]">
                HQ
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate font-heading">{currentAdminName}</div>
                <div className="text-[11px] font-mono text-cyan truncate">{currentAdminEmail}</div>
              </div>
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
            <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-cyan-300/50 uppercase">
              Operational Command Center
            </div>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium font-mono transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan/20 to-teal/10 border border-cyan/50 text-white font-bold shadow-[0_0_15px_rgba(0,203,224,0.15)]'
                      : 'text-slate-300 hover:bg-cyan/10 hover:text-cyan'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan glow-cyan-sm' : 'text-cyan-300/60'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-cyan text-navy' : 'bg-cyan/20 text-cyan border border-cyan/30'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom System Controls & Quick Toggles */}
          <div className="p-3 border-t border-cyan/15 bg-navy/60 space-y-2">
            <button
              onClick={toggleMaintenanceMode}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                settings.maintenanceMode
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-cyan/5 border-cyan/20 text-cyan-200 hover:bg-cyan/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                <span>Maintenance Mode</span>
              </div>
              <span className="font-bold">{settings.maintenanceMode ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={toggleEmergencyLockdown}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                settings.emergencyLockdown
                  ? 'bg-red-600/30 border-red-500 text-red-200 font-bold animate-pulse'
                  : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Emergency Lockdown</span>
              </div>
              <span className="font-bold">{settings.emergencyLockdown ? 'ACTIVE' : 'IDLE'}</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#001731] scrollbar-thin">
          <Outlet />
        </main>
      </div>

      {/* GLOBAL SEARCH MODAL (CTRL+K) */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl glass-dark rounded-2xl border border-cyan/40 p-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-cyan/20">
                <Search className="w-5 h-5 text-cyan" />
                <input
                  type="text"
                  placeholder="Global Command Search (e.g. 'Aarav', 'BCN-84920', 'Spiti', '429810482910')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-sm text-white font-mono placeholder:text-cyan/40 focus:outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg text-cyan-200/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
                <div className="text-[10px] font-mono uppercase text-cyan/70 px-2">Quick Navigation Shortcuts</div>
                <button
                  onClick={() => handleSearchSelect('/master-control/verification')}
                  className="w-full p-2.5 rounded-xl bg-navy/60 hover:bg-cyan/10 border border-cyan/15 text-left text-xs font-mono flex items-center justify-between"
                >
                  <span className="text-white">Review Pending Planner Verifications (14 Queue)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan" />
                </button>
                <button
                  onClick={() => handleSearchSelect('/master-control/bookings')}
                  className="w-full p-2.5 rounded-xl bg-navy/60 hover:bg-cyan/10 border border-cyan/15 text-left text-xs font-mono flex items-center justify-between"
                >
                  <span className="text-white">Search Booking #BCN-84920 (Spiti Expedition)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan" />
                </button>
                <button
                  onClick={() => handleSearchSelect('/master-control/payments')}
                  className="w-full p-2.5 rounded-xl bg-navy/60 hover:bg-cyan/10 border border-cyan/15 text-left text-xs font-mono flex items-center justify-between"
                >
                  <span className="text-white">Audit Duplicate UTR #9988112233</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan" />
                </button>
                <button
                  onClick={() => handleSearchSelect('/master-control/trips')}
                  className="w-full p-2.5 rounded-xl bg-navy/60 hover:bg-cyan/10 border border-cyan/15 text-left text-xs font-mono flex items-center justify-between"
                >
                  <span className="text-white">Track Active Departure #DEP-904 (Leh Biking)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EMERGENCY BROADCAST MODAL */}
      <AnimatePresence>
        {broadcastOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg glass-dark rounded-2xl border border-amber-500/50 p-6 shadow-[0_0_50px_rgba(245,158,11,0.3)]"
            >
              <div className="flex items-center gap-3 mb-4 text-amber-400">
                <Megaphone className="w-6 h-6 animate-bounce" />
                <h3 className="text-lg font-bold font-heading">Broadcast Platform Announcement</h3>
              </div>
              <p className="text-xs text-amber-200/80 font-mono mb-4">
                This notice will be immediately broadcast to all active planners, customers, push notifications, and home banners.
              </p>

              <form onSubmit={handleBroadcastSubmit} className="space-y-4 font-mono">
                <div>
                  <label className="block text-xs text-cyan-200/80 mb-1">Announcement Title</label>
                  <input
                    type="text"
                    placeholder="e.g. System Maintenance Notice / Weather Advisory"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    className="w-full bg-[#002147] border border-cyan/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-cyan-200/80 mb-1">Broadcast Message Body</label>
                  <textarea
                    rows={4}
                    placeholder="Detailed operational message to be delivered to all users..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full bg-[#002147] border border-cyan/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBroadcastOpen(false)}
                    className="px-4 py-2 rounded-xl bg-navy border border-cyan/20 text-slate-300 text-xs font-mono hover:bg-cyan/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-navy font-bold text-xs font-mono shadow-lg hover:brightness-110"
                  >
                    Dispatch Broadcast Now
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
