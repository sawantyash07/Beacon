import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MoreVertical, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { bookings } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function BookingsPage() {
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = (bookings || []).filter(
    (b) =>
      (b?.traveler || '').toLowerCase().includes(search.toLowerCase()) ||
      (b?.id || '').toLowerCase().includes(search.toLowerCase()) ||
      (b?.package || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Bookings</h1>
          <p className="text-muted text-sm mt-1">Track and manage all traveler bookings</p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="search"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[12px] border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-cyan/30"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-8 h-8" />}
          title="No bookings found"
          description="Bookings will appear here when travelers confirm their trips."
        />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-page/50">
                  <th className="text-left p-4 font-medium text-muted">Booking ID</th>
                  <th className="text-left p-4 font-medium text-muted">Traveler</th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">Package</th>
                  <th className="text-left p-4 font-medium text-muted">Amount</th>
                  <th className="text-left p-4 font-medium text-muted">Status</th>
                  <th className="text-left p-4 font-medium text-muted hidden sm:table-cell">Date</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking, i) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-page/30 transition-colors"
                  >
                    <td className="p-4 font-mono text-teal">{booking.id}</td>
                    <td className="p-4">
                      <p className="font-medium text-navy">{booking.traveler}</p>
                      <p className="text-xs text-muted">{booking.email}</p>
                    </td>
                    <td className="p-4 text-muted hidden md:table-cell">{booking.package}</td>
                    <td className="p-4 font-mono font-semibold">{formatCurrency(booking.amount)}</td>
                    <td className="p-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="p-4 text-muted hidden sm:table-cell">{formatDate(booking.date)}</td>
                    <td className="p-4 relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === booking.id ? null : booking.id)}
                        className="p-1.5 rounded-[8px] hover:bg-border/50"
                      >
                        <MoreVertical className="w-4 h-4 text-muted" />
                      </button>
                      {openMenu === booking.id && (
                        <div className="absolute right-4 top-full mt-1 w-40 bg-surface border border-border rounded-[12px] shadow-lg z-10 py-1">
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-page/50">View Details</button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-page/50">Send Reminder</button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Cancel</button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
