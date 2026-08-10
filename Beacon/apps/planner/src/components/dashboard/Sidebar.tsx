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
        <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Compass className="w-7 h-7 text-teal shrink-0" />
          {!collapsed && <span className="text-lg font-bold text-navy">Beacon Planner</span>}
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
        {navItems.map((item, idx) => {
          if ('type' in item && item.type === 'divider') {
            return <hr key={`div-${idx}`} className="border-border/50 my-2 mx-1" />
          }
          const Icon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
          return (
            <NavLink
              key={item.path}
              to={item.path!}
              end={item.path === '/dashboard'}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-sm font-medium transition-all overflow-hidden',
                  isActive
                    ? 'bg-cyan/10 text-navy glow-cyan-sm after:content-[""] after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[4px] after:bg-cyan'
                    : 'text-muted hover:bg-[#EAF8FD] hover:text-navy',
                  collapsed && 'justify-center px-2'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {Icon && <Icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-cyan" : "text-muted group-hover:text-teal")} />}
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className={cn('p-4 border-t border-border text-xs text-muted', collapsed && 'text-center')}>
        {!collapsed && <p>Beacon Planner v1.0</p>}
        {collapsed && <p>v1</p>}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        className="hidden lg:flex flex-col bg-sidebar border-r border-border h-screen sticky top-0 shrink-0"
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
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-sidebar border-r border-border z-50 lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
