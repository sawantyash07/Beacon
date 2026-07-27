import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Compass, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navItems } from '@/data/mockData'
import { cn } from '@/lib/utils'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const content = (
    <div className="flex flex-col h-full">
      <div className={cn('flex items-center gap-3 p-4 border-b border-border', collapsed && 'justify-center')}>
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Compass className="w-7 h-7 text-teal shrink-0" />
          {!collapsed && <span className="text-lg font-bold text-navy">Waypoint</span>}
        </Link>
        <button
          onClick={onToggle}
          className="hidden lg:flex ml-auto p-1.5 rounded-[8px] hover:bg-border/50 text-muted"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-sm font-medium transition-all',
                  isActive
                    ? 'bg-teal/10 text-teal glow-cyan-sm'
                    : 'text-muted hover:bg-border/30 hover:text-navy',
                  collapsed && 'justify-center px-2'
                )
              }
            >
              {Icon && <Icon className="w-5 h-5 shrink-0" />}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className={cn('p-4 border-t border-border text-xs text-muted', collapsed && 'text-center')}>
        {!collapsed && <p>Waypoint v1.0</p>}
        {collapsed && <p>v1</p>}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        className="hidden lg:flex flex-col bg-surface border-r border-border h-screen sticky top-0 shrink-0"
      >
        {content}
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/40 z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-surface border-r border-border z-50 lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
