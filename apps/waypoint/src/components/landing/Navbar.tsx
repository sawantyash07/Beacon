import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Compass, User, BookOpen, LayoutDashboard, Settings, LogOut, Bell } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

import type { User as AuthUser } from '@/services/auth'

const navLinks = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Packages', href: '/packages' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const getInitial = (user?: AuthUser | null) => {
  if (!user) return "G";
  if (user.name?.trim()) return user.name.trim().charAt(0).toUpperCase();
  if (user.email?.trim()) return user.email.trim().charAt(0).toUpperCase();
  return "G";
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    setDropdownOpen(false)
    navigate('/')
  }

  if (loading) {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 animate-pulse" />
            <div className="h-6 w-24 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="hidden md:flex gap-8">
            <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="hidden md:flex gap-3">
            <div className="h-10 w-24 bg-white/20 rounded animate-pulse" />
            <div className="h-10 w-32 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center glow-cyan-sm relative"
          >
            <Compass className="w-5 h-5 text-teal" />
          </motion.div>
          <span className={`text-xl font-bold font-[family-name:var(--font-heading)] ${scrolled ? 'text-navy' : 'text-white'}`}>
            Waypoint
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-cyan ${
                scrolled ? 'text-muted hover:text-teal' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <button className={cn('relative p-2 rounded-full transition-colors', scrolled ? 'hover:bg-navy/5 text-navy' : 'hover:bg-white/10 text-white')}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan to-teal flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">
                    {getInitial(user)}
                  </div>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 glass rounded-[16px] shadow-xl border border-border/50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-border/50">
                        <p className="text-sm font-bold text-navy truncate">{user?.name || 'Guest'}</p>
                        <p className="text-xs text-muted truncate">{user?.email || 'No email'}</p>
                      </div>
                      <div className="p-2 flex flex-col gap-1">
                        <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-teal/10 hover:text-teal rounded-lg transition-colors" onClick={() => setDropdownOpen(false)}>
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <Link to="/bookings" className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-teal/10 hover:text-teal rounded-lg transition-colors" onClick={() => setDropdownOpen(false)}>
                          <BookOpen className="w-4 h-4" /> My Bookings
                        </Link>
                        <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-teal/10 hover:text-teal rounded-lg transition-colors" onClick={() => setDropdownOpen(false)}>
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-teal/10 hover:text-teal rounded-lg transition-colors" onClick={() => setDropdownOpen(false)}>
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                        <div className="h-px bg-border my-1" />
                        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left">
                          <LogOut className="w-4 h-4" /> Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className={scrolled ? '' : 'text-white hover:bg-white/10'}>
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button glow>Start Planning</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className={scrolled ? 'text-navy' : 'text-white'} />
          ) : (
            <Menu className={scrolled ? 'text-navy' : 'text-white'} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border mt-2"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-navy font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}><Button className="w-full" glow>Dashboard</Button></Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false) }}><Button variant="outline" className="w-full">Log out</Button></button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}><Button variant="outline" className="w-full">Log In</Button></Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}><Button className="w-full" glow>Start Planning</Button></Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
