import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { stats, revenueData, packages, activityFeed, upcomingTrips } from '@/data/mockData'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Overview</h1>
        <p className="text-muted text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = Icons[stat.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
          return (
            <motion.div key={stat.label} variants={item}>
              <Card hover className="relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-navy font-mono">
                      {stat.label.includes('Revenue') ? (
                        <AnimatedCounter value={stat.value} prefix="$" />
                      ) : (
                        <AnimatedCounter value={stat.value} />
                      )}
                    </p>
                    <p className={`text-xs mt-1 ${stat.change >= 0 ? 'text-teal' : 'text-red-500'}`}>
                      {stat.change >= 0 ? '+' : ''}{stat.change}% vs last month
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-[12px] bg-teal/10 flex items-center justify-center">
                    {Icon && <Icon className="w-5 h-5 text-teal" />}
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold text-navy mb-4">Revenue Overview</h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0097A6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0097A6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#D6EEF1" />
                <XAxis dataKey="month" stroke="#5C7A88" fontSize={12} />
                <YAxis stroke="#5C7A88" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #D6EEF1', fontFamily: 'IBM Plex Mono' }}
                  formatter={(value) => [formatCurrency(Number(value ?? 0)), 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0097A6" fill="url(#revenueGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full">
            <h2 className="text-lg font-semibold text-navy mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activityFeed.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-2 rounded-[10px] hover:bg-page/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-teal mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-navy">{activity.text}</p>
                    <p className="text-xs text-muted">{formatRelativeTime(activity.time)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Packages */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Live Packages</h2>
          <div className="space-y-3">
            {packages.filter((p) => p.status === 'published').map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3 rounded-[12px] border border-border hover:border-teal/30 transition-colors"
              >
                <img src={pkg.image} alt={pkg.title} className="w-16 h-16 rounded-[10px] object-cover" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-navy text-sm truncate">{pkg.title}</p>
                  <p className="text-xs text-muted">{pkg.destination} · {pkg.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold text-teal">{formatCurrency(pkg.price)}</p>
                  <p className="text-xs text-muted">{pkg.bookings} bookings</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Upcoming Trips */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Upcoming Trips</h2>
          <div className="space-y-3">
            {upcomingTrips.map((trip) => (
              <motion.div
                key={trip.id}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-3 rounded-[12px] border border-border hover:border-teal/30 transition-colors"
              >
                <div>
                  <p className="font-medium text-navy text-sm">{trip.destination}</p>
                  <p className="text-xs text-muted">{trip.package}</p>
                </div>
                <div className="text-right">
                  <Badge>{trip.travelers} travelers</Badge>
                  <p className="text-xs text-muted mt-1 font-mono">{trip.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
